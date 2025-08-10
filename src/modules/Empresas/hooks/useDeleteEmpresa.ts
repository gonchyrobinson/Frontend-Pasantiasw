import { useState } from 'react';
import { apiClient } from '../../../modules/Shared/apis/apiClient';

export const useDeleteEmpresa = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteEmpresa = async (idEmpresa: number) => {
    setIsDeleting(true);

    try {
      // Usar el apiClient para mantener consistencia con el resto de la app
      await apiClient.delete<void>(`/empresas/${idEmpresa}`);
    } catch (error: unknown) {
      console.log(error);
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Error al eliminar la empresa. Inténtalo de nuevo.';
      throw new Error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteEmpresa,
    isDeleting,
  };
};
