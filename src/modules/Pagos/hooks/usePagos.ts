import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PagosDto, CreatePagosDto } from '../types';
import { calculatePagosStats } from '../helpers/pagosHelpers';
import {
  useApiQuery,
  useApiMutation,
  useApiUpdate,
  useApiDelete,
} from '../../../hooks/useApi';

// Hook para obtener todos los pagos
export const usePagos = () => {
  return useApiQuery<PagosDto[]>('pagos', {
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener un pago específico
export const usePago = (id: number) => {
  return useApiQuery<PagosDto>(`pagos/${id}`, {
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

// Hook para crear pago
export const useCreatePago = () => {
  const queryClient = useQueryClient();

  return useApiMutation<PagosDto, CreatePagosDto>('pagos', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para actualizar pago
export const useUpdatePago = () => {
  const queryClient = useQueryClient();

  return useApiUpdate<PagosDto, PagosDto>('pagos', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para eliminar pago
export const useDeletePago = () => {
  const queryClient = useQueryClient();

  return useApiDelete<void>('pagos', {
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
