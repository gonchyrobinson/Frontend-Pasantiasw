import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button } from '@mui/material';
import {
  MainContainer,
  CenteredContainer,
  SectionContainer,
} from '../../lib/components/StyledContainers';
import { CardTitle, BodyText } from '../../lib/components/StyledText';
import { Refresh } from '@mui/icons-material';
import { useSnackbar } from '../../hooks/useSnackbar';
import { ROUTES } from '../../helpers/routesHelper';
import {
  ConvenioStats,
  ConfirmDialog,
  FloatingActionButton,
} from './components/ComponentesGenericos';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import ConveniosFilters from './components/ConveniosFilters';
import ConveniosTabla from './components/ConveniosTabla';
import {
  useConvenioStats,
  useCaducarConvenio,
  useConvenios,
} from './hooks/useConvenios';
import { useDeleteConvenio } from './hooks/useDeleteConvenio';
import { ConvenioEmpresaDto } from './types';
import { PageHeader } from '../../lib/components';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import AsignarAEmpresaDialog from './components/AsignarAEmpresaDialog';

const Convenios: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState<ConvenioEmpresaDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedConvenio, setSelectedConvenio] =
    useState<ConvenioEmpresaDto | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCaducarDialog, setShowCaducarDialog] = useState(false);
  const [showAsignarEmpresaDialog, setShowAsignarEmpresaDialog] =
    useState(false);

  const { stats, isLoading: statsLoading, error } = useConvenioStats();
  const { data: conveniosResponse, refetch: refetchConvenios } = useConvenios();
  const { deleteConvenio, isDeleting } = useDeleteConvenio();
  const { mutate: caducarConvenio } = useCaducarConvenio();

  // Mostrar todos los convenios al cargar la página por primera vez
  useEffect(() => {
    if (
      !hasSearched &&
      conveniosResponse?.data &&
      conveniosResponse.data.length > 0
    ) {
      setHasSearched(true);
      setSearchResults(conveniosResponse.data);
    }
  }, [conveniosResponse, hasSearched]);

  // Al regresar a la página, hacer GET a la API y mostrar todos los convenios
  useEffect(() => {
    if (
      location.pathname === ROUTES.CONVENIOS &&
      conveniosResponse?.data &&
      conveniosResponse.data.length > 0
    ) {
      // Refrescar datos y mostrar todos los convenios
      setHasSearched(true);
      setSearchResults(conveniosResponse.data);
    }
  }, [location.pathname, conveniosResponse]);

  const handleClearSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSearchResults = (convenios: ConvenioEmpresaDto[]) => {
    setSearchResults(convenios);
    setHasSearched(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refetch data and clear search results to show fresh data
      await Promise.all([refetchConvenios(), handleClearSearch()]);
      showSuccess('Datos actualizados exitosamente');
    } catch (error) {
      showError('Error al actualizar los convenios. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEdit = (convenio: ConvenioEmpresaDto) => {
    navigate(`${ROUTES.CONVENIOS_EDITAR}/${convenio.idConvenio}`);
  };

  const handleCreate = () => {
    navigate(ROUTES.CONVENIOS_CREAR);
  };

  const handleAsignarEmpresa = (convenio: ConvenioEmpresaDto) => {
    setSelectedConvenio(convenio);
    setShowAsignarEmpresaDialog(true);
  };

  const handleCloseAsignarEmpresa = () => {
    setShowAsignarEmpresaDialog(false);
    setSelectedConvenio(null);
  };

  const confirmDelete = (convenio: ConvenioEmpresaDto) => {
    setSelectedConvenio(convenio);
    setShowDeleteDialog(true);
  };

  const confirmCaducar = (convenio: ConvenioEmpresaDto) => {
    setSelectedConvenio(convenio);
    setShowCaducarDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedConvenio) {
      try {
        await deleteConvenio(selectedConvenio.idConvenio);
        showSuccess('Convenio eliminado exitosamente');

        setSearchResults(prev =>
          prev.filter(c => c.idConvenio !== selectedConvenio.idConvenio)
        );

        setShowDeleteDialog(false);
        setSelectedConvenio(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error al eliminar convenio';
        showError(errorMessage);
      }
    }
  };

  const handleCaducarConfirm = () => {
    if (selectedConvenio) {
      const fechaActual = new Date().toISOString().split('T')[0];
      caducarConvenio(
        {
          id: selectedConvenio.idConvenio,
          fechaCaducidad: fechaActual,
        },
        {
          onSuccess: () => {
            showSuccess('Convenio caducado exitosamente');
            setShowCaducarDialog(false);
            setSelectedConvenio(null);
          },
          onError: error => {
            showError(`Error al caducar convenio: ${error.message}`);
          },
        }
      );
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setSelectedConvenio(null);
  };

  const handleCloseCaducarDialog = () => {
    setShowCaducarDialog(false);
    setSelectedConvenio(null);
  };

  if (error) {
    return (
      <MainContainer>
        <Alert
          severity='error'
          action={
            <Button color='inherit' size='small' onClick={handleRefresh}>
              <Refresh sx={{ mr: 1 }} />
              Reintentar
            </Button>
          }
        >
          Error al cargar los convenios: {error.message}
        </Alert>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <PageHeader
        title='Gestión de Convenios'
        subtitle='Administra los convenios del sistema de pasantías'
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onAction={handleCreate}
        actionButtonText='Nuevo Convenio'
      />

      <ConveniosFilters
        onSearchResults={handleSearchResults}
        onClearResults={handleClearSearch}
        loading={statsLoading || isRefreshing}
        hasResults={hasSearched && searchResults.length > 0}
      />

      {/* Vista principal con TablaGenerica */}
      {hasSearched && searchResults.length > 0 && (
        <>
          <SectionContainer sx={{ mb: 3 }}>
            <ConvenioStats stats={stats} loading={statsLoading} />
          </SectionContainer>

          <ConveniosTabla
            convenios={searchResults}
            loading={statsLoading}
            onEdit={handleEdit}
            onDelete={confirmDelete}
            onCaducar={confirmCaducar}
            onAsignarEmpresa={handleAsignarEmpresa}
          />
        </>
      )}

      {/* Estado vacío cuando no hay búsqueda */}
      {!hasSearched && (
        <CenteredContainer
          sx={{
            textAlign: 'center',
            py: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardTitle color='text.secondary' gutterBottom>
            Búsqueda de Convenios
          </CardTitle>
          <BodyText color='text.secondary'>
            Utiliza la búsqueda avanzada para encontrar convenios específicos
          </BodyText>
        </CenteredContainer>
      )}

      {/* Estado vacío cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            No se encontraron convenios
          </CardTitle>
          <BodyText color='text.secondary'>
            Intenta con diferentes criterios de búsqueda
          </BodyText>
        </CenteredContainer>
      )}

      <FloatingActionButton onClick={handleCreate} />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        title='Eliminar Convenio'
        message='¿Está seguro de que desea eliminar este convenio?'
        itemName={selectedConvenio?.expediente || 'Convenio'}
        itemDetails={
          selectedConvenio && (
            <div>
              <BodyText color='text.secondary'>
                <strong>Empresa:</strong>{' '}
                {selectedConvenio.nombreEmpresa || 'Sin empresa asignada'}
              </BodyText>
              <BodyText color='text.secondary'>
                <strong>Fecha de Firma:</strong>{' '}
                {selectedConvenio.fechaFirma
                  ? new Date(selectedConvenio.fechaFirma).toLocaleDateString()
                  : 'No especificada'}
              </BodyText>
              <BodyText color='text.secondary'>
                <strong>Fecha de Caducidad:</strong>{' '}
                {selectedConvenio.fechaCaducidad
                  ? new Date(
                      selectedConvenio.fechaCaducidad
                    ).toLocaleDateString()
                  : 'No especificada'}
              </BodyText>
            </div>
          )
        }
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        confirmButtonText='Eliminar'
        cancelButtonText='Cancelar'
      />

      <ConfirmDialog
        open={showCaducarDialog}
        title='Confirmar Caducidad'
        message={`¿Está seguro de que desea caducar el convenio "${selectedConvenio?.expediente}"?`}
        onConfirm={handleCaducarConfirm}
        onCancel={handleCloseCaducarDialog}
        confirmText='Caducar'
        cancelText='Cancelar'
        severity='warning'
      />

      <AsignarAEmpresaDialog
        open={showAsignarEmpresaDialog}
        onClose={handleCloseAsignarEmpresa}
        convenio={selectedConvenio}
      />
    </MainContainer>
  );
};

export default Convenios;
