// Rutas principales del sistema
export const ROUTES = {
  // Rutas públicas
  LOGIN: '/login',
  REGISTRAR_USUARIO: '/register',

  // Rutas protegidas
  DASHBOARD: '/dashboard',
  INICIO: '/dashboard', // Alias para dashboard

  // Módulos principales
  EMPRESAS: '/empresas',
  EMPRESAS_CREAR: '/empresas/crear',
  EMPRESAS_EDITAR: '/empresas/editar',
  ESTUDIANTES: '/students',
  ESTUDIANTES_CREAR: '/students/crear',
  ESTUDIANTES_EDITAR: '/students/editar',
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
