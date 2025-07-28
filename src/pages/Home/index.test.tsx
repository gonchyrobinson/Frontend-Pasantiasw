import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Home from './index';

// Mock the API hook
vi.mock('../../hooks/useApi', () => ({
  useApiQuery: vi.fn(),
}));

const mockUseApiQuery = vi.mocked(await import('../../hooks/useApi')).useApiQuery;

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders welcome message', () => {
    mockUseApiQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    renderWithProviders(<Home />);
    
    expect(screen.getByText('Bienvenido al Sistema de Gestión de Pasantías')).toBeInTheDocument();
    expect(screen.getByText('Secretaría de Bienestar Estudiantil')).toBeInTheDocument();
  });

  it('renders quick actions', () => {
    mockUseApiQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    renderWithProviders(<Home />);
    
    expect(screen.getByText('Acciones Rápidas')).toBeInTheDocument();
    expect(screen.getByText('Nuevo Convenio')).toBeInTheDocument();
    expect(screen.getByText('Nueva Pasantía')).toBeInTheDocument();
    expect(screen.getByText('Registrar Pago')).toBeInTheDocument();
  });

  it('displays loading states', () => {
    mockUseApiQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithProviders(<Home />);
    
    // Check for skeleton elements (Material-UI creates multiple skeleton elements)
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('displays error message when API fails', () => {
    mockUseApiQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('API Error'),
    });

    renderWithProviders(<Home />);
    
    expect(screen.getByText('Error al cargar los datos. Por favor, intente nuevamente.')).toBeInTheDocument();
  });

  it('displays stats with data', () => {
    mockUseApiQuery
      .mockReturnValueOnce({
        data: { data: [{ id: 1 }, { id: 2 }] },
        isLoading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: { data: [{ id: 1 }] },
        isLoading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: { data: [{ id: 1, estado: 'pendiente' }] },
        isLoading: false,
        error: null,
      });

    renderWithProviders(<Home />);
    
    expect(screen.getByText('Convenios Activos')).toBeInTheDocument();
    expect(screen.getByText('Pasantías Activas')).toBeInTheDocument();
    expect(screen.getByText('Pagos Pendientes')).toBeInTheDocument();
  });
}); 