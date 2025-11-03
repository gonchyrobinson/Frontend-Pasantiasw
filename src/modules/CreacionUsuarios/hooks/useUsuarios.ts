import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';
import { UsuarioDto, UpdateUsuarioDto } from '../types';

/**
 * Hook para obtener un usuario específico por ID
 * Utilizado en EditarUsuario para cargar datos existentes
 */
export const useUsuario = (id: number | null) => {
  return useQuery({
    queryKey: ['usuario', id],
    queryFn: async () => {
      const data = await apiClient.get<UsuarioDto>(`/v1/authn/user/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: 'always',
  });
};

/**
 * Hook para actualizar un usuario
 * Invalida las queries relacionadas tras actualización exitosa
 */
export const useUpdateUsuario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUsuarioDto) => {
      const result = await apiClient.put<UsuarioDto>('/v1/authn/user', data);
      return result;
    },
    onSuccess: data => {
      // Invalidar la query del usuario actualizado
      if (data?.id) {
        // Invalidar query del hook useUsuario
        queryClient.invalidateQueries({
          queryKey: ['usuario', data.id],
        });

        // Invalidar query del useApiQuery (DetalleUsuario)
        queryClient.invalidateQueries({
          queryKey: [`/v1/authn/user/${data.id}`],
        });
      }

      // Invalidar lista de usuarios si existe
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });

      // Invalidar sesión para actualizar datos del usuario actual
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
