import { useState } from 'react';
import { apiClient } from '../../../modules/Shared/apis/apiClient';

interface AxiosErrorResponse {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  request?: unknown;
  message?: string;
}

export const useDeleteConvenio = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteConvenio = async (idConvenio: number) => {
    setIsDeleting(true);

    try {
      await apiClient.delete<void>(`/convenios/${idConvenio}`);
    } catch (error: unknown) {
      let errorMessage = 'Error al eliminar el convenio. Inténtalo de nuevo.';

      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as AxiosErrorResponse).response;
        if (response) {
          const { status, data } = response;

          switch (status) {
            case 404:
              errorMessage = 'Convenio no encontrado';
              break;
            case 400:
              errorMessage = data?.message || 'Error en la solicitud';
              break;
            case 500:
              errorMessage =
                'Error interno del servidor. Contacta al administrador.';
              break;
            default:
              errorMessage = data?.message || errorMessage;
          }
        }
      } else if (error && typeof error === 'object' && 'request' in error) {
        errorMessage = 'No se pudo conectar con el servidor';
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as Error).message;
      }

      throw new Error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteConvenio,
    isDeleting,
  };
};
