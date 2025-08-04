import { FormMetadata } from '../../../FormularioGenerico';
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
  // Manejo específico para errores de Axios
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as {
      response?: { data?: { message?: string } };
    };
    return axiosError.response?.data?.message || 'Error de autenticación';
  } else {
    return 'Error de autenticación';
  }
};

export const validateLoginData = (
  data: Record<string, unknown>
): LoginCredentials => {
  return data as unknown as LoginCredentials;
};
