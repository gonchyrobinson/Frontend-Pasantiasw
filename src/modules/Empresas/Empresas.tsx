import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Alert, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useApiQuery } from '../../hooks/useApi';
import { useSnackbar } from '../../hooks/useSnackbar';
import { EmpresaDto } from './types';
import EmpresasGrid from './components/EmpresasGrid';
import EmpresasFilters from './components/EmpresasFilters';
import EmpresasStats from './components/EmpresasStats';
import { FabNuevaEmpresa } from './components/ComponentesPersonalizados';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { useDeleteEmpresa } from './hooks/useDeleteEmpresa';
import { ROUTES } from '../../helpers/routesHelper';
import { ModuleHeader, SearchableContent } from '../../lib/ElementCardGenerica';

const Empresas: React.FC = () => {
  const navigate = useNavigate();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState<EmpresaDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { isLoading, error, refetch } = useApiQuery<EmpresaDto[]>('/empresas');

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
      setIsRefreshing(true);
      await refetch();
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
      <Container maxWidth='lg' sx={{ py: 3 }}>
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
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <ModuleHeader
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

      <SearchableContent
        hasSearched={hasSearched}
        searchResults={searchResults}
        isLoading={isLoading}
        isRefreshing={isRefreshing}
        emptyStateTitle='Búsqueda de Empresas'
        emptyStateText='Utiliza la búsqueda avanzada para encontrar empresas específicas'
        noResultsTitle='No se encontraron empresas'
        noResultsText='Intenta con diferentes criterios de búsqueda'
        loadingMessage='Cargando empresas...'
        statsComponent={
          hasSearched &&
          searchResults.length > 0 && <EmpresasStats empresas={searchResults} />
        }
      >
        <EmpresasGrid
          empresas={searchResults}
          onEmpresaClick={() => {
            // TODO: Implementar vista detalle de empresa
          }}
          onEmpresaEdit={handleEditarEmpresa}
          onEmpresaDelete={handleDeleteEmpresa}
        />
      </SearchableContent>

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
              <Typography variant='body2' color='text.secondary'>
                ID: {empresaToDelete.idEmpresa}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Encargado: {empresaToDelete.encargado}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Correo: {empresaToDelete.correoElectronico}
              </Typography>
            </>
          )
        }
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </Container>
  );
};

export default Empresas;
