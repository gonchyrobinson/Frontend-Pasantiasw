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
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { ROUTES } from '../../helpers/routesHelper';

import DeleteConfirmationDialog from '../../lib/components/DeleteConfirmationDialog';
import { usePasantiaStats, usePasantias } from './hooks/usePasantias';
import { useDeletePasantia } from './hooks/usePasantias';
import { PasantiaDto } from './types';
import { PageHeader } from '../../lib/components';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import PasantiaFilters from './components/PasantiaFilters';
import PasantiaStats from './components/PasantiaStats';
import PasantiasTabla from './components/PasantiasTabla';
import { FloatingActionButton } from '../../lib/components/ComponentesGenericos';

const Pasantias: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState<PasantiaDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPasantia, setSelectedPasantia] = useState<PasantiaDto | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { isLoading: statsLoading, error } = usePasantiaStats();
  const {
    data: pasantias,
    isLoading: pasantiasLoading,
    error: pasantiasError,
    refetch: refetchPasantias,
  } = usePasantias();
  const { mutate: deletePasantia, isPending: isDeleting } = useDeletePasantia();

  // Mostrar todas las pasantías al cargar la página por primera vez
  useEffect(() => {
    if (!hasSearched && pasantias && pasantias.length > 0) {
      setHasSearched(true);
      setSearchResults(pasantias);
    }
  }, [pasantias, hasSearched]);

  // Al regresar a la página, hacer GET a la API y mostrar todas las pasantías
  useEffect(() => {
    if (
      location.pathname === ROUTES.PASANTIAS &&
      pasantias &&
      pasantias.length > 0
    ) {
      // Refrescar datos y mostrar todas las pasantías
      setHasSearched(true);
      setSearchResults(pasantias);
    }
  }, [location.pathname, pasantias]);

  const handleClearSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSearchResults = (pasantias: PasantiaDto[]) => {
    setSearchResults(pasantias);
    setHasSearched(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refetch both pasantias and stats data
      await Promise.all([refetchPasantias()]);
      showSuccess('Datos actualizados exitosamente');
    } catch (error) {
      showError('Error al actualizar las pasantías. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEdit = (pasantia: PasantiaDto) => {
    navigate(`${ROUTES.PASANTIAS_EDITAR}/${pasantia.idPasantia}`);
  };

  const handleCreate = () => {
    navigate(ROUTES.PASANTIAS_CREAR);
  };

  const confirmDelete = (pasantia: PasantiaDto) => {
    setSelectedPasantia(pasantia);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPasantia) {
      try {
        await deletePasantia(selectedPasantia.idPasantia);
        showSuccess('Pasantía eliminada exitosamente');

        setSearchResults(prev =>
          prev.filter(p => p.idPasantia !== selectedPasantia.idPasantia)
        );

        setShowDeleteDialog(false);
        setSelectedPasantia(null);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error al eliminar pasantía';
        showError(errorMessage);
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setSelectedPasantia(null);
  };

  if (error || pasantiasError) {
    return (
      <MainContainer>
        <Alert
          severity='error'
          action={
            <RefreshButton onClick={handleRefresh} size='small'>
              Reintentar
            </RefreshButton>
          }
        >
          Error al cargar las pasantías: {(error || pasantiasError)?.message}
        </Alert>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <PageHeader
        title='Gestión de Pasantías'
        subtitle='Administra las pasantías del sistema de pasantías'
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onAction={handleCreate}
        actionButtonText='Nueva Pasantía'
      />

      <PasantiaFilters
        pasantias={pasantias || []}
        onSearchResults={handleSearchResults}
        onClearResults={handleClearSearch}
        loading={pasantiasLoading}
      />

      {/* Vista principal con TablaGenerica */}
      {hasSearched && searchResults.length > 0 && (
        <>
          <SectionContainer sx={{ mb: 3 }}>
            <PasantiaStats pasantias={searchResults} />
          </SectionContainer>

          <PasantiasTabla
            pasantias={searchResults}
            loading={statsLoading}
            onEdit={handleEdit}
            onDelete={confirmDelete}
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
            Búsqueda de Pasantías
          </CardTitle>
          <BodyText color='text.secondary'>
            Utiliza los filtros para encontrar pasantías específicas
          </BodyText>
        </CenteredContainer>
      )}

      {/* Estado vacío cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            No se encontraron pasantías
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
        title='Eliminar Pasantía'
        message='¿Está seguro de que desea eliminar esta pasantía?'
        itemName={selectedPasantia?.expediente || 'Pasantía'}
        itemDetails={
          selectedPasantia && (
            <div>
              <BodyText color='text.secondary'>
                <strong>Obra Social:</strong>{' '}
                {selectedPasantia.obraSocial || 'No especificada'}
              </BodyText>
              <BodyText color='text.secondary'>
                <strong>ART:</strong>{' '}
                {selectedPasantia.art || 'No especificado'}
              </BodyText>
              <BodyText color='text.secondary'>
                <strong>Fecha de Inicio:</strong>{' '}
                {selectedPasantia.fechaInicio
                  ? new Date(selectedPasantia.fechaInicio).toLocaleDateString()
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
    </MainContainer>
  );
};

export default Pasantias;
