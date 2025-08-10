import { useState } from 'react';
import { apiClient } from '../../../modules/Shared/apis/apiClient';

export const useDeleteConvenio = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteConvenio = async (idConvenio: number) => {
    setIsDeleting(true);

    try {
      await apiClient.delete<void>(`/convenios/${idConvenio}`);
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Error al eliminar el convenio. Inténtalo de nuevo.';
      throw new Error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteConvenio,
    isDeleting,
  };
};
