import React from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getPasantiaSearchMetadata,
  formatPasantiaSearchFilters,
} from '../helpers/pasantiaSearchHelpers';
import { PasantiaDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';
import {
  useEstudiantesDropdown,
  useEmpresasConvenioDropdown,
  usePasantiasDropdown,
} from '../../../lib/hooks/useDropdownData';

interface PasantiaFiltersProps {
  onSearchResults: (pasantias: PasantiaDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

const PasantiaFilters: React.FC<PasantiaFiltersProps> = ({
  onSearchResults,
  onClearResults,
  hasResults = false,
}) => {
  const { showSuccess, showError } = useSnackbar();
  const { estudiantesOptions, isLoading: estudiantesLoading } =
    useEstudiantesDropdown();
  const { empresasConvenioOptions, isLoading: empresasConvenioLoading } =
    useEmpresasConvenioDropdown();
  const { tramitesOptions, isLoading: tramitesLoading } =
    usePasantiasDropdown();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatPasantiaSearchFilters(filters);
      const pasantias = await apiClient.post<PasantiaDto[]>(
        '/pasantias/buscar-avanzado',
        searchFilters as Record<string, unknown>
      );
      onSearchResults(pasantias);
      showSuccess('Búsqueda completada exitosamente');
    } catch (error) {
      showError('Error al realizar la búsqueda de pasantías');
      throw error; // Re-lanzar para que SearchDialog maneje el cierre
    }
  };

  return (
    <SearchDialog
      title='Búsqueda Avanzada de Pasantías'
      buttonText='Búsqueda Avanzada'
      metadata={getPasantiaSearchMetadata()}
      onSubmit={handleSearchSubmit}
      onClearResults={onClearResults}
      hasResults={hasResults}
      dynamicDropdownOptions={{
        idEstudiante: estudiantesOptions || [],
        idConvenio: empresasConvenioOptions || [],
        tramite: tramitesOptions || [],
      }}
      loading={estudiantesLoading || empresasConvenioLoading || tramitesLoading}
    />
  );
};

export default PasantiaFilters;
