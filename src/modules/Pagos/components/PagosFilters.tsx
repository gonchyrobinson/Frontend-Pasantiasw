import React, { useState, useEffect } from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getPagosSearchMetadata,
  formatPagosSearchFilters,
} from '../helpers/pagosHelpers';
import { PagosDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';
import {
  useEmpresasDropdown,
  useEstudiantesDropdown,
} from '../../../lib/hooks/useDropdownData';

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
  const { empresasParaAsignarOptions, isLoading: empresasLoading } =
    useEmpresasDropdown();
  const { estudiantesOptions, isLoading: estudiantesLoading } =
    useEstudiantesDropdown();
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, Array<{ value: string | number; label: string }>>
  >({});

  // Configurar opciones dinámicas usando los hooks centralizados
  useEffect(() => {
    setDynamicOptions({
      idEmpresa: empresasParaAsignarOptions || [], // Usar opciones para asignar (con ID)
      estudiante: estudiantesOptions || [], // Usar opciones de estudiantes (documentos)
    });
  }, [empresasParaAsignarOptions, estudiantesOptions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatPagosSearchFilters(filters);

      // Usar el nuevo endpoint de búsqueda avanzada
      const pagos = await apiClient.post<PagosDto[]>(
        '/pagos/buscar-avanzado',
        searchFilters as Record<string, unknown>
      );

      onSearchResults(pagos);
      showSuccess(`Búsqueda completada: ${pagos.length} pagos encontrados`);
    } catch (error) {
      showError('Error al realizar la búsqueda de pagos');
      throw error;
    }
  };

  return (
    <SearchDialog
      title='Búsqueda Avanzada de Pagos'
      buttonText='Búsqueda Avanzada'
      metadata={getPagosSearchMetadata()}
      onSubmit={handleSearchSubmit}
      onClearResults={onClearResults}
      hasResults={hasResults}
      dynamicDropdownOptions={dynamicOptions}
      loading={empresasLoading || estudiantesLoading}
    />
  );
};

export default PagosFilters;
