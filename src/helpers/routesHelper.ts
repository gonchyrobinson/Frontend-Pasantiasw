/**
 * Constantes de rutas del sistema de Acuerdos Individuales
 *
 * Centraliza todas las rutas de la aplicación para evitar hardcoding
 * y facilitar el mantenimiento y refactoring.
 */
export const ROUTES = {
  // ==================== RUTAS PÚBLICAS ====================
  /** Página de inicio de sesión */
  LOGIN: '/login',
  /** Página de registro de usuarios */
  REGISTRAR_USUARIO: '/register',

  // ==================== RUTAS PROTEGIDAS ====================
  /** Dashboard principal del sistema */
  DASHBOARD: '/dashboard',

  // ==================== MÓDULO EMPRESAS ====================
  /** Listado de empresas */
  EMPRESAS: '/empresas',
  /** Crear nueva empresa */
  EMPRESAS_CREAR: '/empresas/crear',
  /** Editar empresa existente */
  EMPRESAS_EDITAR: '/empresas/editar',
  /** Ver detalle de empresa */
  EMPRESAS_DETALLE: '/empresas/detalle',

  // ==================== MÓDULO ESTUDIANTES ====================
  /** Listado de estudiantes */
  ESTUDIANTES: '/students',
  /** Crear nuevo estudiante */
  ESTUDIANTES_CREAR: '/students/crear',
  /** Editar estudiante existente */
  ESTUDIANTES_EDITAR: '/students/editar',
  /** Ver detalle de estudiante */
  ESTUDIANTES_DETALLE: '/students/detalle',

  // ==================== MÓDULO CONVENIOS ====================
  /** Listado de convenios */
  CONVENIOS: '/convenios',
  /** Crear nuevo convenio */
  CONVENIOS_CREAR: '/convenios/crear',
  /** Editar convenio existente */
  CONVENIOS_EDITAR: '/convenios/editar',
  /** Ver detalle de convenio */
  CONVENIOS_DETALLE: '/convenios/detalle',

  // ==================== MÓDULO Acuerdos Individuales ====================
  /** Listado de Acuerdos Individuales */
  PASANTIAS: '/pasantias',
  /** Crear Nuevo acuerdo individual */
  PASANTIAS_CREAR: '/pasantias/crear',
  /** Editar pasantía existente */
  PASANTIAS_EDITAR: '/pasantias/editar',
  /** Ver detalle de pasantía */
  PASANTIAS_DETALLE: '/pasantias/detalle',

  // ==================== MÓDULO PAGOS ====================
  /** Listado de pagos */
  PAGOS: '/pagos',
  /** Crear nuevo pago */
  PAGOS_CREAR: '/pagos/crear',
  /** Editar pago existente */
  PAGOS_EDITAR: '/pagos/editar',
  /** Ver detalle de pago */
  PAGOS_DETALLE: '/pagos/detalle',

  // ==================== MÓDULOS ADICIONALES ====================
  /** Página de reportes */
  REPORTES: '/reportes',

  // ==================== USUARIO Y CONFIGURACIÓN ====================
  /** Perfil del usuario */
  PERFIL: '/perfil',
  /** Configuración del sistema */
  CONFIGURACION: '/configuracion',

  // ==================== PÁGINAS DE ERROR ====================
  /** Página 404 - No encontrado */
  NOT_FOUND: '*',
} as const;

// ==================== UTILIDADES DE RUTAS ====================

/**
 * Lista de rutas públicas que no requieren autenticación
 * Utilizada por ProtectedRoute para determinar acceso
 */
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTRAR_USUARIO] as const;
