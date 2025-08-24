import React, { useState, useEffect } from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getPagosSearchMetadata,
  formatPagosSearchFilters,
} from '../helpers/pagosSearchHelpers';
import { PagosDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';

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
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, Array<{ value: string | number; label: string }>>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  // Cargar sugerencias al montar el componente
  useEffect(() => {
    const cargarSugerencias = async () => {
      try {
        setIsLoading(true);

        // Cargar empresas únicas
        const empresas = await apiClient.get<
          Array<{ value: number; label: string }>
        >('/pagos/sugerencias-empresas');

        // Cargar documentos de estudiantes únicos
        const estudiantes = await apiClient.get<
          Array<{ value: string; label: string }>
        >('/pagos/sugerencias-estudiantes');

        setDynamicOptions({
          idEmpresa: empresas,
          estudiante: estudiantes,
        });
      } catch (error) {
        console.error('Error al cargar sugerencias:', error);
        showError('Error al cargar las opciones de búsqueda');
      } finally {
        setIsLoading(false);
      }
    };

    cargarSugerencias();
  }, [showError]);

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
      loading={isLoading}
    />
  );
};

export default PagosFilters;
