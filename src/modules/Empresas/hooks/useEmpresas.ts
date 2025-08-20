import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';
import { EmpresaDto, CreacionEmpresaDto } from '../types';
import { useInvalidateDropdowns } from '../../../lib/hooks/useDropdownData';

// Hook para obtener todas las empresas
export const useEmpresas = () => {
  return useQuery({
    queryKey: ['empresas'],
    queryFn: async () => {
      const data = await apiClient.get<EmpresaDto[]>('/empresas');
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
  });
};

// Hook para obtener una empresa específica
export const useEmpresa = (id: number | null) => {
  return useQuery({
    queryKey: ['empresa', id],
    queryFn: async () => {
      const data = await apiClient.get<EmpresaDto>(`/empresas/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

// Hook para crear empresa
export const useCreateEmpresa = () => {
  const queryClient = useQueryClient();
  const { invalidateEmpresas, invalidateConvenios, invalidatePasantias } =
    useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (data: CreacionEmpresaDto) => {
      const result = await apiClient.post<EmpresaDto>('/empresas', data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con empresas
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      queryClient.invalidateQueries({ queryKey: ['empresa'] });

      // Invalidar dropdowns de empresas
      invalidateEmpresas();
      invalidateConvenios();
      invalidatePasantias();

      // Invalidar dropdowns que dependen de empresas (convenios, pasantías)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'convenios'] });
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['/convenios/conEmpresa'] });
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
    },
  });
};

// Hook para actualizar empresa
export const useUpdateEmpresa = () => {
  const queryClient = useQueryClient();
  const { invalidateEmpresas, invalidatePasantias, invalidateConvenios } =
    useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (data: EmpresaDto) => {
      const result = await apiClient.put<EmpresaDto>('/empresas', data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con empresas
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      queryClient.invalidateQueries({ queryKey: ['empresa'] });

      // Invalidar dropdowns de empresas
      invalidateEmpresas();
      invalidatePasantias();
      invalidateConvenios();

      // Invalidar dropdowns que dependen de empresas (convenios, pasantías)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'convenios'] });
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['/convenios/conEmpresa'] });
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
    },
  });
};

// Hook para eliminar empresa
export const useDeleteEmpresa = () => {
  const queryClient = useQueryClient();
  const { invalidateEmpresas, invalidateConvenios, invalidatePasantias } =
    useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await apiClient.delete<void>(`/empresas/${id}`);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con empresas
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
      queryClient.invalidateQueries({ queryKey: ['empresa'] });

      // Invalidar dropdowns de empresas
      invalidateEmpresas();
      invalidateConvenios();
      invalidatePasantias();

      // Invalidar dropdowns que dependen de empresas (convenios, pasantías)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'convenios'] });
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['/convenios/conEmpresa'] });
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
    },
  });
};
