import React from 'react';
import { useState } from 'react';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  useApiQuery,
  useApiMutation,
  useApiUpdate,
} from '../../../lib/hooks/useApi';
import { ROUTES } from '../../../helpers/routesHelper';
import {
  ConvenioEmpresaDto,
  ConvenioDto,
  ConvenioCreateDto,
  AsignarEmpresaDto,
  EmpresaConvenioDropdownDto,
  ConvenioEmpresaFiltroDto,
} from '../types';
import { calculateConvenioStats } from '../helpers/convenioHelpers';
import { apiClient } from '../../Shared/apis/apiClient';
import { useInvalidateDropdowns } from '../../../lib/hooks/useDropdownData';

// Hook para obtener todos los convenios con empresa usando POST
// Este es un caso especial que requiere POST en lugar de GET
export const useConvenios = () => {
  return useQuery({
    queryKey: ['/convenios/conEmpresa'],
    queryFn: async () => {
      const response = await apiClient.post<ConvenioEmpresaDto[]>(
        '/convenios/conEmpresa',
        {} // Enviar objeto vacío para obtener todos los convenios
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
  const { invalidateConvenios } = useInvalidateDropdowns();

  return useApiMutation<
    ConvenioDto,
    ConvenioCreateDto & Record<string, unknown>
  >(ROUTES.CONVENIOS, {
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con convenios
      queryClient.invalidateQueries({
        queryKey: ['/convenios/conEmpresa'],
      });
      queryClient.invalidateQueries({ queryKey: ['convenio'] });

      // Invalidar dropdowns de convenios
      invalidateConvenios();

      // Invalidar dropdowns que dependen de convenios (Acuerdos Individuales)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para actualizar convenio
export const useUpdateConvenio = () => {
  const queryClient = useQueryClient();
  const { invalidateConvenios } = useInvalidateDropdowns();

  return useApiUpdate<ConvenioDto, ConvenioDto & Record<string, unknown>>(
    ROUTES.CONVENIOS,
    {
      onSuccess: data => {
        // Invalidar todas las queries relacionadas con convenios
        queryClient.invalidateQueries({
          queryKey: ['/convenios/conEmpresa'],
        });
        queryClient.invalidateQueries({ queryKey: ['convenio'] });

        // Invalidar específicamente la query del detalle del convenio actualizado
        if (data?.data?.idConvenio) {
          queryClient.invalidateQueries({
            queryKey: [`${ROUTES.CONVENIOS}/${data.data.idConvenio}`],
          });
        }

        // Invalidar dropdowns de convenios
        invalidateConvenios();

        // Invalidar dropdowns que dependen de convenios (Acuerdos Individuales)
        queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

        // Invalidar queries de inicio que muestran estadísticas
        queryClient.invalidateQueries({ queryKey: ['pasantias'] });
        queryClient.invalidateQueries({ queryKey: ['pagos'] });
      },
    }
  );
};

// Hook para caducar convenio
export const useCaducarConvenio = () => {
  const queryClient = useQueryClient();
  const { invalidateConvenios } = useInvalidateDropdowns();

  return useMutation({
    mutationFn: ({
      id,
      fechaCaducidad,
    }: {
      id: number;
      fechaCaducidad: string;
    }) =>
      apiClient.post<void>(`/convenios/caducar/${id}`, {
        fechaCaducidad,
      } as unknown as Record<string, unknown>),
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con convenios
      queryClient.invalidateQueries({
        queryKey: ['/convenios/conEmpresa'],
      });
      queryClient.invalidateQueries({ queryKey: ['convenio'] });

      // Invalidar dropdowns de convenios
      invalidateConvenios();

      // Invalidar dropdowns que dependen de convenios (Acuerdos Individuales)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para asignar empresa a convenio
export const useAsignarEmpresa = () => {
  const queryClient = useQueryClient();
  const { invalidateConvenios } = useInvalidateDropdowns();

  return useApiMutation<void, AsignarEmpresaDto & Record<string, unknown>>(
    '/convenios/asignar-empresa',
    {
      onSuccess: () => {
        // Invalidar todas las queries relacionadas con convenios
        queryClient.invalidateQueries({
          queryKey: ['/convenios/conEmpresa'],
        });
        queryClient.invalidateQueries({ queryKey: ['convenio'] });

        // Invalidar dropdowns de convenios
        invalidateConvenios();

        // Invalidar dropdowns que dependen de convenios (Acuerdos Individuales)
        queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

        // Invalidar queries de inicio que muestran estadísticas
        queryClient.invalidateQueries({ queryKey: ['pasantias'] });
        queryClient.invalidateQueries({ queryKey: ['pagos'] });
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

// Hook para eliminar convenio
export const useDeleteConvenio = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { invalidateConvenios } = useInvalidateDropdowns();

  const deleteConvenio = async (idConvenio: number) => {
    setIsDeleting(true);

    try {
      await apiClient.delete<void>(`/convenios/${idConvenio}`);

      // Invalidar todas las queries relacionadas con convenios
      queryClient.invalidateQueries({
        queryKey: ['/convenios/conEmpresa'],
      });
      queryClient.invalidateQueries({ queryKey: ['convenio'] });

      // Invalidar dropdowns de convenios
      invalidateConvenios();

      // Invalidar dropdowns que dependen de convenios (Acuerdos Individuales)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    } catch (error: unknown) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Error al eliminar el convenio. Inténtalo de nuevo.';
      throw new Error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteConvenio,
    isDeleting,
  };
};

// Hook para obtener convenios por vencer
export const useConveniosPorVencer = (diasAdelante = 30) => {
  return useQuery({
    queryKey: ['convenios', 'por-vencer', diasAdelante],
    queryFn: async () => {
      const data = await apiClient.get<ConvenioEmpresaDto[]>(
        `/convenios/por-vencer?dias=${diasAdelante}`
      );
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchInterval: 10 * 60 * 1000, // Refrescar cada 10 minutos para notificaciones
    refetchOnWindowFocus: true, // Refrescar cuando el usuario vuelve a la pestaña
  });
};

// Hook para obtener empresas con convenio vigente (para dropdowns)
export const useEmpresasConConvenioVigente = () => {
  return useQuery({
    queryKey: ['convenios', 'empresas-convenio-vigente'],
    queryFn: async () => {
      const data = await apiClient.get<EmpresaConvenioDropdownDto[]>(
        '/convenios/empresas-convenio-vigente'
      );
      return data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
  });
};

// Hook para buscar convenios con filtros
export const useConveniosConFiltros = (filtros: ConvenioEmpresaFiltroDto) => {
  return useQuery({
    queryKey: ['convenios', 'conEmpresa', filtros],
    queryFn: async () => {
      const response = await apiClient.post<ConvenioEmpresaDto[]>(
        '/convenios/conEmpresa',
        filtros
      );
      return response as unknown as ConvenioEmpresaDto[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    enabled: Object.keys(filtros).length > 0, // Solo ejecutar si hay filtros
  });
};
