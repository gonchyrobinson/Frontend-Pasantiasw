import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../types';

export const useAuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginCredentials>();

  const registerUsername = register('username', {
    required: 'Usuario es requerido',
  });

  const registerPassword = register('password', {
    required: 'Contraseña es requerida',
  });

  return {
    register,
    handleSubmit,
    errors,
    reset,
    registerUsername,
    registerPassword,
  };
};
