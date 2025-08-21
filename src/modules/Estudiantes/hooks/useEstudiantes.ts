import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';
import { EstudianteDto, CreacionEstudianteDto } from '../types';
import { useInvalidateDropdowns } from '../../../lib/hooks/useDropdownData';

// Hook para obtener todos los estudiantes
export const useEstudiantes = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const data = await apiClient.get<EstudianteDto[]>('/students');
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
  });
};

// Hook para obtener un estudiante específico
export const useEstudiante = (id: number | null) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const data = await apiClient.get<EstudianteDto>(`/students/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

// Hook para crear estudiante
export const useCreateEstudiante = () => {
  const queryClient = useQueryClient();
  const { invalidateEstudiantes, invalidatePasantias } =
    useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (data: CreacionEstudianteDto) => {
      const result = await apiClient.post<EstudianteDto>('/students', data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con estudiantes
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student'] });

      // Invalidar dropdowns de estudiantes
      invalidateEstudiantes();
      invalidatePasantias();
      // Invalidar dropdowns que dependen de estudiantes (pasantías)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para actualizar estudiante
export const useUpdateEstudiante = () => {
  const queryClient = useQueryClient();
  const { invalidateEstudiantes, invalidatePasantias } =
    useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (data: EstudianteDto) => {
      const result = await apiClient.put<EstudianteDto>('/students', data);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con estudiantes
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student'] });

      // Invalidar dropdowns de estudiantes
      invalidateEstudiantes();
      invalidatePasantias();

      // Invalidar dropdowns que dependen de estudiantes (pasantías)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};

// Hook para eliminar estudiante
export const useDeleteEstudiante = () => {
  const queryClient = useQueryClient();
  const { invalidateEstudiantes, invalidatePasantias } =
    useInvalidateDropdowns();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await apiClient.delete<void>(`/students/${id}`);
      return result;
    },
    onSuccess: () => {
      // Invalidar todas las queries relacionadas con estudiantes
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student'] });

      // Invalidar dropdowns de estudiantes
      invalidateEstudiantes();
      invalidatePasantias();

      // Invalidar dropdowns que dependen de estudiantes (pasantías)
      queryClient.invalidateQueries({ queryKey: ['dropdown', 'pasantias'] });

      // Invalidar queries de inicio que muestran estadísticas
      queryClient.invalidateQueries({ queryKey: ['pasantias'] });
      queryClient.invalidateQueries({ queryKey: ['pagos'] });
    },
  });
};
