import { useState } from 'react';
import { apiClient } from '../../modules/Shared/apis/apiClient';
import { useInvalidateDropdowns } from './useDropdownData';

interface UseDeleteOptions {
  endpoint: string;
  entityName: string;
}

export const useDelete = ({ endpoint, entityName }: UseDeleteOptions) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    invalidateEmpresas,
    invalidateEstudiantes,
    invalidateConvenios,
    invalidatePasantias,
  } = useInvalidateDropdowns();

  const deleteEntity = async (id: number) => {
    setIsDeleting(true);

    try {
      await apiClient.delete<void>(`/${endpoint}/${id}`);

      // Invalidar caché de dropdowns según el endpoint
      if (endpoint === 'empresas') {
        invalidateEmpresas();
      } else if (endpoint === 'students') {
        invalidateEstudiantes();
      } else if (endpoint === 'convenios') {
        invalidateConvenios();
      } else if (endpoint === 'pasantias') {
        invalidatePasantias();
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : `Error al eliminar ${entityName}. Inténtalo de nuevo.`;
      throw new Error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteEntity,
    isDeleting,
  };
};

// Hooks específicos para retrocompatibilidad
export const useDeleteEmpresa = () => {
  const { deleteEntity, isDeleting } = useDelete({
    endpoint: 'empresas',
    entityName: 'la empresa',
  });

  return {
    deleteEmpresa: deleteEntity,
    isDeleting,
  };
};

export const useDeleteEstudiante = () => {
  const { deleteEntity, isDeleting } = useDelete({
    endpoint: 'students',
    entityName: 'el estudiante',
  });

  return {
    deleteEstudiante: deleteEntity,
    isDeleting,
  };
};
