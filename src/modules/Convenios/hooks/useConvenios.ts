import React from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  useApiQuery,
  useApiMutation,
  useApiUpdate,
} from '../../../hooks/useApi';
import { ROUTES } from '../../../helpers/routesHelper';
import {
  ConvenioEmpresaDto,
  ConvenioDto,
  ConvenioCreateDto,
  AsignarEmpresaDto,
  ConvenioFilters,
} from '../types';
import {
  calculateConvenioStats,
  getDefaultConvenioValues,
} from '../helpers/convenioHelpers';
import { apiClient } from '../../Shared/apis/apiClient';

// Hook para obtener todos los convenios con empresa usando POST
// Este es un caso especial que requiere POST en lugar de GET
export const useConvenios = () => {
  return useQuery({
    queryKey: ['/Convenios/conEmpresa'],
    queryFn: async () => {
      const response = await apiClient.post<ConvenioEmpresaDto[]>(
        '/Convenios/conEmpresa',
        getDefaultConvenioValues()
      );
      return response as unknown as ConvenioEmpresaDto[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
  });
};

// Hook para obtener un convenio específico
export const useConvenio = (id: number) => {
  return useApiQuery<ConvenioDto>(`${ROUTES.CONVENIOS}/${id}`, {
    enabled: !!id,
    // Forzar refetch en cada montaje/refresh con pocas líneas
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

// Hook para crear convenio
export const useCreateConvenio = () => {
  const queryClient = useQueryClient();

  return useApiMutation<
    ConvenioDto,
    ConvenioCreateDto & Record<string, unknown>
  >(ROUTES.CONVENIOS, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['/Convenios/conEmpresa'],
      });
    },
  });
};

// Hook para actualizar convenio
export const useUpdateConvenio = () => {
  const queryClient = useQueryClient();

  return useApiUpdate<ConvenioDto, ConvenioDto & Record<string, unknown>>(
    ROUTES.CONVENIOS,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['/Convenios/conEmpresa'],
        });
      },
    }
  );
};

// Hook para eliminar convenio
export { useDeleteConvenio } from './useDeleteConvenio';

// Hook para caducar convenio
export const useCaducarConvenio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      fechaCaducidad,
    }: {
      id: number;
      fechaCaducidad: string;
    }) =>
      apiClient.post<void>(
        `/Convenios/caducar/${id}`,
        fechaCaducidad as unknown as Record<string, unknown>
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['/Convenios/conEmpresa'],
      });
    },
  });
};

// Hook para asignar empresa a convenio
export const useAsignarEmpresa = () => {
  const queryClient = useQueryClient();

  return useApiMutation<void, AsignarEmpresaDto & Record<string, unknown>>(
    `${ROUTES.CONVENIOS}/asignar-empresa`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['/Convenios/conEmpresa'],
        });
      },
    }
  );
};

// Hook para obtener estadísticas de convenios
export const useConvenioStats = () => {
  const { data: conveniosResponse, isLoading, error } = useConvenios();

  const stats = React.useMemo(() => {
    const convenios = conveniosResponse;
    if (!convenios || !Array.isArray(convenios)) {
      return {
        totalConvenios: 0,
        conveniosVigentes: 0,
        conveniosCaducados: 0,
        conveniosPorVencer: 0,
      };
    }

    return calculateConvenioStats(convenios);
  }, [conveniosResponse]);

  return {
    stats,
    isLoading,
    error,
  };
};

// Hook para manejar filtros de convenios
export const useConvenioFilters = () => {
  const { data: conveniosResponse, isLoading, error } = useConvenios();
  const [filters, setFilters] = React.useState<ConvenioFilters>({
    expediente: '',
    empresa: '',
    fechaFirmaDesde: '',
    fechaFirmaHasta: '',
    fechaCaducidadDesde: '',
    fechaCaducidadHasta: '',
  });

  const filteredConvenios = React.useMemo(() => {
    const convenios = conveniosResponse;
    if (!convenios || !Array.isArray(convenios)) return [];

    return convenios.filter((convenio: ConvenioEmpresaDto) => {
      // Filtro por expediente
      if (
        filters.expediente &&
        !convenio.expediente
          ?.toLowerCase()
          .includes(filters.expediente.toLowerCase())
      ) {
        return false;
      }

      // Filtro por empresa
      if (
        filters.empresa &&
        !convenio.nombreEmpresa
          ?.toLowerCase()
          .includes(filters.empresa.toLowerCase())
      ) {
        return false;
      }

      // Filtro por fecha de firma
      if (filters.fechaFirmaDesde && convenio.fechaFirma) {
        const fechaFirma = new Date(convenio.fechaFirma);
        const fechaDesde = new Date(filters.fechaFirmaDesde);
        if (fechaFirma < fechaDesde) return false;
      }

      if (filters.fechaFirmaHasta && convenio.fechaFirma) {
        const fechaFirma = new Date(convenio.fechaFirma);
        const fechaHasta = new Date(filters.fechaFirmaHasta);
        if (fechaFirma > fechaHasta) return false;
      }

      // Filtro por fecha de caducidad
      if (filters.fechaCaducidadDesde && convenio.fechaCaducidad) {
        const fechaCaducidad = new Date(convenio.fechaCaducidad);
        const fechaDesde = new Date(filters.fechaCaducidadDesde);
        if (fechaCaducidad < fechaDesde) return false;
      }

      if (filters.fechaCaducidadHasta && convenio.fechaCaducidad) {
        const fechaCaducidad = new Date(convenio.fechaCaducidad);
        const fechaHasta = new Date(filters.fechaCaducidadHasta);
        if (fechaCaducidad > fechaHasta) return false;
      }

      return true;
    });
  }, [conveniosResponse, filters]);

  const clearFilters = () => {
    setFilters({
      expediente: '',
      empresa: '',
      fechaFirmaDesde: '',
      fechaFirmaHasta: '',
      fechaCaducidadDesde: '',
      fechaCaducidadHasta: '',
    });
  };

  return {
    convenios: filteredConvenios,
    isLoading,
    error,
    filters,
    setFilters,
    clearFilters,
  };
};
