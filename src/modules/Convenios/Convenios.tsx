import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Alert, Container, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useSnackbar } from '../../hooks/useSnackbar';
import { ROUTES } from '../../helpers/routesHelper';
import {
  ConvenioStats,
  ConvenioGrid,
  ConfirmDialog,
  FloatingActionButton,
} from './components/ComponentesGenericos';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import ConveniosFilters from './components/ConveniosFilters';
import { useConvenioStats, useCaducarConvenio } from './hooks/useConvenios';
import { useDeleteConvenio } from './hooks/useDeleteConvenio';
import { ConvenioEmpresaDto } from './types';
import { ModuleHeader, SearchableContent } from '../../lib/ElementCardGenerica';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import AsignarAEmpresaDialog from './components/AsignarAEmpresaDialog';

const Convenios: React.FC = () => {
  const navigate = useNavigate();
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
  const { deleteConvenio, isDeleting } = useDeleteConvenio();
  const { mutate: caducarConvenio } = useCaducarConvenio();

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
      // Simular refresh - en un caso real, invalidarías las queries
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    } catch (error) {
      showError('Error al actualizar los convenios. Inténtalo de nuevo.');
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

        // Actualizar la lista de resultados si el convenio eliminado estaba en ella
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
      <Container maxWidth='lg' sx={{ py: 3 }}>
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
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <ModuleHeader
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

      <SearchableContent
        hasSearched={hasSearched}
        searchResults={searchResults}
        isLoading={statsLoading}
        isRefreshing={isRefreshing}
        emptyStateTitle='Búsqueda de Convenios'
        emptyStateText='Utiliza la búsqueda avanzada para encontrar convenios específicos'
        noResultsTitle='No se encontraron convenios'
        noResultsText='Intenta con diferentes criterios de búsqueda'
        loadingMessage='Cargando convenios...'
        statsComponent={
          hasSearched &&
          searchResults.length > 0 && (
            <ConvenioStats stats={stats} loading={statsLoading} />
          )
        }
      >
        <ConvenioGrid
          convenios={searchResults}
          loading={statsLoading}
          onEdit={handleEdit}
          onDelete={confirmDelete}
          onCaducar={confirmCaducar}
          onAsignarEmpresa={handleAsignarEmpresa}
        />
      </SearchableContent>

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
              <Typography variant='body2' color='text.secondary'>
                <strong>Empresa:</strong>{' '}
                {selectedConvenio.nombreEmpresa || 'Sin empresa asignada'}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Fecha de Firma:</strong>{' '}
                {selectedConvenio.fechaFirma
                  ? new Date(selectedConvenio.fechaFirma).toLocaleDateString()
                  : 'No especificada'}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Fecha de Caducidad:</strong>{' '}
                {selectedConvenio.fechaCaducidad
                  ? new Date(
                      selectedConvenio.fechaCaducidad
                    ).toLocaleDateString()
                  : 'No especificada'}
              </Typography>
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
    </Container>
  );
};

export default Convenios;
