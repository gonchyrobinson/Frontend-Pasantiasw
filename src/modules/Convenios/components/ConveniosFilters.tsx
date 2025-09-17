import React, { useState, useEffect } from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getConvenioSearchMetadata,
  formatConvenioSearchFilters,
} from '../helpers/convenioHelpers';
import { ConvenioEmpresaDto, ConvenioEmpresaFiltroDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import {
  useEmpresasConConvenioVigente,
  useConveniosConFiltros,
} from '../hooks/useConvenios';
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
  const { data: empresasConConvenio, isLoading: empresasLoading } =
    useEmpresasConConvenioVigente();
  const [asignarEmpresaOpen, setAsignarEmpresaOpen] = React.useState(false);
  const [selectedConvenio, setSelectedConvenio] =
    React.useState<ConvenioEmpresaDto | null>(null);
  const [searchFilters, setSearchFilters] = useState<ConvenioEmpresaFiltroDto>(
    {}
  );
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, Array<{ value: string | number; label: string }>>
  >({});

  // Usar el hook para buscar convenios con filtros
  const {
    data: conveniosFiltrados,
    isLoading: searchLoading,
    error: searchError,
  } = useConveniosConFiltros(searchFilters);

  // Cargar opciones de empresas con convenio vigente
  useEffect(() => {
    if (empresasConConvenio) {
      const empresasOptions = empresasConConvenio.map(empresa => ({
        value: empresa.nombreEmpresa,
        label: empresa.nombreEmpresa,
      }));

      setDynamicOptions({
        nombreEmpresa: empresasOptions,
      });
    }
  }, [empresasConConvenio]);

  // Efecto para manejar los resultados de búsqueda
  useEffect(() => {
    if (conveniosFiltrados && Object.keys(searchFilters).length > 0) {
      onSearchResults(conveniosFiltrados);
      showSuccess('Búsqueda completada exitosamente');
    }
  }, [conveniosFiltrados, searchFilters, onSearchResults, showSuccess]);

  // Efecto para manejar errores de búsqueda
  useEffect(() => {
    if (searchError && Object.keys(searchFilters).length > 0) {
      showError('Error al realizar la búsqueda de convenios');
    }
  }, [searchError, searchFilters, showError]);

  const handleSearchSubmit = async (filters: Record<string, unknown>) => {
    const formattedFilters = formatConvenioSearchFilters(filters);
    setSearchFilters(formattedFilters);
  };

  const handleCloseAsignarEmpresa = () => {
    setAsignarEmpresaOpen(false);
    setSelectedConvenio(null);
  };

  const handleClearResults = () => {
    setSearchFilters({});
    onClearResults();
  };

  return (
    <>
      <SearchDialog
        title='Búsqueda Avanzada de Convenios'
        buttonText='Búsqueda Avanzada'
        metadata={getConvenioSearchMetadata()}
        onSubmit={handleSearchSubmit}
        onClearResults={handleClearResults}
        hasResults={hasResults}
        dynamicDropdownOptions={dynamicOptions}
        loading={empresasLoading || searchLoading}
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
