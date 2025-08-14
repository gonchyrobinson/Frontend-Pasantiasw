import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Typography, Alert, Container, Button, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useSnackbar } from '../../hooks/useSnackbar';
import { ROUTES } from '../../helpers/routesHelper';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import PagosStats from './components/PagosStats';
import PagosTabla from './components/PagosTabla';
import { usePagosStats, usePagos, useDeletePago } from './hooks/usePagos';
import { PagosDto } from './types';
import { PageHeader } from '../../lib/components';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import PagosFilters from './components/PagosFilters';

const Pagos: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPago, setSelectedPago] = useState<PagosDto | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchResults, setSearchResults] = useState<PagosDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { stats, isLoading: statsLoading, error } = usePagosStats();
  const { data: pagosResponse, refetch: refetchPagos } = usePagos();
  const { mutate: deletePago, isPending: isDeleting } = useDeletePago();

  // Mostrar todos los pagos al cargar la página por primera vez
  useEffect(() => {
    if (!hasSearched && pagosResponse?.data && pagosResponse.data.length > 0) {
      setHasSearched(true);
      setSearchResults(pagosResponse.data);
    }
  }, [pagosResponse, hasSearched]);

  // Al regresar a la página, hacer GET a la API y mostrar todos los pagos
  useEffect(() => {
    if (
      location.pathname === ROUTES.PAGOS &&
      pagosResponse?.data &&
      pagosResponse.data.length > 0
    ) {
      // Refrescar datos y mostrar todos los pagos
      setHasSearched(true);
      setSearchResults(pagosResponse.data);
    }
  }, [location.pathname, pagosResponse]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Refetch data and clear search results to show fresh data
      await Promise.all([refetchPagos(), handleClearSearch()]);
      showSuccess('Datos actualizados exitosamente');
    } catch (error) {
      showError('Error al actualizar los pagos. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSearchResults = (pagos: PagosDto[]) => {
    setSearchResults(pagos);
    setHasSearched(true);
  };

  const handleEdit = (pago: PagosDto) => {
    navigate(`${ROUTES.PAGOS_EDITAR}/${pago.idPago}`);
  };

  const handleCreate = () => {
    navigate(ROUTES.PAGOS_CREAR);
  };

  const confirmDelete = (pago: PagosDto) => {
    setSelectedPago(pago);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPago) {
      try {
        deletePago(selectedPago.idPago, {
          onSuccess: () => {
            showSuccess('Pago eliminado exitosamente');
            setShowDeleteDialog(false);
            setSelectedPago(null);
          },
          onError: () => {
            showError('Error al eliminar el pago');
          },
        });
      } catch (error) {
        showError('Error al eliminar el pago');
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setSelectedPago(null);
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
          Error al cargar los pagos: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <PageHeader
        title='Gestión de Pagos'
        subtitle='Administra los pagos del sistema de pasantías. Use la búsqueda para encontrar pagos por ID de pasantía.'
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onAction={handleCreate}
        actionButtonText='Nuevo Pago'
      />

      <PagosFilters
        onSearchResults={handleSearchResults}
        onClearResults={handleClearSearch}
        loading={statsLoading || isRefreshing}
        hasResults={hasSearched && searchResults.length > 0}
      />

      {/* Vista principal con TablaGenerica */}
      {hasSearched && searchResults.length > 0 && (
        <>
          <Box sx={{ mb: 3 }}>
            <PagosStats stats={stats} loading={statsLoading} />
          </Box>

          <PagosTabla
            pagos={searchResults}
            loading={statsLoading}
            onEdit={handleEdit}
            onDelete={confirmDelete}
          />
        </>
      )}

      {/* Estado vacío cuando no hay búsqueda */}
      {!hasSearched && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            Búsqueda de Pagos por Pasantía
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Utiliza la búsqueda para encontrar pagos seleccionando una pasantía
            específica del dropdown
          </Typography>
        </Box>
      )}

      {/* Estado vacío cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant='h6' color='text.secondary' gutterBottom>
            No se encontraron pagos
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Intenta con diferentes criterios de búsqueda
          </Typography>
        </Box>
      )}

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        title='Eliminar Pago'
        message='¿Está seguro de que desea eliminar este pago?'
        itemName={`Pago #${selectedPago?.idPago || 'N/A'}`}
        itemDetails={
          selectedPago && (
            <div>
              <Typography variant='body2' color='text.secondary'>
                <strong>ID Pasantía:</strong> {selectedPago.idPasantia || 'N/A'}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Monto:</strong>{' '}
                {selectedPago.monto
                  ? `$${selectedPago.monto.toLocaleString()}`
                  : 'N/A'}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                <strong>Fecha de Pago:</strong>{' '}
                {selectedPago.fechaPago
                  ? new Date(selectedPago.fechaPago).toLocaleDateString()
                  : 'N/A'}
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
    </Container>
  );
};

export default Pagos;
