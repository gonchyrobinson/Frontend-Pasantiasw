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

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface CreacionEstudianteDto {
  apellido: string;
  nombre: string;
  documento: string;
  domicilio: string;
  carrera: string;
  areaTrabajo: string;
  email: string;
}

export interface EstudiantesState {
  loading: boolean;
  error: string | null;
  estudiantes: EstudianteDto[];
}

export interface EstudiantesFiltersState {
  searchText: string;
  carreraFilter: string;
  areaTrabajoFilter: string;
}

export interface EstudiantesStats {
  total: number;
  porCarrera: Record<string, number>;
  porAreaTrabajo: Record<string, number>;
}
