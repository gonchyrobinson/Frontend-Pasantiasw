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
import { useApiQuery } from '../../hooks/useApi';
import { useSnackbar } from '../../hooks/useSnackbar';
import { EmpresaDto } from './types';
import EmpresasFilters from './components/EmpresasFilters';
import EmpresasStats from './components/EmpresasStats';
import EmpresasTabla from './components/EmpresasTabla';
import { FabNuevaEmpresa } from './components/ComponentesPersonalizados';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { useDeleteEmpresa } from './hooks/useDeleteEmpresa';
import { ROUTES } from '../../helpers/routesHelper';
import { PageHeader } from '../../lib/components';

const Empresas: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState<EmpresaDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: empresas,
    isLoading,
    error,
    refetch,
  } = useApiQuery<EmpresaDto[]>('/empresas');

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [empresaToDelete, setEmpresaToDelete] = useState<EmpresaDto | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleClearSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSearchResults = (empresas: EmpresaDto[]) => {
    setSearchResults(empresas);
    setHasSearched(true);
  };

  const handleNuevaEmpresa = () => {
    navigate(ROUTES.EMPRESAS_CREAR);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refetch data and clear search results to show fresh data
      await Promise.all([refetch(), handleClearSearch()]);
      showSuccess('Datos actualizados exitosamente');
    } catch (error) {
      showError('Error al actualizar las empresas. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEditarEmpresa = (empresa: EmpresaDto) => {
    navigate(`${ROUTES.EMPRESAS_EDITAR}/${empresa.idEmpresa}`);
  };

  const { deleteEmpresa, isDeleting } = useDeleteEmpresa();

  // Mostrar todas las empresas al cargar la página por primera vez
  useEffect(() => {
    if (!hasSearched && empresas?.data && empresas.data.length > 0) {
      setHasSearched(true);
      setSearchResults(empresas.data);
    }
  }, [empresas, hasSearched]);

  // Al regresar a la página, hacer GET a la API y mostrar todas las empresas
  useEffect(() => {
    if (
      location.pathname === ROUTES.EMPRESAS &&
      empresas?.data &&
      empresas.data.length > 0
    ) {
      // Refrescar datos y mostrar todas las empresas
      setHasSearched(true);
      setSearchResults(empresas.data);
    }
  }, [location.pathname, empresas]);

  const handleDeleteEmpresa = (empresa: EmpresaDto) => {
    setEmpresaToDelete(empresa);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (empresaToDelete) {
      try {
        await deleteEmpresa(empresaToDelete.idEmpresa);
        showSuccess('Empresa eliminada correctamente');

        // Actualizar la lista de resultados si la empresa eliminada estaba en ella
        setSearchResults(prev =>
          prev.filter(e => e.idEmpresa !== empresaToDelete.idEmpresa)
        );

        setShowDeleteDialog(false);
        setEmpresaToDelete(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Error al eliminar la empresa. Inténtalo de nuevo.';
        showError(errorMessage);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setEmpresaToDelete(null);
  };

  if (error) {
    return (
      <MainContainer>
        <Alert
          severity='error'
          action={
            <Button color='inherit' size='small' onClick={() => refetch()}>
              <Refresh sx={{ mr: 1 }} />
              Reintentar
            </Button>
          }
        >
          Error al cargar las empresas: {error?.message || 'Error desconocido'}
        </Alert>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <PageHeader
        title='Gestión de Empresas'
        subtitle='Administra las empresas del sistema de pasantías'
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onAction={handleNuevaEmpresa}
        actionButtonText='Nueva Empresa'
      />

      <EmpresasFilters
        onSearchResults={handleSearchResults}
        onClearResults={handleClearSearch}
        loading={isLoading || isRefreshing}
        hasResults={hasSearched && searchResults.length > 0}
      />

      {/* Vista principal con TablaGenerica */}
      {hasSearched && searchResults.length > 0 && (
        <>
          <SectionContainer sx={{ mb: 3 }}>
            <EmpresasStats empresas={searchResults} />
          </SectionContainer>

          <EmpresasTabla
            empresas={searchResults}
            loading={isLoading || isRefreshing}
            onRowClick={() => {
              // TODO: Implementar vista detalle de empresa
            }}
            onRowEdit={handleEditarEmpresa}
            onRowDelete={handleDeleteEmpresa}
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
            Búsqueda de Empresas
          </CardTitle>
          <BodyText color='text.secondary'>
            Utiliza la búsqueda avanzada para encontrar empresas específicas
          </BodyText>
        </CenteredContainer>
      )}

      {/* Estado vacío cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            No se encontraron empresas
          </CardTitle>
          <BodyText color='text.secondary'>
            Intenta con diferentes criterios de búsqueda
          </BodyText>
        </CenteredContainer>
      )}

      <FabNuevaEmpresa onClick={handleNuevaEmpresa} />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        title='Confirmar eliminación'
        message='¿Estás seguro de que quieres eliminar la empresa?'
        itemName={empresaToDelete?.nombre || ''}
        itemDetails={
          empresaToDelete && (
            <>
              <BodyText color='text.secondary'>
                ID: {empresaToDelete.idEmpresa}
              </BodyText>
              <BodyText color='text.secondary'>
                Encargado: {empresaToDelete.encargado}
              </BodyText>
              <BodyText color='text.secondary'>
                Correo: {empresaToDelete.correoElectronico}
              </BodyText>
            </>
          )
        }
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </MainContainer>
  );
};

export default Empresas;
