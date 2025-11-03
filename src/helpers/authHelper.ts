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

  /**
   * Decodifica el JWT para obtener el payload
   * @returns El payload del token o null si no es válido
   */
  decodeToken: (): { UserId?: string; [key: string]: unknown } | null => {
    const token = authHelper.getToken();
    if (!token) return null;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  },

  /**
   * Obtiene el ID del usuario actual desde el token
   * @returns El ID del usuario o null si no está disponible
   */
  getUserId: (): number | null => {
    const payload = authHelper.decodeToken();
    if (!payload?.UserId) return null;
    const userId = parseInt(payload.UserId as string, 10);
    return isNaN(userId) ? null : userId;
  },
} as const;
