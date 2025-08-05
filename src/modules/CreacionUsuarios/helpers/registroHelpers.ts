import { FormMetadata } from '../../../FormularioGenerico';
import { RegisterData } from '../types';

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
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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

export const validatePasswords = (
  data: Record<string, unknown>
): string | null => {
  const registerData = data as unknown as RegisterData;

  if (registerData.password !== registerData.confirmPassword) {
    return 'Las contraseñas no coinciden';
  }

  return null;
};

export const handleRegistrationError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as {
      response?: { data?: { message?: string } };
    };
    return axiosError.response?.data?.message || 'Error de registro';
  }

  return 'Error de registro';
};
