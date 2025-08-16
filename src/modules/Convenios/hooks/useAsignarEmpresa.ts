import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';

interface AsignarEmpresaDto {
  convenioId: number;
  empresaId: number;
}

export const useAsignarEmpresa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AsignarEmpresaDto) => {
      await apiClient.post('/convenios/asignar-empresa', data);
    },
    onSuccess: () => {
      // Invalidar la caché de convenios para forzar una recarga
      queryClient.invalidateQueries({ queryKey: ['/convenios/conEmpresa'] });
    },
  });
};
