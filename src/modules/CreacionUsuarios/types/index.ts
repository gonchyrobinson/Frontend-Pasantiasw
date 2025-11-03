export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// DTO que coincide con UserInfoDto del backend (camelCase)
export interface UsuarioDto {
  id: number;
  username: string;
  email: string;
  role: string;
}

// DTO para actualización - incluye el ID
export interface UpdateUsuarioDto {
  idUsuario: number;
  nombreUsuario: string;
  correo: string;
  rol: string;
}
