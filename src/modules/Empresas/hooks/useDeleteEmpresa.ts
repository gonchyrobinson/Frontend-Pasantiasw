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

export const useDeleteEmpresa = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteEmpresa = async (idEmpresa: number) => {
    setIsDeleting(true);

    try {
      // Usar el apiClient para mantener consistencia con el resto de la app
      await apiClient.delete<void>(`/empresas/${idEmpresa}`);
    } catch (error: unknown) {
      // Manejar diferentes tipos de errores del backend
      let errorMessage = 'Error al eliminar la empresa. Inténtalo de nuevo.';

      if (error && typeof error === 'object' && 'response' in error) {
        const response = (error as AxiosErrorResponse).response;
        if (response) {
          const { status, data } = response;

          switch (status) {
            case 404:
              errorMessage = 'Empresa no encontrada';
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
    deleteEmpresa,
    isDeleting,
  };
};
