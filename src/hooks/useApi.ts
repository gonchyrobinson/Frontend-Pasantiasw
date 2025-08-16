import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

import { apiClient } from '../modules/Shared/apis/apiClient';
import { ApiResponse } from '../types';

// Define a generic type for mutation variables (same as RequestData in apiClient)
type RequestData = Record<string, unknown>;

// Query hook for GET requests - mantiene compatibilidad con formato ApiResponse
export const useApiQuery = <T>(
  endpoint: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const data = await apiClient.get<T>(endpoint);
      return { data } as ApiResponse<T>;
    },
    ...options,
  });
};

// Mutation hook for POST requests
export const useApiMutation = <T, TVariables extends RequestData = RequestData>(
  endpoint: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<T>, Error, TVariables>,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const result = await apiClient.post<T>(endpoint, data);
      return { data: result } as ApiResponse<T>;
    },
    ...options,
  });
};

// Mutation hook for PUT requests
export const useApiUpdate = <T, TVariables extends RequestData = RequestData>(
  endpoint: string,
  options?: Omit<
    UseMutationOptions<ApiResponse<T>, Error, TVariables>,
    'mutationFn'
  >
) => {
  return useMutation({
    mutationFn: async (data: TVariables) => {
      const result = await apiClient.put<T>(endpoint, data);
      return { data: result } as ApiResponse<T>;
    },
    ...options,
  });
};

// Mutation hook for DELETE requests
export const useApiDelete = <T>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, void>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: async () => {
      const result = await apiClient.delete<T>(endpoint);
      return { data: result } as ApiResponse<T>;
    },
    ...options,
  });
};

// Legacy hook for backward compatibility
export const useApi = <T>(endpoint: string) => {
  const { data, isLoading, error } = useApiQuery<T>(endpoint);

  return {
    data: data?.data || null,
    loading: isLoading,
    error: error?.message || null,
  };
};
