import { useState } from 'react';
import { apiClient } from '../../../modules/Shared/apis/apiClient';

export const useDeleteEstudiante = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteEstudiante = async (idEstudiante: number) => {
    setIsDeleting(true);

    try {
      // Usar el apiClient para mantener consistencia con el resto de la app
      await apiClient.delete<void>(`/students/${idEstudiante}`);
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Error al eliminar el estudiante. Inténtalo de nuevo.';
      throw new Error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteEstudiante,
    isDeleting,
  };
};
