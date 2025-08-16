import React from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getConvenioSearchMetadata,
  formatConvenioSearchFilters,
} from '../helpers/convenioSearchHelpers';
import { ConvenioEmpresaDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';
import { useEmpresasForDropdown } from '../hooks/useEmpresasForDropdown';
import AsignarAEmpresaDialog from './AsignarAEmpresaDialog';

interface ConveniosFiltersProps {
  onSearchResults: (convenios: ConvenioEmpresaDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

const ConveniosFilters: React.FC<ConveniosFiltersProps> = ({
  onSearchResults,
  onClearResults,
  hasResults = false,
}) => {
  const { showError, showSuccess } = useSnackbar();
  const { empresasOptions, isLoading: empresasLoading } =
    useEmpresasForDropdown();
  const [asignarEmpresaOpen, setAsignarEmpresaOpen] = React.useState(false);
  const [selectedConvenio, setSelectedConvenio] =
    React.useState<ConvenioEmpresaDto | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatConvenioSearchFilters(filters);
      const convenios = await apiClient.post<ConvenioEmpresaDto[]>(
        '/Convenios/conEmpresa',
        searchFilters as Record<string, unknown>
      );
      onSearchResults(convenios);
      showSuccess('Búsqueda completada exitosamente');
    } catch (error) {
      showError('Error al realizar la búsqueda de convenios');
      throw error; // Re-lanzar para que SearchDialog maneje el cierre
    }
  };

  const handleCloseAsignarEmpresa = () => {
    setAsignarEmpresaOpen(false);
    setSelectedConvenio(null);
  };

  return (
    <>
      <SearchDialog
        title='Búsqueda Avanzada de Convenios'
        buttonText='Búsqueda Avanzada'
        metadata={getConvenioSearchMetadata()}
        onSubmit={handleSearchSubmit}
        onClearResults={onClearResults}
        hasResults={hasResults}
        dynamicDropdownOptions={{
          nombreEmpresa: empresasOptions,
        }}
        loading={empresasLoading}
      />

      <AsignarAEmpresaDialog
        open={asignarEmpresaOpen}
        onClose={handleCloseAsignarEmpresa}
        convenio={selectedConvenio}
      />
    </>
  );
};

export default ConveniosFilters;
