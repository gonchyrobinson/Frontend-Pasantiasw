import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime in v5)
      retry: (failureCount, error: Error) => {
        // Don't retry on 4xx errors
        const apiError = error as { response?: { status?: number } };
        if (
          apiError?.response?.status &&
          apiError.response.status >= 400 &&
          apiError.response.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* ReactQueryDevtools will be added when the package is properly installed */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
