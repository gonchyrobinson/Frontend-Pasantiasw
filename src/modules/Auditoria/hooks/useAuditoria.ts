import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../Shared/apis/apiClient';
import { AuditoriaDto, AuditoriaBuscarDto } from '../types';

// Hook para buscar auditorías con filtros usando mutation para control manual
export const useBuscarAuditoria = () => {
  return useMutation({
    mutationFn: async (filtros: AuditoriaBuscarDto = {}) => {
      const data = await apiClient.post<AuditoriaDto[]>('/auditoria', filtros);
      return data;
    },
    retry: 1, // Solo reintentar una vez en caso de error
  });
};
