import { Convenio, Pasantia, Pago } from '../../../types';

export interface StatItem {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  loading: boolean;
  error: boolean;
  trend: string;
  trendDirection: 'up' | 'down';
}

export interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

export interface SpeedDialAction {
  icon: React.ReactNode;
  name: string;
  action: () => void;
}

export interface ProgressItem {
  label: string;
  value: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

/**
 * Calculate statistics from API data
 */
export const calculateStats = (
  conveniosData: Convenio[] | undefined,
  pasantiasData: Pasantia[] | undefined,
  pagosData: Pago[] | undefined,
  conveniosLoading: boolean,
  pasantiasLoading: boolean,
  pagosLoading: boolean,
  conveniosError: boolean,
  pasantiasError: boolean,
  pagosError: boolean,
  icons: {
    business: React.ReactNode;
    school: React.ReactNode;
    payment: React.ReactNode;
  }
): StatItem[] => {
  return [
    {
      title: 'Convenios Activos',
      value: conveniosData?.length || 0,
      icon: icons.business,
      color: 'primary.main',
      bgColor: 'primary.light',
      loading: conveniosLoading,
      error: conveniosError,
      trend: '+12%',
      trendDirection: 'up',
    },
    {
      title: 'Pasantías Activas',
      value: pasantiasData?.length || 0,
      icon: icons.school,
      color: 'secondary.main',
      bgColor: 'secondary.light',
      loading: pasantiasLoading,
      error: pasantiasError,
      trend: '+8%',
      trendDirection: 'up',
    },
    {
      title: 'Pagos Pendientes',
      value: pagosData?.filter(p => p.estado === 'pendiente').length || 0,
      icon: icons.payment,
      color: 'warning.main',
      bgColor: 'warning.light',
      loading: pagosLoading,
      error: pagosError,
      trend: '-5%',
      trendDirection: 'down',
    },
  ];
};

/**
 * Get quick actions configuration
 */
export const getQuickActions = (icons: {
  business: React.ReactNode;
  school: React.ReactNode;
  payment: React.ReactNode;
}): QuickAction[] => {
  return [
    {
      title: 'Nuevo Convenio',
      description: 'Crear un nuevo convenio con empresa',
      icon: icons.business,
      path: '/convenios/nuevo',
      color: 'primary',
    },
    {
      title: 'Nueva Pasantía',
      description: 'Registrar una nueva pasantía',
      icon: icons.school,
      path: '/pasantias/nueva',
      color: 'secondary',
    },
    {
      title: 'Registrar Pago',
      description: 'Registrar un nuevo pago',
      icon: icons.payment,
      path: '/pagos/nuevo',
      color: 'warning',
    },
  ];
};

/**
 * Get speed dial actions configuration
 */
export const getSpeedDialActions = (icons: {
  add: React.ReactNode;
  business: React.ReactNode;
  school: React.ReactNode;
  payment: React.ReactNode;
}): SpeedDialAction[] => {
  return [
    {
      icon: icons.add,
      name: 'Nuevo Convenio',
      action: () => {
        // TODO: Implement navigation to new convenio form
        // window.location.href = '/convenios/nuevo';
      },
    },
    {
      icon: icons.school,
      name: 'Nueva Pasantía',
      action: () => {
        // TODO: Implement navigation to new pasantia form
        // window.location.href = '/pasantias/nueva';
      },
    },
    {
      icon: icons.payment,
      name: 'Registrar Pago',
      action: () => {
        // TODO: Implement navigation to new payment form
        // window.location.href = '/pagos/nuevo';
      },
    },
  ];
};

/**
 * Get progress items configuration
 */
export const getProgressItems = (): ProgressItem[] => {
  return [
    {
      label: 'Convenios Procesados',
      value: 75,
      color: 'primary',
    },
    {
      label: 'Pasantías Activas',
      value: 60,
      color: 'secondary',
    },
    {
      label: 'Pagos Completados',
      value: 90,
      color: 'success',
    },
  ];
};

/**
 * Check if there are any errors in the API calls
 */
export const hasErrors = (
  conveniosError: boolean,
  pasantiasError: boolean,
  pagosError: boolean
): boolean => {
  return [conveniosError, pasantiasError, pagosError].some(Boolean);
};
