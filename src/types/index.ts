/**
 * Tipos globales del sistema de gestión de Acuerdos Individuales
 *
 * Contiene únicamente tipos que se usan en múltiples módulos
 * o que son fundamentales para la arquitectura del sistema.
 */

// ==================== TIPOS DE API ====================

/**
 * Respuesta estándar de la API
 * Usado en hooks de API y manejo de respuestas HTTP
 */
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

// ==================== TIPOS BASE DE ENTIDADES ====================

/**
 * Tipos base importados desde módulos específicos
 * Estos se re-exportan aquí para compatibilidad con código existente
 * que los importa desde este archivo global.
 */

// Re-exportar tipos principales de módulos para compatibilidad
export type { ConvenioEmpresaDto as Convenio } from '../modules/Convenios/types';
export type { PasantiaDto as Pasantia } from '../modules/Pasantias/types';
export type { PagosDto as Pago } from '../modules/Pagos/types';

// ==================== TIPOS DE USUARIO ====================

/**
 * Información básica del usuario autenticado
 * Usado en contextos donde se necesita información mínima del usuario
 */
export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};
