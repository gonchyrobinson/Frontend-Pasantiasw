import { FormMetadata } from '../../../lib/FormularioGenerico';

/**
 * Helper para el módulo de Login
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata del formulario de login
 */

// ==================== METADATA DE FORMULARIO ====================

/**
 * Genera la metadata para el formulario de login
 * Define los campos, validaciones y configuración del formulario
 *
 * @returns Configuración completa del formulario de login
 */
export const getLoginMetadata = (): FormMetadata => ({
  submitButtonText: 'Iniciar Sesión',
  fields: [
    {
      name: 'username',
      type: 'text',
      label: 'Usuario',
      placeholder: 'Ingrese su usuario',
      validations: {
        required: 'El usuario es requerido',
      },
      gridSize: 12,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Ingrese su contraseña',
      validations: {
        required: 'La contraseña es requerida',
      },
      gridSize: 12,
    },
  ],
});
