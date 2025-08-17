import React from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getPagosSearchMetadata,
  formatPagosSearchFilters,
} from '../helpers/pagosSearchHelpers';
import { PagosDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';
import { usePasantiasDropdown } from '../../../lib/hooks/useDropdownData';

interface PagosFiltersProps {
  onSearchResults: (pagos: PagosDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

const PagosFilters: React.FC<PagosFiltersProps> = ({
  onSearchResults,
  onClearResults,
  hasResults = false,
}) => {
  const { showError, showSuccess } = useSnackbar();
  const { pasantiasOptions, isLoading: pasantiasLoading } =
    usePasantiasDropdown();

  const dynamicDropdownOptions = {
    idPasantia: pasantiasOptions || [],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatPagosSearchFilters(filters);
      const idPasantia = searchFilters.idPasantia as number;

      let pagos: PagosDto[];

      if (idPasantia) {
        // Búsqueda específica por pasantía - puede devolver un objeto o array
        const response = await apiClient.get(
          `/pagos/by-pasantia/${idPasantia}`
        );
        // Normalizar respuesta a array
        pagos = Array.isArray(response) ? response : response ? [response] : [];
      } else {
        // Sin pasantía seleccionada: obtener todos los pagos para filtrado local
        pagos = await apiClient.get<PagosDto[]>('/pagos');
      }

      // Filtrar localmente con todos los criterios
      const filteredPagos = filterPagosLocally(pagos, searchFilters);

      onSearchResults(filteredPagos);
      showSuccess(
        `Búsqueda completada: ${filteredPagos.length} pagos encontrados`
      );
    } catch (error) {
      showError('Error al realizar la búsqueda de pagos');
      throw error;
    }
  };

  // Función para filtrar pagos localmente
  const filterPagosLocally = (
    pagos: PagosDto[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: Record<string, any>
  ): PagosDto[] => {
    return pagos.filter(pago => {
      // Filtro por estado de pago - manejar null correctamente
      if (filters.pagado !== undefined) {
        const pagoPagado = pago.pagado === true;
        const filtroPagado = filters.pagado === true;
        if (pagoPagado !== filtroPagado) {
          return false;
        }
      }

      // Filtros de fecha de pago
      if (filters.fechaPagoDesde && pago.fechaPago) {
        const fechaPago = new Date(pago.fechaPago);
        const fechaDesde = new Date(filters.fechaPagoDesde);
        if (fechaPago < fechaDesde) return false;
      }

      if (filters.fechaPagoHasta && pago.fechaPago) {
        const fechaPago = new Date(pago.fechaPago);
        const fechaHasta = new Date(filters.fechaPagoHasta);
        if (fechaPago > fechaHasta) return false;
      }

      // Filtros de fecha de vencimiento
      if (filters.fechaVencimientoDesde && pago.fechaVencimiento) {
        const fechaVencimiento = new Date(pago.fechaVencimiento);
        const fechaDesde = new Date(filters.fechaVencimientoDesde);
        if (fechaVencimiento < fechaDesde) return false;
      }

      if (filters.fechaVencimientoHasta && pago.fechaVencimiento) {
        const fechaVencimiento = new Date(pago.fechaVencimiento);
        const fechaHasta = new Date(filters.fechaVencimientoHasta);
        if (fechaVencimiento > fechaHasta) return false;
      }

      // Filtros de monto
      if (filters.montoMin && pago.monto && pago.monto < filters.montoMin) {
        return false;
      }

      if (filters.montoMax && pago.monto && pago.monto > filters.montoMax) {
        return false;
      }

      return true;
    });
  };

  return (
    <SearchDialog
      title='Búsqueda Avanzada de Pagos'
      buttonText='Búsqueda Avanzada'
      metadata={getPagosSearchMetadata()}
      onSubmit={handleSearchSubmit}
      onClearResults={onClearResults}
      hasResults={hasResults}
      dynamicDropdownOptions={dynamicDropdownOptions}
      loading={pasantiasLoading}
    />
  );
};

export default PagosFilters;
