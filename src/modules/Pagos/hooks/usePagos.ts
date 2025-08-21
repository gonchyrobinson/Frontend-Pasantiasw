import React from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { PagosDto, CreatePagosDto, MarcarPagoDto } from '../types';
import { calculatePagosStats } from '../helpers/pagosHelpers';
import { useApiQuery } from '../../../lib/hooks/useApi';
import { apiClient } from '../../Shared/apis/apiClient';

// Hook para obtener todos los pagos
export const usePagos = () => {
  return useApiQuery<PagosDto[]>('/pagos', {
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener un pago específico
export const usePago = (id: number) => {
  return useApiQuery<PagosDto>(`/pagos/${id}`, {
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

// Hook para obtener pagos por pasantía
export const usePagosByPasantia = (idPasantia: number | null) => {
  return useQuery({
    queryKey: ['pagos', 'by-pasantia', idPasantia],
    queryFn: async () => {
      const data = await apiClient.get<PagosDto[]>(
        `/pagos/by-pasantia/${idPasantia}`
      );
      return data;
    },
    enabled: !!idPasantia,
  });
};

// Hook para obtener pagos por vencer
export const usePagosPorVencer = (fecha: string) => {
  return useQuery({
    queryKey: ['pagos', 'por-vencer', fecha],
    queryFn: async () => {
      const data = await apiClient.get<PagosDto[]>(
        `/pagos/por-vencer?fecha=${fecha}`
      );
      return data;
    },
    enabled: !!fecha,
  });
};

// Hook para crear pago
export const useCreatePago = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePagosDto) => {
      const result = await apiClient.post<PagosDto>('/pagos', data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con pagos
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
      queryClient.invalidateQueries({ queryKey: ['pago'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
    },
  });
};

// Hook para actualizar pago
export const useUpdatePago = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PagosDto) => {
      const result = await apiClient.put<PagosDto>('/pagos', data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con pagos
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
      queryClient.invalidateQueries({ queryKey: ['pago'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
    },
  });
};

// Hook para marcar pago como pagado
export const useMarcarPagoPagado = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MarcarPagoDto) => {
      const response = await apiClient.post<PagosDto>(
        '/pagos/marcar-pagado',
        data
      );
      return response;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con pagos
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
      queryClient.invalidateQueries({ queryKey: ['pago'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
    },
  });
};

// Hook para obtener estadísticas de pagos
export const usePagosStats = () => {
  const { data: pagosResponse, isLoading, error } = usePagos();

  const stats = React.useMemo(() => {
    const pagos = pagosResponse?.data;
    if (!pagos || !Array.isArray(pagos)) {
      return {
        totalPagos: 0,
        pagosVigentes: 0,
        pagosVencidos: 0,
        montoTotal: 0,
      };
    }

    return calculatePagosStats(pagos);
  }, [pagosResponse]);

  return {
    stats,
    isLoading,
    error,
  };
};
