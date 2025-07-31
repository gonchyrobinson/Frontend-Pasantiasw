// Tipos básicos para el sistema de gestión de pasantías

export interface Convenio {
  id: number;
  empresa: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activo' | 'vencido' | 'renovado';
  descripcion: string;
}

export interface Pasantia {
  id: number;
  estudiante: string;
  empresa: string;
  carrera: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'finalizada' | 'suspendida';
  tipo: 'regular' | 'pps';
}

export interface Pago {
  id: number;
  convenioId: number;
  monto: number;
  fecha: string;
  estado: 'pendiente' | 'pagado' | 'vencido';
  descripcion: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: 'admin' | 'usuario';
}

// Tipos para respuestas del backend
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
