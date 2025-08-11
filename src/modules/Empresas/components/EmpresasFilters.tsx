import React from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getEmpresaSearchMetadata,
  formatEmpresaSearchFilters,
} from '../helpers/empresaSearchHelpers';
import { EmpresaDto } from '../types';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';

interface EmpresasFiltersProps {
  onSearchResults: (empresas: EmpresaDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

const EmpresasFilters: React.FC<EmpresasFiltersProps> = ({
  onSearchResults,
  onClearResults,
  hasResults = false,
}) => {
  const { showError, showSuccess } = useSnackbar();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatEmpresaSearchFilters(filters);
      const empresas = await apiClient.post<EmpresaDto[]>(
        '/empresas/buscar/avanzado',
        searchFilters as Record<string, unknown>
      );
      onSearchResults(empresas);
      showSuccess('Búsqueda completada exitosamente');
    } catch (error) {
      showError('Error al realizar la búsqueda de empresas');
      throw error; // Re-lanzar para que SearchDialog maneje el cierre
    }
  };

  return (
    <SearchDialog
      title='Búsqueda Avanzada de Empresas'
      buttonText='Búsqueda Avanzada'
      metadata={getEmpresaSearchMetadata()}
      onSubmit={handleSearchSubmit}
      onClearResults={onClearResults}
      hasResults={hasResults}
    />
  );
};

export default EmpresasFilters;
