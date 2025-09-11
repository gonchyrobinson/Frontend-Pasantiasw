// Constante para la clave del token en sessionStorage
export const TOKEN_KEY = 'auth_token';

// Helper para manejo de autenticación
export const authHelper = {
  /**
   * Obtiene el token de autenticación del sessionStorage
   * @returns El token o null si no existe
   */
  getToken: (): string | null => sessionStorage.getItem(TOKEN_KEY),

  /**
   * Guarda el token de autenticación en sessionStorage
   * @param token - Token JWT a guardar
   */
  saveToken: (token: string): void => sessionStorage.setItem(TOKEN_KEY, token),

  /**
   * Elimina el token de autenticación del sessionStorage
   */
  removeToken: (): void => sessionStorage.removeItem(TOKEN_KEY),

  /**
   * Verifica si el usuario está autenticado
   * @returns true si hay un token válido, false en caso contrario
   */
  isAuthenticated: (): boolean => !!authHelper.getToken(),

  /**
   * Maneja y formatea errores de autenticación de forma genérica
   * @param error - Error capturado durante procesos de autenticación
   * @param defaultMessage - Mensaje por defecto si no se puede extraer el error
   * @returns Mensaje de error formateado para mostrar al usuario
   */
  handleAuthError: (
    error: unknown,
    defaultMessage = 'Error de autenticación'
  ): string => {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return defaultMessage;
  },
} as const;
