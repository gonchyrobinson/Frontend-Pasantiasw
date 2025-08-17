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

interface EstudianteDto {
  idEstudiante: number;
  nombre: string;
  apellido: string;
  carrera: string;
}

interface ConvenioDto {
  idConvenio: number;
  expediente?: string;
}

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
  const query = useQuery({
    queryKey: DROPDOWN_QUERY_KEYS.empresas,
    queryFn: async () => {
      const data = await apiClient.get<EmpresaDto[]>('/empresas');
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  // Opciones para búsqueda por nombre
  const empresasOptions: DropdownOption[] = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.map(empresa => ({
      value: empresa.nombre,
      label: empresa.nombre,
    }));
  }, [query.data]);

  // Opciones para asignación (usando ID)
  const empresasParaAsignarOptions: DropdownOption[] = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.map(empresa => ({
      value: empresa.idEmpresa,
      label: empresa.nombre,
    }));
  }, [query.data]);

  return {
    ...query,
    empresasOptions,
    empresasParaAsignarOptions,
  };
};

// Hook para estudiantes en dropdowns
export const useEstudiantesDropdown = () => {
  const query = useQuery({
    queryKey: DROPDOWN_QUERY_KEYS.estudiantes,
    queryFn: async () => {
      const data = await apiClient.get<EstudianteDto[]>('/students');
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  const estudiantesOptions: DropdownOption[] = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.map(estudiante => ({
      value: estudiante.idEstudiante,
      label: `${estudiante.apellido}, ${estudiante.nombre} - ${estudiante.carrera}`,
    }));
  }, [query.data]);

  return {
    ...query,
    estudiantesOptions,
  };
};

// Hook para convenios en dropdowns
export const useConveniosDropdown = () => {
  const query = useQuery({
    queryKey: DROPDOWN_QUERY_KEYS.convenios,
    queryFn: async () => {
      const data = await apiClient.get<ConvenioDto[]>('/convenios');
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  const conveniosOptions: DropdownOption[] = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.map(convenio => ({
      value: convenio.idConvenio,
      label: convenio.expediente || `Convenio ${convenio.idConvenio}`,
    }));
  }, [query.data]);

  return {
    ...query,
    conveniosOptions,
  };
};

// Hook para pasantías en dropdowns
export const usePasantiasDropdown = () => {
  const query = useQuery({
    queryKey: DROPDOWN_QUERY_KEYS.pasantias,
    queryFn: async () => {
      const data = await apiClient.get<PasantiaDto[]>('/pasantias');
      return data;
    },
    ...DROPDOWN_CACHE_CONFIG,
  });

  const pasantiasOptions: DropdownOption[] = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.map(pasantia => ({
      value: pasantia.idPasantia,
      label: pasantia.tramite || `Pasantía ${pasantia.idPasantia}`,
    }));
  }, [query.data]);

  return {
    ...query,
    pasantiasOptions,
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
    invalidateEmpresas: () =>
      queryClient.invalidateQueries({ queryKey: DROPDOWN_QUERY_KEYS.empresas }),
    invalidateEstudiantes: () =>
      queryClient.invalidateQueries({
        queryKey: DROPDOWN_QUERY_KEYS.estudiantes,
      }),
    invalidateConvenios: () =>
      queryClient.invalidateQueries({
        queryKey: DROPDOWN_QUERY_KEYS.convenios,
      }),
    invalidatePasantias: () =>
      queryClient.invalidateQueries({
        queryKey: DROPDOWN_QUERY_KEYS.pasantias,
      }),
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
      queryKey: DROPDOWN_QUERY_KEYS.empresas,
      queryFn: async () => apiClient.get<EmpresaDto[]>('/empresas'),
      ...DROPDOWN_CACHE_CONFIG,
    });
  };

  const prefetchEstudiantes = () => {
    queryClient.prefetchQuery({
      queryKey: DROPDOWN_QUERY_KEYS.estudiantes,
      queryFn: async () => apiClient.get<EstudianteDto[]>('/students'),
      ...DROPDOWN_CACHE_CONFIG,
    });
  };

  const prefetchConvenios = () => {
    queryClient.prefetchQuery({
      queryKey: DROPDOWN_QUERY_KEYS.convenios,
      queryFn: async () => apiClient.get<ConvenioDto[]>('/convenios'),
      ...DROPDOWN_CACHE_CONFIG,
    });
  };

  const prefetchPasantias = () => {
    queryClient.prefetchQuery({
      queryKey: DROPDOWN_QUERY_KEYS.pasantias,
      queryFn: async () => apiClient.get<PasantiaDto[]>('/pasantias'),
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
