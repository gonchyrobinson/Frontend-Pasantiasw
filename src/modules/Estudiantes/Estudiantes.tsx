import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from '@mui/material';
import {
  MainContainer,
  CenteredContainer,
  SectionContainer,
} from '../../lib/components/StyledContainers';
import { CardTitle, BodyText } from '../../lib/components/StyledText';
import { RefreshButton } from '../../lib/components/StyledButtons';
import { useApiQuery } from '../../lib/hooks/useApi';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { EstudianteDto } from './types';
import EstudiantesFilters from './components/EstudiantesFilters';
import EstudiantesStats from './components/EstudiantesStats';
import EstudiantesTabla from './components/EstudiantesTabla';
import { FabNuevoEstudiante } from './components/ComponentesPersonalizados';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import DeleteConfirmationDialog from '../../lib/components/DeleteConfirmationDialog';
import { useDeleteEstudiante } from '../../lib/hooks/useDelete';
import { ROUTES } from '../../helpers/routesHelper';
import { PageHeader, LoadingSpinner } from '../../lib/components';

const Estudiantes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState<EstudianteDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    data: estudiantes,
    isLoading,
    error,
    refetch,
  } = useApiQuery<EstudianteDto[]>(ROUTES.ESTUDIANTES as string);

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
      // Refetch data and clear search results to show fresh data
      await Promise.all([refetch(), handleClearSearch()]);
      showSuccess('Datos actualizados exitosamente');
    } catch (error) {
      showError('Error al actualizar los estudiantes. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEditarEstudiante = (estudiante: EstudianteDto) => {
    navigate(`${ROUTES.ESTUDIANTES_EDITAR}/${estudiante.idEstudiante}`);
  };

  const handleVerDetalle = (estudiante: EstudianteDto) => {
    navigate(`${ROUTES.ESTUDIANTES_DETALLE}/${estudiante.idEstudiante}`);
  };

  const handleDeleteEstudiante = (estudiante: EstudianteDto) => {
    setEstudianteToDelete(estudiante);
    setShowDeleteDialog(true);
  };

  const { deleteEstudiante, isDeleting } = useDeleteEstudiante();

  // Mostrar todos los estudiantes al cargar la página por primera vez
  useEffect(() => {
    if (!hasSearched && estudiantes?.data && estudiantes.data.length > 0) {
      setHasSearched(true);
      setSearchResults(estudiantes.data);
    }
  }, [estudiantes, hasSearched]);

  // Al regresar a la página, hacer GET a la API y mostrar todos los estudiantes
  useEffect(() => {
    if (
      location.pathname === ROUTES.ESTUDIANTES &&
      estudiantes?.data &&
      estudiantes.data.length > 0
    ) {
      // Refrescar datos y mostrar todos los estudiantes
      setHasSearched(true);
      setSearchResults(estudiantes.data);
    }
  }, [location.pathname, estudiantes]);

  const handleConfirmDelete = async () => {
    if (estudianteToDelete) {
      try {
        await deleteEstudiante(estudianteToDelete.idEstudiante);
        showSuccess('Estudiante eliminado correctamente');

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

  if (isLoading || isRefreshing) {
    return (
      <MainContainer>
        <LoadingSpinner message='Cargando estudiantes...' />
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <Alert
          severity='error'
          action={
            <RefreshButton onClick={() => refetch()} size='small'>
              Reintentar
            </RefreshButton>
          }
        >
          Error al cargar los estudiantes:{' '}
          {error?.message || 'Error desconocido'}
        </Alert>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <PageHeader
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

      {/* Vista principal con TablaGenerica */}
      {hasSearched && searchResults.length > 0 && (
        <>
          <SectionContainer sx={{ mb: 3 }}>
            <EstudiantesStats estudiantes={searchResults} />
          </SectionContainer>

          <EstudiantesTabla
            estudiantes={searchResults}
            loading={isLoading || isRefreshing}
            onRowClick={handleVerDetalle}
            onRowEdit={handleEditarEstudiante}
            onRowDelete={handleDeleteEstudiante}
          />
        </>
      )}

      {/* Estado vacío cuando no hay búsqueda */}
      {!hasSearched && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            Búsqueda de Estudiantes
          </CardTitle>
          <BodyText color='text.secondary'>
            Utiliza la búsqueda avanzada para encontrar estudiantes por
            documento o carrera
          </BodyText>
        </CenteredContainer>
      )}

      {/* Estado vacío cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            No se encontraron estudiantes
          </CardTitle>
          <BodyText color='text.secondary'>
            Intenta con diferentes criterios de búsqueda (documento, carrera)
          </BodyText>
        </CenteredContainer>
      )}

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
              <BodyText color='text.secondary'>
                Documento: {estudianteToDelete.documento}
              </BodyText>
              <BodyText color='text.secondary'>
                Carrera: {estudianteToDelete.carrera}
              </BodyText>
              <BodyText color='text.secondary'>
                Email: {estudianteToDelete.email}
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

export default Estudiantes;
