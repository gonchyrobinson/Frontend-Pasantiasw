import { Convenio, Pasantia, Pago } from '../../../types';
import { StatItem, QuickAction, SpeedDialAction, ProgressItem } from '../types';
import { ROUTES } from '../../../helpers/routesHelper';

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
  },
  navigate: (path: string) => void
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
      onClick: () => navigate(ROUTES.CONVENIOS),
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
      onClick: () => navigate(ROUTES.PASANTIAS),
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
      onClick: () => navigate(ROUTES.PAGOS),
    },
  ];
};

/**
 * Get quick actions configuration
 */
export const getQuickActions = (
  icons: {
    business: React.ReactNode;
    school: React.ReactNode;
    payment: React.ReactNode;
  },
  navigate: (path: string) => void
): QuickAction[] => {
  return [
    {
      title: 'Nuevo Convenio',
      description: 'Crear un nuevo convenio con empresa',
      icon: icons.business,
      path: ROUTES.CONVENIOS_CREAR,
      color: 'primary',
      onClick: () => navigate(ROUTES.CONVENIOS_CREAR),
    },
    {
      title: 'Nueva Pasantía',
      description: 'Registrar una nueva pasantía',
      icon: icons.school,
      path: ROUTES.PASANTIAS_CREAR,
      color: 'secondary',
      onClick: () => navigate(ROUTES.PASANTIAS_CREAR),
    },
    {
      title: 'Registrar Pago',
      description: 'Registrar un nuevo pago',
      icon: icons.payment,
      path: ROUTES.PAGOS_CREAR,
      color: 'warning',
      onClick: () => navigate(ROUTES.PAGOS_CREAR),
    },
  ];
};

/**
 * Get speed dial actions configuration
 */
export const getSpeedDialActions = (
  icons: {
    add: React.ReactNode;
    business: React.ReactNode;
    school: React.ReactNode;
    payment: React.ReactNode;
  },
  navigate: (path: string) => void
): SpeedDialAction[] => {
  return [
    {
      icon: icons.business,
      name: 'Nuevo Convenio',
      action: () => navigate(ROUTES.CONVENIOS_CREAR),
    },
    {
      icon: icons.school,
      name: 'Nueva Pasantía',
      action: () => navigate(ROUTES.PASANTIAS_CREAR),
    },
    {
      icon: icons.payment,
      name: 'Registrar Pago',
      action: () => navigate(ROUTES.PAGOS_CREAR),
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
