import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Alert, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useApiQuery } from '../../hooks/useApi';
import { useSnackbar } from '../../hooks/useSnackbar';
import { EstudianteDto } from './types';
import EstudiantesGrid from './components/EstudiantesGrid';
import EstudiantesFilters from './components/EstudiantesFilters';
import EstudiantesStats from './components/EstudiantesStats';
import { FabNuevoEstudiante } from './components/ComponentesPersonalizados';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { useDeleteEstudiante } from './hooks/useDeleteEstudiante';
import { ROUTES } from '../../helpers/routesHelper';
import { ModuleHeader, SearchableContent } from '../../ElementCardGenerica';

const Estudiantes: React.FC = () => {
  const navigate = useNavigate();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState<EstudianteDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { isLoading, error, refetch } = useApiQuery<EstudianteDto[]>(
    ROUTES.ESTUDIANTES as string
  );

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [estudianteToDelete, setEstudianteToDelete] =
    useState<EstudianteDto | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleClearSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSearchResults = (estudiantes: EstudianteDto[]) => {
    setSearchResults(estudiantes);
    setHasSearched(true);
  };

  const handleNuevoEstudiante = () => {
    navigate(ROUTES.ESTUDIANTES_CREAR);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      setIsRefreshing(true);
      await refetch();
    } catch (error) {
      showError('Error al actualizar los estudiantes. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEditarEstudiante = (estudiante: EstudianteDto) => {
    navigate(`${ROUTES.ESTUDIANTES_EDITAR}/${estudiante.idEstudiante}`);
  };

  const handleDeleteEstudiante = (estudiante: EstudianteDto) => {
    setEstudianteToDelete(estudiante);
    setShowDeleteDialog(true);
  };

  const { deleteEstudiante, isDeleting } = useDeleteEstudiante();

  const handleConfirmDelete = async () => {
    if (estudianteToDelete) {
      try {
        await deleteEstudiante(estudianteToDelete.idEstudiante);
        showSuccess('Estudiante eliminado correctamente');

        // Actualizar la lista de resultados si el estudiante eliminado estaba en ella
        setSearchResults(prev =>
          prev.filter(e => e.idEstudiante !== estudianteToDelete.idEstudiante)
        );

        setShowDeleteDialog(false);
        setEstudianteToDelete(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Error al eliminar el estudiante. Inténtalo de nuevo.';
        showError(errorMessage);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setEstudianteToDelete(null);
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
          Error al cargar los estudiantes:{' '}
          {error?.message || 'Error desconocido'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <ModuleHeader
        title='Gestión de Estudiantes'
        subtitle='Administra los estudiantes del sistema de pasantías'
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onAction={handleNuevoEstudiante}
        actionButtonText='Nuevo Estudiante'
      />

      <EstudiantesFilters
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
        emptyStateTitle='Búsqueda de Estudiantes'
        emptyStateText='Utiliza la búsqueda avanzada para encontrar estudiantes específicos'
        noResultsTitle='No se encontraron estudiantes'
        noResultsText='Intenta con diferentes criterios de búsqueda'
        loadingMessage='Cargando estudiantes...'
        statsComponent={
          hasSearched &&
          searchResults.length > 0 && (
            <EstudiantesStats estudiantes={searchResults} />
          )
        }
      >
        <EstudiantesGrid
          estudiantes={searchResults}
          onEstudianteClick={() => {
            // TODO: Implementar vista detalle de estudiante
          }}
          onEstudianteEdit={handleEditarEstudiante}
          onEstudianteDelete={handleDeleteEstudiante}
        />
      </SearchableContent>

      <FabNuevoEstudiante onClick={handleNuevoEstudiante} />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        title='Confirmar eliminación'
        message='¿Estás seguro de que quieres eliminar el estudiante?'
        itemName={
          estudianteToDelete
            ? `${estudianteToDelete.apellido}, ${estudianteToDelete.nombre}`
            : ''
        }
        itemDetails={
          estudianteToDelete && (
            <>
              <Typography variant='body2' color='text.secondary'>
                Documento: {estudianteToDelete.documento}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Carrera: {estudianteToDelete.carrera}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Email: {estudianteToDelete.email}
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

export default Estudiantes;
