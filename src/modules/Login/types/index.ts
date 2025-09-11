import { FormMetadata } from '../../../lib/FormularioGenerico';
import { User } from '../../../types';

/**
 * Tipos para el módulo de autenticación (Login)
 *
 * Consolidados desde tipos globales para mejor organización
 */

// ==================== TIPOS DE CREDENCIALES ====================

/**
 * Credenciales de inicio de sesión
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

// ==================== TIPOS DE RESPUESTA ====================

/**
 * Respuesta completa del login (con información del usuario)
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * Respuesta simple del login (solo token)
 * Usado cuando la información del usuario se obtiene por separado
 */
export interface LoginTokenResponse {
  token: string;
}

// ==================== TIPOS DE ESTADO ====================

/**
 * Estado de autenticación global
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

/**
 * Estado local del componente de login
 */
export interface LoginState {
  error: string;
  loading: boolean;
}

// ==================== TIPOS DE ERROR ====================

/**
 * Error de autenticación
 */
export interface LoginError {
  message: string;
}

// ==================== TIPOS DE FORMULARIO ====================

/**
 * Metadata específica del formulario de login
 */
export interface LoginMetadata extends FormMetadata {
  submitButtonText: 'Iniciar Sesión';
}
