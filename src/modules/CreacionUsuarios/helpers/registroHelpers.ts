import { FormMetadata } from '../../../lib/FormularioGenerico';

/**
 * Helper para el módulo de CreacionUsuarios
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata del formulario de registro
 * - Validación de contraseñas
 */

// ==================== CONSTANTES ====================

/** Patrón de validación para emails */
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// ==================== METADATA DE FORMULARIO ====================

/**
 * Genera la metadata para el formulario de registro de usuarios
 * Define los campos, validaciones y configuración del formulario
 *
 * @returns Configuración completa del formulario de registro
 */
export const getRegistroMetadata = (): FormMetadata => ({
  title: 'Crear Cuenta',
  submitButtonText: 'Registrarse',
  cancelButtonText: 'Regresar',
  fields: [
    {
      name: 'username',
      type: 'text',
      label: 'Usuario',
      placeholder: 'Ingrese su usuario',
      validations: {
        required: 'Usuario es requerido',
        minLength: {
          value: 3,
          message: 'Usuario debe tener al menos 3 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Ingrese su email',
      validations: {
        required: 'Email es requerido',
        pattern: {
          value: EMAIL_PATTERN,
          message: 'Email inválido',
        },
      },
      gridSize: 12,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Ingrese su contraseña',
      validations: {
        required: 'Contraseña es requerida',
        minLength: {
          value: 6,
          message: 'Contraseña debe tener al menos 6 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirmar Contraseña',
      placeholder: 'Confirme su contraseña',
      validations: {
        required: 'Confirmar contraseña es requerido',
      },
      gridSize: 12,
    },
  ],
});

// ==================== VALIDACIONES ====================

/**
 * Valida que las contraseñas coincidan en el formulario de registro
 * Compara los campos 'password' y 'confirmPassword' del formulario
 *
 * @param data - Datos del formulario de registro
 * @returns Mensaje de error si las contraseñas no coinciden, null si son válidas
 */
export const validatePasswords = (
  data: Record<string, unknown>
): string | null => {
  const password = data.password as string;
  const confirmPassword = data.confirmPassword as string;

  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }

  return null;
};
