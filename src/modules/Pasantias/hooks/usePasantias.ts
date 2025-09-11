import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';
import { PasantiaDto, PasantiaCreateDto, PasantiaShowTableDto } from '../types';
import { useInvalidateDropdowns } from '../../../lib/hooks/useDropdownData';
import React from 'react';

const API_BASE = '/pasantias';

// Hook para obtener todas las pasantías
export const usePasantias = () => {
  return useQuery({
    queryKey: ['pasantias'],
    queryFn: async () => {
      const data = await apiClient.get<PasantiaShowTableDto[]>(
        `${API_BASE}/show-table`
      );
      return data;
    },
  });
};

// Hook para obtener una pasantía específica
export const usePasantia = (id: number | null) => {
  return useQuery({
    queryKey: ['pasantia', id],
    queryFn: async () => {
      const data = await apiClient.get<PasantiaDto>(`${API_BASE}/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Hook para crear una pasantía
export const useCreatePasantia = () => {
  const queryClient = useQueryClient();
  const { invalidatePasantias } = useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (data: PasantiaCreateDto) => {
      const result = await apiClient.post<PasantiaDto>(API_BASE, data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con pasantías
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pasantia'] });
      queryClient.invalidateQueries({ queryKey: ['pasantiaStats'] });

      // Invalidar dropdowns de pasantías
      invalidatePasantias();

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para actualizar una pasantía
export const useUpdatePasantia = () => {
  const queryClient = useQueryClient();
  const { invalidatePasantias } = useInvalidateDropdowns();

  return useMutation({
    mutationFn: async ({ data }: { data: PasantiaCreateDto }) => {
      const result = await apiClient.put<PasantiaDto>(`${API_BASE}`, data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con pasantías
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pasantia'] });
      queryClient.invalidateQueries({ queryKey: ['pasantiaStats'] });

      // Invalidar dropdowns de pasantías
      invalidatePasantias();

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para eliminar una pasantía
export const useDeletePasantia = () => {
  const queryClient = useQueryClient();
  const { invalidatePasantias } = useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await apiClient.delete<void>(`${API_BASE}/${id}`);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con pasantías
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pasantia'] });
      queryClient.invalidateQueries({ queryKey: ['pasantiaStats'] });

      // Invalidar dropdowns de pasantías
      invalidatePasantias();

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para obtener estadísticas de pasantías
export const usePasantiaStats = () => {
  const { data: pasantias, isLoading, error } = usePasantias();

  const stats = React.useMemo(() => {
    if (!pasantias || !Array.isArray(pasantias)) {
      return {
        totalPasantias: 0,
        pasantiasActivas: 0,
        pasantiasFinalizadas: 0,
        pasantiasPorVencer: 0,
      };
    }

    const totalPasantias = pasantias.length;
    const fechaActual = new Date();

    const pasantiasActivas = pasantias.filter(pasantia => {
      if (!pasantia.fechaFin) return false;
      const fechaFin = new Date(pasantia.fechaFin);
      return fechaFin > fechaActual;
    }).length;

    const pasantiasFinalizadas = pasantias.filter(pasantia => {
      if (!pasantia.fechaFin) return false;
      const fechaFin = new Date(pasantia.fechaFin);
      return fechaFin <= fechaActual;
    }).length;

    // Pasantías que finalizan en los próximos 30 días
    const treintaDias = new Date();
    treintaDias.setDate(treintaDias.getDate() + 30);

    const pasantiasPorVencer = pasantias.filter(pasantia => {
      if (!pasantia.fechaFin) return false;
      const fechaFin = new Date(pasantia.fechaFin);
      return fechaFin > fechaActual && fechaFin <= treintaDias;
    }).length;

    return {
      totalPasantias,
      pasantiasActivas,
      pasantiasFinalizadas,
      pasantiasPorVencer,
    };
  }, [pasantias]);

  return {
    stats,
    isLoading,
    error,
  };
};

// Hook para obtener pasantías por vencer
export const usePasantiasPorVencer = (diasAdelante = 30) => {
  return useQuery({
    queryKey: ['pasantias', 'por-vencer', diasAdelante],
    queryFn: async () => {
      const response = await apiClient.get<PasantiaDto[]>(
        `/pasantias/por-vencer?dias=${diasAdelante}`
      );
      return response;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchInterval: 10 * 60 * 1000, // Refrescar cada 10 minutos para notificaciones
    refetchOnWindowFocus: true, // Refrescar cuando el usuario vuelve a la pestaña
  });
};
