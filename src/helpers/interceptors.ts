import axios from 'axios';
import { API_BASE } from '../lib/api';
import { authHelper } from './authHelper';
import { ROUTES } from './routesHelper';

/**
 * Configuración global de interceptores de Axios
 *
 * Este archivo configura los interceptores globales para:
 * - Inyección automática de tokens de autenticación
 * - Manejo centralizado de errores 401 (no autorizado)
 * - Configuración base de la API
 */

// ==================== CONFIGURACIÓN BASE DE AXIOS ====================

/** Configuración base de la URL de la API */
axios.defaults.baseURL = API_BASE;

/** Headers por defecto para todas las peticiones */
axios.defaults.headers.common['Content-Type'] = 'application/json';

/** Timeout global para peticiones (30 segundos) */
axios.defaults.timeout = 30000;

// ==================== FUNCIONES UTILITARIAS ====================

/**
 * Redirige al usuario a la página de login de forma segura
 * Evita loops infinitos y usa la navegación nativa del navegador
 */
const redirectToLogin = (): void => {
  // Verificar si ya estamos en la página de login para evitar loops
  if (window.location.pathname !== ROUTES.LOGIN) {
    // Limpiar cualquier estado de autenticación residual
    authHelper.removeToken();

    // Usar window.location.href para una redirección limpia
    // Esto es más confiable que manipular history manualmente
    window.location.href = ROUTES.LOGIN;
  }
};

// ==================== INTERCEPTORES DE PETICIONES ====================

/**
 * Interceptor de peticiones - Inyecta automáticamente el token de autenticación
 */
axios.interceptors.request.use(
  config => {
    const token = authHelper.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // Log del error para debugging en desarrollo
    if (import.meta.env.DEV) {
      console.error('Error en interceptor de petición:', error);
    }
    return Promise.reject(error);
  }
);

// ==================== INTERCEPTORES DE RESPUESTAS ====================

/**
 * Interceptor de respuestas - Maneja errores de autenticación globalmente
 */
axios.interceptors.response.use(
  response => response,
  error => {
    // Manejo específico de errores 401 (No autorizado)
    if (error.response?.status === 401) {
      // Redirigir a login (la función redirectToLogin ya limpia el token)
      redirectToLogin();

      // Log para debugging en desarrollo
      if (import.meta.env.DEV) {
        console.warn('Token expirado o inválido. Redirigiendo a login...');
      }
    }

    // Log de errores en desarrollo
    if (import.meta.env.DEV) {
      console.error('Error en respuesta de API:', {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);
