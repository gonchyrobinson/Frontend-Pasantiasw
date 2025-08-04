// Rutas principales del sistema
export const ROUTES = {
  // Rutas públicas
  LOGIN: '/login',
  REGISTER: '/register',

  // Rutas protegidas
  DASHBOARD: '/dashboard',
  INICIO: '/dashboard', // Alias para dashboard

  // Módulos principales
  EMPRESAS: '/empresas',
  CONVENIOS: '/convenios',
  PASANTIAS: '/pasantias',
  PAGOS: '/pagos',
  REPORTES: '/reportes',

  // Usuario y configuración
  PERFIL: '/perfil',
  CONFIGURACION: '/configuracion',

  // Página de error
  NOT_FOUND: '*',
} as const;

// Tipo para las rutas (opcional, para TypeScript)
export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];
