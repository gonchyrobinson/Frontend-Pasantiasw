export interface EstudianteDto {
  idEstudiante: number;
  apellido: string;
  nombre: string;
  documento: string;
  domicilio: string;
  carrera: string;
  areaTrabajo: string;
  email: string;
}

// DTO para creación - omite el ID que es generado por el backend
export type CreacionEstudianteDto = Omit<EstudianteDto, 'idEstudiante'>;

export interface EstudiantesStats {
  total: number;
  porCarrera: Record<string, number>;
  porAreaTrabajo: Record<string, number>;
}
