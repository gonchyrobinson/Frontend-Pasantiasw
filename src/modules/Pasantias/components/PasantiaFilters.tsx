import React, { useState, useEffect } from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getPasantiaSearchMetadata,
  formatPasantiaSearchFilters,
} from '../helpers/pasantiaSearchHelpers';
import { PasantiaDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';
import { useEmpresasDropdown } from '../../../lib/hooks/useDropdownData';

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
  const { showError, showSuccess } = useSnackbar();
  const { empresasOptions, isLoading: empresasLoading } = useEmpresasDropdown();
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, Array<{ value: string | number; label: string }>>
  >({});

  // Cargar sugerencias al montar el componente
  useEffect(() => {
    const cargarSugerencias = async () => {
      try {
        // Cargar números de trámite únicos
        const numerosTramite = await apiClient.get<string[]>(
          '/pasantias/sugerencias-numeros-tramite'
        );

        // Cargar documentos de estudiantes únicos
        const estudiantes = await apiClient.get<
          Array<{ value: string; label: string }>
        >('/students/documentos-dropdown');

        setDynamicOptions({
          numeroTramite: numerosTramite.map(numero => ({
            value: numero,
            label: numero,
          })),
          estudiante: estudiantes, // Ya tiene el formato correcto { value, label }
          empresa: empresasOptions || [],
        });
      } catch (error) {
        console.error('Error al cargar sugerencias:', error);
        // Si falla la carga, al menos cargar empresas
        setDynamicOptions({
          empresa: empresasOptions || [],
        });
      }
    };

    cargarSugerencias();
  }, [empresasOptions]);

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
      dynamicDropdownOptions={dynamicOptions}
      loading={empresasLoading}
    />
  );
};

export default PasantiaFilters;
