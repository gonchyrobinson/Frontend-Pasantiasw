import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';
import { PagosDto } from '../types';

// Hook para obtener pagos por vencer
export const usePagosPorVencer = (diasAdelante = 30) => {
  return useQuery({
    queryKey: ['pagos', 'por-vencer', diasAdelante],
    queryFn: async () => {
      const data = await apiClient.get<PagosDto[]>(
        `/pagos/por-vencer?dias=${diasAdelante}`
      );
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchInterval: 10 * 60 * 1000, // Refrescar cada 10 minutos para notificaciones
    refetchOnWindowFocus: true, // Refrescar cuando el usuario vuelve a la pestaña
  });
};
