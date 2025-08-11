import React from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getEstudianteSearchMetadata,
  formatEstudianteSearchFilters,
} from '../helpers/estudianteSearchHelpers';
import { EstudianteDto } from '../types';
import { useSnackbar } from '../../../hooks/useSnackbar';
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
    />
  );
};

export default EstudiantesFilters;
