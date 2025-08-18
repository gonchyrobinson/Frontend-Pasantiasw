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
import PagosStats from './components/PagosStats';
import PagosTabla from './components/PagosTabla';
import { usePagosStats, usePagos, useMarcarPagoPagado } from './hooks/usePagos';
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
  const [showMarcarPagadoDialog, setShowMarcarPagadoDialog] = useState(false);
  const [searchResults, setSearchResults] = useState<PagosDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { stats, isLoading: statsLoading, error } = usePagosStats();
  const { data: pagosResponse, refetch: refetchPagos } = usePagos();
  const { mutate: marcarPagoPagado, isPending: isMarcandoPagado } =
    useMarcarPagoPagado();

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

  const handleVerDetalle = (pago: PagosDto) => {
    navigate(`${ROUTES.PAGOS_DETALLE}/${pago.idPago}`);
  };

  const handleCreate = () => {
    navigate(ROUTES.PAGOS_CREAR);
  };

  const confirmMarcarPagado = (pago: PagosDto) => {
    setSelectedPago(pago);
    setShowMarcarPagadoDialog(true);
  };

  const handleMarcarPagadoConfirm = async () => {
    if (selectedPago) {
      try {
        marcarPagoPagado(
          {
            idPago: selectedPago.idPago,
            fechaPago: new Date().toISOString().split('T')[0], // Fecha actual
          },
          {
            onSuccess: () => {
              showSuccess('Pago marcado como pagado exitosamente');
              // Actualizar el pago en searchResults
              setSearchResults(prev =>
                prev.map(p =>
                  p.idPago === selectedPago.idPago
                    ? {
                        ...p,
                        pagado: true,
                        fechaPago: new Date().toISOString().split('T')[0],
                      }
                    : p
                )
              );
              setShowMarcarPagadoDialog(false);
              setSelectedPago(null);
            },
            onError: () => {
              showError('Error al marcar el pago como pagado');
            },
          }
        );
      } catch (error) {
        showError('Error al marcar el pago como pagado');
      }
    }
  };

  const handleCloseMarcarPagadoDialog = () => {
    setShowMarcarPagadoDialog(false);
    setSelectedPago(null);
  };

  if (error) {
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
          Error al cargar los pagos: {error.message}
        </Alert>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
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
          <SectionContainer sx={{ mb: 3 }}>
            <PagosStats stats={stats} loading={statsLoading} />
          </SectionContainer>

          <PagosTabla
            pagos={searchResults}
            loading={statsLoading}
            onRowClick={handleVerDetalle}
            onEdit={handleEdit}
            onDelete={confirmMarcarPagado}
          />
        </>
      )}

      {/* Estado vacío cuando no hay búsqueda */}
      {!hasSearched && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            Búsqueda de Pagos por Pasantía
          </CardTitle>
          <BodyText color='text.secondary'>
            Utiliza la búsqueda para encontrar pagos seleccionando una pasantía
            específica del dropdown
          </BodyText>
        </CenteredContainer>
      )}

      {/* Estado vacío cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            No se encontraron pagos
          </CardTitle>
          <BodyText color='text.secondary'>
            Intenta con diferentes criterios de búsqueda
          </BodyText>
        </CenteredContainer>
      )}

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />

      <DeleteConfirmationDialog
        open={showMarcarPagadoDialog}
        title='Marcar como Pagado'
        message='¿Está seguro de que desea marcar este pago como pagado?'
        itemName={`Pago #${selectedPago?.idPago || 'N/A'}`}
        itemDetails={
          selectedPago && (
            <div>
              <BodyText color='text.secondary'>
                <strong>ID Pasantía:</strong> {selectedPago.idPasantia || 'N/A'}
              </BodyText>
              <BodyText color='text.secondary'>
                <strong>Monto:</strong>{' '}
                {selectedPago.monto
                  ? `$${selectedPago.monto.toLocaleString()}`
                  : 'N/A'}
              </BodyText>
              <BodyText color='text.secondary'>
                <strong>Estado actual:</strong>{' '}
                {selectedPago.pagado ? 'Pagado' : 'Pendiente'}
              </BodyText>
            </div>
          )
        }
        onClose={handleCloseMarcarPagadoDialog}
        onConfirm={handleMarcarPagadoConfirm}
        isDeleting={isMarcandoPagado}
        confirmButtonText='Marcar como Pagado'
        cancelButtonText='Cancelar'
      />
    </MainContainer>
  );
};

export default Pagos;
