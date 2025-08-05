// Tipos básicos para el sistema de gestión de pasantías

// Tipos de autenticación
export type LoginCredentials = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
};

export type Convenio = {
  id: number;
  empresa: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activo' | 'vencido' | 'renovado';
  descripcion: string;
};

export type Pasantia = {
  id: number;
  estudiante: string;
  empresa: string;
  carrera: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'finalizada' | 'suspendida';
  tipo: 'regular' | 'pps';
};

export type Pago = {
  id: number;
  convenioId: number;
  monto: number;
  fecha: string;
  estado: 'pendiente' | 'pagado' | 'vencido';
  descripcion: string;
};

export type Usuario = {
  id: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'usuario';
};

// Tipos para respuestas del backend
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};
