export interface EstudianteDto {
  idEstudiante: number;
  apellido?: string;
  nombre?: string;
  documento?: string;
  domicilio?: string;
  libreta?: string;
  carrera?: string;
  email?: string;
  eliminado?: boolean;
  fechaEliminacion?: string; // DateTime se maneja como string en frontend
}

// DTO para creación - omite el ID, eliminado y fechaEliminacion que son manejados por el backend
export type CreacionEstudianteDto = Omit<
  EstudianteDto,
  'idEstudiante' | 'eliminado' | 'fechaEliminacion'
>;

export interface EstudiantesStats {
  total: number;
  porCarrera: Record<string, number>;
  activos: number;
  eliminados: number;
}
