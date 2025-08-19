import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../modules/Shared/apis/apiClient';
import { DropdownOption } from '../FormularioGenerico/types';
import React from 'react';

// Configuración de caché para dropdowns (datos que cambian poco)
const DROPDOWN_CACHE_CONFIG = {
  staleTime: 10 * 60 * 1000, // 10 minutos - datos considerados "frescos"
  cacheTime: 30 * 60 * 1000, // 30 minutos - mantener en memoria
  refetchOnWindowFocus: false, // No refetch al cambiar de pestaña
  refetchOnMount: false, // No refetch al montar el componente si hay datos en caché
};

// Tipos para los datos crudos del backend
interface EmpresaDto {
  idEmpresa: number;
  nombre: string;
}

// Interfaces removidas - ya no se usan debido a la optimización

interface PasantiaDto {
  idPasantia: number;
  tramite?: string;
}

// Query keys centralizadas para todos los dropdowns
export const DROPDOWN_QUERY_KEYS = {
  empresas: ['dropdown', 'empresas'] as const,
  estudiantes: ['dropdown', 'estudiantes'] as const,
  convenios: ['dropdown', 'convenios'] as const,
  pasantias: ['dropdown', 'pasantias'] as const,
} as const;

// Hook para empresas en dropdowns
export const useEmpresasDropdown = () => {
  // Query para datos completos (para asignación)
  const queryCompletas = useQuery({
    queryKey: [...DROPDOWN_QUERY_KEYS.empresas, 'completas'],
    queryFn: async () => {
      const data = await apiClient.get<EmpresaDto[]>('/empresas');
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  // Query para sugerencias de nombres (filtradas, sin eliminadas)
  const querySugerencias = useQuery({
    queryKey: [...DROPDOWN_QUERY_KEYS.empresas, 'sugerencias'],
    queryFn: async () => {
      const data = await apiClient.get<string[]>(
        '/empresas/sugerencias-nombres'
      );
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  // Opciones para búsqueda por nombre (usando sugerencias filtradas)
  const empresasOptions: DropdownOption[] = React.useMemo(() => {
    if (!querySugerencias.data || !Array.isArray(querySugerencias.data)) {
      return [];
    }

    return querySugerencias.data.map(nombre => ({
      value: nombre,
      label: nombre,
    }));
  }, [querySugerencias.data]);

  // Opciones para asignación (usando ID de datos completos, filtradas)
  const empresasParaAsignarOptions: DropdownOption[] = React.useMemo(() => {
    if (!queryCompletas.data || !Array.isArray(queryCompletas.data)) {
      return [];
    }

    // Filtrar empresas eliminadas explícitamente como medida de seguridad
    const empresasActivas = queryCompletas.data.filter(
      empresa => empresa.nombre && empresa.nombre.trim() !== '' // Solo empresas con nombre válido
    );

    return empresasActivas.map(empresa => ({
      value: empresa.idEmpresa,
      label: empresa.nombre,
    }));
  }, [queryCompletas.data]);

  // Combinar el estado de ambas queries
  const isLoading = queryCompletas.isLoading || querySugerencias.isLoading;
  const error = queryCompletas.error || querySugerencias.error;

  return {
    isLoading,
    error,
    data: queryCompletas.data, // Para compatibilidad con código existente
    empresasOptions,
    empresasParaAsignarOptions,
    refetch: () => {
      queryCompletas.refetch();
      querySugerencias.refetch();
    },
  };
};

// Hook para estudiantes en dropdowns - MISMO ENDPOINT QUE ESTUDIANTES.TSX
export const useEstudiantesDropdown = () => {
  const query = useQuery({
    queryKey: [...DROPDOWN_QUERY_KEYS.estudiantes, 'estandar'],
    queryFn: async () => {
      // El endpoint GET /students devuelve directamente el array de estudiantes
      const response = await apiClient.get<any[]>('/students');
      return response || [];
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  const estudiantesOptions: DropdownOption[] = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    // Mostrar solo los primeros 15 estudiantes ordenados por apellido para máxima velocidad
    return query.data
      .sort((a, b) => (a.apellido || '').localeCompare(b.apellido || ''))
      .slice(0, 15) // Solo los primeros 15 para performance
      .map(estudiante => ({
        value: estudiante.idEstudiante,
        label: `${estudiante.apellido || 'Sin apellido'}, ${estudiante.nombre || 'Sin nombre'}`,
      }));
  }, [query.data]);

  return {
    ...query,
    estudiantesOptions,
  };
};

// Hook para convenios en dropdowns - OPTIMIZADO
export const useConveniosDropdown = () => {
  const query = useQuery({
    queryKey: [...DROPDOWN_QUERY_KEYS.convenios, 'optimizado'],
    queryFn: async () => {
      const data = await apiClient.get<DropdownOption[]>(
        '/convenios/sugerencias-dropdown'
      );
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  const conveniosOptions: DropdownOption[] = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data; // Ya viene en el formato correcto
  }, [query.data]);

  return {
    ...query,
    conveniosOptions,
  };
};

// Hook para pasantías en dropdowns
export const usePasantiasDropdown = () => {
  // Query para datos completos (para asignación)
  const queryCompletas = useQuery({
    queryKey: [...DROPDOWN_QUERY_KEYS.pasantias, 'completas'],
    queryFn: async () => {
      const data = await apiClient.get<PasantiaDto[]>('/pasantias');
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  // Query para sugerencias de trámites (filtradas)
  const querySugerenciasTramites = useQuery({
    queryKey: [...DROPDOWN_QUERY_KEYS.pasantias, 'sugerencias-tramites'],
    queryFn: async () => {
      const data = await apiClient.get<string[]>(
        '/pasantias/sugerencias-tramites'
      );
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  // Opciones para selección de pasantías (usando ID)
  const pasantiasOptions: DropdownOption[] = React.useMemo(() => {
    if (!queryCompletas.data || !Array.isArray(queryCompletas.data)) {
      return [];
    }

    return queryCompletas.data.map(pasantia => ({
      value: pasantia.idPasantia,
      label: pasantia.tramite || `Pasantía ${pasantia.idPasantia}`,
    }));
  }, [queryCompletas.data]);

  // Opciones para búsqueda de trámites (usando string)
  const tramitesOptions: DropdownOption[] = React.useMemo(() => {
    if (
      !querySugerenciasTramites.data ||
      !Array.isArray(querySugerenciasTramites.data)
    ) {
      return [];
    }

    return querySugerenciasTramites.data.map(tramite => ({
      value: tramite,
      label: tramite,
    }));
  }, [querySugerenciasTramites.data]);

  // Combinar el estado de ambas queries
  const isLoading =
    queryCompletas.isLoading || querySugerenciasTramites.isLoading;
  const error = queryCompletas.error || querySugerenciasTramites.error;

  return {
    isLoading,
    error,
    data: queryCompletas.data, // Para compatibilidad con código existente
    pasantiasOptions,
    tramitesOptions,
    refetch: () => {
      queryCompletas.refetch();
      querySugerenciasTramites.refetch();
    },
  };
};

// Hook combinado para obtener todas las opciones de dropdown
export const useAllDropdownData = () => {
  const empresas = useEmpresasDropdown();
  const estudiantes = useEstudiantesDropdown();
  const convenios = useConveniosDropdown();
  const pasantias = usePasantiasDropdown();

  const isLoading =
    empresas.isLoading ||
    estudiantes.isLoading ||
    convenios.isLoading ||
    pasantias.isLoading;
  const hasError =
    empresas.error || estudiantes.error || convenios.error || pasantias.error;

  return {
    empresas: {
      options: empresas.empresasOptions,
      optionsParaAsignar: empresas.empresasParaAsignarOptions,
      isLoading: empresas.isLoading,
      error: empresas.error,
    },
    estudiantes: {
      options: estudiantes.estudiantesOptions,
      isLoading: estudiantes.isLoading,
      error: estudiantes.error,
    },
    convenios: {
      options: convenios.conveniosOptions,
      isLoading: convenios.isLoading,
      error: convenios.error,
    },
    pasantias: {
      options: pasantias.pasantiasOptions,
      isLoading: pasantias.isLoading,
      error: pasantias.error,
    },
    isLoading,
    hasError,
  };
};

// Hook para invalidar selectivamente el caché de dropdowns
export const useInvalidateDropdowns = () => {
  const queryClient = useQueryClient();

  return {
    invalidateEmpresas: () => {
      queryClient.invalidateQueries({
        queryKey: [...DROPDOWN_QUERY_KEYS.empresas, 'completas'],
      });
      queryClient.invalidateQueries({
        queryKey: [...DROPDOWN_QUERY_KEYS.empresas, 'sugerencias'],
      });
    },
    invalidateEstudiantes: () =>
      queryClient.invalidateQueries({
        queryKey: [...DROPDOWN_QUERY_KEYS.estudiantes, 'estandar'],
      }),
    invalidateConvenios: () =>
      queryClient.invalidateQueries({
        queryKey: [...DROPDOWN_QUERY_KEYS.convenios, 'optimizado'],
      }),
    invalidatePasantias: () => {
      queryClient.invalidateQueries({
        queryKey: [...DROPDOWN_QUERY_KEYS.pasantias, 'completas'],
      });
      queryClient.invalidateQueries({
        queryKey: [...DROPDOWN_QUERY_KEYS.pasantias, 'sugerencias-tramites'],
      });
    },
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: ['dropdown'] });
    },
  };
};

// Hook para prefetch de datos de dropdown (útil para optimización preemptiva)
export const usePrefetchDropdowns = () => {
  const queryClient = useQueryClient();

  const prefetchEmpresas = () => {
    queryClient.prefetchQuery({
      queryKey: [...DROPDOWN_QUERY_KEYS.empresas, 'completas'],
      queryFn: async () => apiClient.get<EmpresaDto[]>('/empresas'),
      ...DROPDOWN_CACHE_CONFIG,
    });
    queryClient.prefetchQuery({
      queryKey: [...DROPDOWN_QUERY_KEYS.empresas, 'sugerencias'],
      queryFn: async () =>
        apiClient.get<string[]>('/empresas/sugerencias-nombres'),
      ...DROPDOWN_CACHE_CONFIG,
    });
  };

  const prefetchEstudiantes = () => {
    queryClient.prefetchQuery({
      queryKey: [...DROPDOWN_QUERY_KEYS.estudiantes, 'estandar'],
      queryFn: async () => {
        const response = await apiClient.get<{ data: any[] }>('/students');
        return response.data || [];
      },
      ...DROPDOWN_CACHE_CONFIG,
    });
  };

  const prefetchConvenios = () => {
    queryClient.prefetchQuery({
      queryKey: [...DROPDOWN_QUERY_KEYS.convenios, 'optimizado'],
      queryFn: async () =>
        apiClient.get<DropdownOption[]>('/convenios/sugerencias-dropdown'),
      ...DROPDOWN_CACHE_CONFIG,
    });
  };

  const prefetchPasantias = () => {
    queryClient.prefetchQuery({
      queryKey: [...DROPDOWN_QUERY_KEYS.pasantias, 'completas'],
      queryFn: async () => apiClient.get<PasantiaDto[]>('/pasantias'),
      ...DROPDOWN_CACHE_CONFIG,
    });
    queryClient.prefetchQuery({
      queryKey: [...DROPDOWN_QUERY_KEYS.pasantias, 'sugerencias-tramites'],
      queryFn: async () =>
        apiClient.get<string[]>('/pasantias/sugerencias-tramites'),
      ...DROPDOWN_CACHE_CONFIG,
    });
  };

  const prefetchAll = () => {
    prefetchEmpresas();
    prefetchEstudiantes();
    prefetchConvenios();
    prefetchPasantias();
  };

  return {
    prefetchEmpresas,
    prefetchEstudiantes,
    prefetchConvenios,
    prefetchPasantias,
    prefetchAll,
  };
};
