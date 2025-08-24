import React, { useState, useEffect } from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getEstudianteSearchMetadata,
  formatEstudianteSearchFilters,
  getSugerenciasDocumentos,
} from '../helpers/estudianteSearchHelpers';
import { EstudianteDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';

interface EstudiantesFiltersProps {
  onSearchResults: (estudiantes: EstudianteDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

const EstudiantesFilters: React.FC<EstudiantesFiltersProps> = ({
  onSearchResults,
  onClearResults,
  hasResults = false,
}) => {
  const { showError, showSuccess } = useSnackbar();
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, Array<{ value: string | number; label: string }>>
  >({});

  // Cargar sugerencias al montar el componente
  useEffect(() => {
    const cargarSugerencias = async () => {
      try {
        const documentos = await getSugerenciasDocumentos();

        setDynamicOptions({
          documento: documentos,
        });
      } catch (error) {
        console.error('Error al cargar sugerencias:', error);
      }
    };

    cargarSugerencias();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatEstudianteSearchFilters(filters);
      const estudiantes = await apiClient.post<EstudianteDto[]>(
        '/students/buscar-avanzado',
        searchFilters as Record<string, unknown>
      );
      onSearchResults(estudiantes);
      showSuccess('Búsqueda completada exitosamente');
    } catch (error) {
      showError('Error al realizar la búsqueda de estudiantes');
      throw error; // Re-lanzar para que SearchDialog maneje el cierre
    }
  };

  return (
    <SearchDialog
      title='Búsqueda Avanzada de Estudiantes'
      buttonText='Búsqueda Avanzada'
      metadata={getEstudianteSearchMetadata()}
      onSubmit={handleSearchSubmit}
      onClearResults={onClearResults}
      hasResults={hasResults}
      dynamicDropdownOptions={dynamicOptions}
    />
  );
};

export default EstudiantesFilters;
