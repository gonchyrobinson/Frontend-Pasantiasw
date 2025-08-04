import { FormMetadata } from '../../../FormularioGenerico';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginError {
  message: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginState {
  error: string;
  loading: boolean;
}

export interface LoginMetadata extends FormMetadata {
  submitButtonText: 'Iniciar Sesión';
}
