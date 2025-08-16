import React from 'react';
import { SearchDialog } from '../../../ElementCardGenerica';
import {
  getPagosSearchMetadata,
  formatPagosSearchFilters,
} from '../helpers/pagosSearchHelpers';
import { PagosDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';
import { usePasantias } from '../../Pasantias/hooks/usePasantias';

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
  const { data: pasantiasResponse } = usePasantias();

  // Preparar opciones para el dropdown de pasantías
  const pasantias = pasantiasResponse || [];
  const dynamicDropdownOptions = {
    idPasantia: pasantias.map(pasantia => ({
      value: pasantia.idPasantia,
      label: `${pasantia.expediente}`,
    })),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatPagosSearchFilters(filters);
      const idPasantia = searchFilters.idPasantia as number;

      if (!idPasantia) {
        showError('Debe seleccionar una pasantía válida');
        return;
      }

      const pagos = await apiClient.get<PagosDto[]>(
        `Pagos/by-pasantia/${idPasantia}`
      );
      onSearchResults(pagos);
      showSuccess('Búsqueda completada exitosamente');
    } catch (error) {
      showError('Error al realizar la búsqueda de pagos');
      throw error; // Re-lanzar para que SearchDialog maneje el cierre
    }
  };

  return (
    <SearchDialog
      title='Búsqueda de Pagos por Pasantía'
      buttonText='Buscar por Pasantía'
      metadata={getPagosSearchMetadata()}
      onSubmit={handleSearchSubmit}
      onClearResults={onClearResults}
      hasResults={hasResults}
      dynamicDropdownOptions={dynamicDropdownOptions}
    />
  );
};

export default PagosFilters;
