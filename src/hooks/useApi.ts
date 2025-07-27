import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { apiClient } from '../apis/apiClient';
import { ApiResponse } from '../types';

// Query hook for GET requests
export const useApiQuery = <T>(
  endpoint: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => apiClient.get<T>(endpoint),
    ...options,
  });
};

// Mutation hook for POST requests
export const useApiMutation = <T, TVariables = any>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, TVariables>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: (data: TVariables) => apiClient.post<T>(endpoint, data),
    ...options,
  });
};

// Mutation hook for PUT requests
export const useApiUpdate = <T, TVariables = any>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, TVariables>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: (data: TVariables) => apiClient.put<T>(endpoint, data),
    ...options,
  });
};

// Mutation hook for DELETE requests
export const useApiDelete = <T>(
  endpoint: string,
  options?: Omit<UseMutationOptions<ApiResponse<T>, Error, void>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: () => apiClient.delete<T>(endpoint),
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