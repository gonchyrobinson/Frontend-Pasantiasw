import { FormMetadata } from '../../../lib/FormularioGenerico';
import { LoginCredentials } from '../types';

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

export const handleLoginError = (error: unknown): string => {
  if (error instanceof Error && error.message) return error.message;
  return 'Error de autenticación';
};

export const validateLoginData = (
  data: Record<string, unknown>
): LoginCredentials => {
  return data as unknown as LoginCredentials;
};
