import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';
import { PasantiaDto, PasantiaCreateDto, PasantiaDetalleDto } from '../types';
import React from 'react';

const API_BASE = '/pasantias';

// Hook para obtener todas las pasantías
export const usePasantias = () => {
  return useQuery({
    queryKey: ['pasantias'],
    queryFn: async () => {
      const data = await apiClient.get<PasantiaDto[]>(API_BASE);
      return data;
    },
  });
};

// Hook para obtener todas las pasantías con detalle (incluye estudiante y convenio)
export const usePasantiasDetalle = () => {
  return useQuery({
    queryKey: ['pasantias', 'detalle'],
    queryFn: async () => {
      const data = await apiClient.get<PasantiaDetalleDto[]>(
        `${API_BASE}/detalle`
      );
      return data;
    },
  });
};

// Hook para obtener pasantías por convenio
export const usePasantiasByConvenio = (convenioId: number | null) => {
  return useQuery({
    queryKey: ['pasantias', 'convenio', convenioId],
    queryFn: async () => {
      const data = await apiClient.get<PasantiaDto[]>(
        `${API_BASE}/convenio/${convenioId}`
      );
      return data;
    },
    enabled: !!convenioId,
  });
};

// Hook para obtener pasantías por estudiante
export const usePasantiasByEstudiante = (estudianteId: number | null) => {
  return useQuery({
    queryKey: ['pasantias', 'estudiante', estudianteId],
    queryFn: async () => {
      const data = await apiClient.get<PasantiaDto[]>(
        `${API_BASE}/estudiante/${estudianteId}`
      );
      return data;
    },
    enabled: !!estudianteId,
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

  return useMutation({
    mutationFn: async (data: PasantiaCreateDto) => {
      const result = await apiClient.post<PasantiaDto>(API_BASE, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pasantiaStats'] });
    },
  });
};

// Hook para actualizar una pasantía
export const useUpdatePasantia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: PasantiaCreateDto }) => {
      const result = await apiClient.put<PasantiaDto>(`${API_BASE}`, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pasantiaStats'] });
    },
  });
};

// Hook para eliminar una pasantía
export const useDeletePasantia = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await apiClient.delete<void>(`${API_BASE}/${id}`);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pasantiaStats'] });
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

// Hook para obtener todos los estudiantes (para dropdowns)
export const useEstudiantesForDropdown = () => {
  return useQuery({
    queryKey: ['estudiantes', 'dropdown'],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await apiClient.get<any[]>('/students');
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.map((estudiante: any) => ({
          value: estudiante.idEstudiante,
          label: `${estudiante.apellido}, ${estudiante.nombre} - ${estudiante.carrera}`,
        })) || []
      );
    },
  });
};

// Hook para obtener todos los convenios (para dropdowns)
export const useConveniosForDropdown = () => {
  return useQuery({
    queryKey: ['convenios', 'dropdown'],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await apiClient.get<any[]>('/convenios');
      return (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.map((convenio: any) => ({
          value: convenio.idConvenio,
          label: convenio.expediente || `Convenio ${convenio.idConvenio}`,
        })) || []
      );
    },
  });
};
