import { Convenio, Pasantia, Pago } from '../../../types';
import { StatItem, QuickAction, SpeedDialAction } from '../types';
import { ROUTES } from '../../../helpers/routesHelper';

/**
 * Helper para el módulo de Inicio (Dashboard)
 *
 * Contiene funciones utilitarias para:
 * - Cálculo de estadísticas del dashboard
 * - Configuración de acciones rápidas
 * - Configuración del speed dial
 */

// ==================== TIPOS AUXILIARES ====================

/**
 * Configuración de iconos para el dashboard
 */
interface DashboardIcons {
  business: React.ReactNode;
  school: React.ReactNode;
  payment: React.ReactNode;
  add?: React.ReactNode;
}

/**
 * Función de navegación
 */
type NavigateFunction = (path: string) => void;

// ==================== CÁLCULO DE ESTADÍSTICAS ====================

/**
 * Calcula las estadísticas principales del dashboard basadas en datos de la API
 *
 * @param conveniosData - Array de convenios obtenidos de la API
 * @param pasantiasData - Array de pasantías obtenidas de la API
 * @param pagosData - Array de pagos obtenidos de la API
 * @param conveniosLoading - Estado de carga de convenios
 * @param pasantiasLoading - Estado de carga de pasantías
 * @param pagosLoading - Estado de carga de pagos
 * @param conveniosError - Estado de error de convenios
 * @param pasantiasError - Estado de error de pasantías
 * @param pagosError - Estado de error de pagos
 * @param icons - Iconos para las tarjetas de estadísticas
 * @param navigate - Función de navegación
 * @returns Array de elementos de estadísticas configurados
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
  icons: DashboardIcons,
  navigate: NavigateFunction
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
      onClick: () => navigate(ROUTES.PAGOS),
    },
  ];
};

// ==================== ACCIONES RÁPIDAS ====================

/**
 * Obtiene la configuración de acciones rápidas del dashboard
 * Define las acciones principales que el usuario puede realizar
 *
 * @param icons - Iconos para las tarjetas de acciones
 * @param navigate - Función de navegación
 * @returns Array de acciones rápidas configuradas
 */
export const getQuickActions = (
  icons: DashboardIcons,
  navigate: NavigateFunction
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

// ==================== SPEED DIAL ====================

/**
 * Obtiene la configuración del speed dial (botón flotante de acciones)
 * Define las acciones disponibles en el botón flotante
 *
 * @param icons - Iconos para las acciones del speed dial
 * @param navigate - Función de navegación
 * @returns Array de acciones del speed dial configuradas
 */
export const getSpeedDialActions = (
  icons: DashboardIcons & { add: React.ReactNode },
  navigate: NavigateFunction
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
