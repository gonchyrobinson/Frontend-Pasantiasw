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
  EMPRESAS_DETALLE: '/empresas/detalle',
  ESTUDIANTES: '/students',
  ESTUDIANTES_CREAR: '/students/crear',
  ESTUDIANTES_EDITAR: '/students/editar',
  ESTUDIANTES_DETALLE: '/students/detalle',
  CONVENIOS: '/convenios',
  CONVENIOS_CREAR: '/convenios/crear',
  CONVENIOS_EDITAR: '/convenios/editar',
  CONVENIOS_DETALLE: '/convenios/detalle',
  PASANTIAS: '/pasantias',
  PASANTIAS_CREAR: '/pasantias/crear',
  PASANTIAS_EDITAR: '/pasantias/editar',
  PASANTIAS_DETALLE: '/pasantias/detalle',
  PAGOS: '/pagos',
  PAGOS_CREAR: '/pagos/crear',
  PAGOS_EDITAR: '/pagos/editar',
  PAGOS_DETALLE: '/pagos/detalle',
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
