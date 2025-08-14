import React from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { PagosDto, CreatePagosDto } from '../types';
import { calculatePagosStats } from '../helpers/pagosHelpers';
import { ApiResponse } from '../../../types';
import { apiClient } from '../../Shared/apis/apiClient';

// Hook para obtener todos los pagos
export const usePagos = () => {
  return useQuery({
    queryKey: ['pagos'],
    queryFn: async () => {
      const data = await apiClient.get<PagosDto[]>('pagos');
      return { data } as ApiResponse<PagosDto[]>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener un pago específico
export const usePago = (id: number) => {
  return useQuery({
    queryKey: ['pago', id],
    queryFn: async () => {
      const data = await apiClient.get<PagosDto>(`pagos/${id}`);
      return { data } as ApiResponse<PagosDto>;
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

// Hook para crear pago
export const useCreatePago = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePagosDto & Record<string, unknown>) => {
      const result = await apiClient.post<PagosDto>('pagos', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para actualizar pago
export const useUpdatePago = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PagosDto & Record<string, unknown>) => {
      const result = await apiClient.put<PagosDto>('pagos', data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para eliminar pago
export const useDeletePago = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete<void>(`pagos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
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
