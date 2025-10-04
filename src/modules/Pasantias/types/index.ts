// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface PasantiaDto {
  idPasantia: number;
  idEstudiante?: number;
  idConvenio?: number;
  asignacionMensual?: number;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  dniTutorEmpresa?: string;
  tutorFacultad?: string;
  dniTutorFacultad?: string;
  fechaInicio?: string; // DateOnly se maneja como string en frontend
  fechaFin?: string;
  tipoAcuerdo?: string;
  frecuenciaPago?: string;
  observaciones?: string;
  tramiteSudocu?: string;
  horasSemanales?: number;
  areaTrabajo?: string;
  estado?: string; // Calculado en backend
}

// DTO para creación - usa DNI del estudiante en lugar de ID
export interface PasantiaCreateDto {
  dniEstudiante?: string; // Cambiado de idEstudiante a dniEstudiante
  idConvenio?: number;
  asignacionMensual?: number;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  dniTutorEmpresa?: string;
  tutorFacultad?: string;
  dniTutorFacultad?: string;
  fechaInicio?: string;
  fechaFin?: string;
  tipoAcuerdo?: string;
  frecuenciaPago?: string;
  observaciones?: string;
  tramiteSudocu?: string;
  horasSemanales?: number;
  areaTrabajo?: string;
}

// DTO para actualización - incluye ID de pasantía y usa DNI del estudiante
export interface PasantiaUpdateDto {
  idPasantia: number;
  dniEstudiante?: string; // Cambiado de idEstudiante a dniEstudiante
  idConvenio?: number;
  asignacionMensual?: number;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  dniTutorEmpresa?: string;
  tutorFacultad?: string;
  dniTutorFacultad?: string;
  fechaInicio?: string;
  fechaFin?: string;
  tipoAcuerdo?: string;
  frecuenciaPago?: string;
  observaciones?: string;
  tramiteSudocu?: string;
  horasSemanales?: number;
  areaTrabajo?: string;
}

// DTO para pasantía con detalles (incluye estudiante y convenio)
export interface PasantiaDetalleDto {
  pasantia: PasantiaDto;
  estudiante?: EstudianteDto;
  convenio?: ConvenioDto;
}

// DTO para tabla de Acuerdos Individuales (endpoint show-table)
export interface PasantiaShowTableDto {
  idPasantia: number;
  tramiteSudocu?: string;
  estudiante: string;
  empresa: string;
  tipoAcuerdo: string;
  estado: string;
  fechaInicio?: string;
  fechaFin?: string;
}

// DTOs básicos para referencias
export interface EstudianteDto {
  idEstudiante: number;
  nombre: string;
  apellido: string;
  email: string;
  carrera: string;
}

export interface ConvenioDto {
  idConvenio: number;
  idEmpresa?: number;
}

// DTO para filtros de búsqueda avanzada - camelCase (compatible con formulario de búsqueda)
export interface PasantiaBusquedaAvanzadaDto {
  tramiteSudocu?: string;
  tipo?: string;
  estudiante?: string;
  empresa?: string;
  vigente?: boolean;
  carrera?: string;
}

// Tipos para filtros locales (para compatibilidad)
export interface PasantiaFilters {
  expediente?: string;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  tutorFacultad?: string;
  tipoAcuerdo?: string;
  fechaInicioDesde?: string;
  fechaInicioHasta?: string;
  fechaFinDesde?: string;
  fechaFinHasta?: string;
}

// Tipos para estadísticas
export interface PasantiaStats {
  totalPasantias: number;
  pasantiasActivas: number;
  pasantiasFinalizadas: number;
  pasantiasPorVencer: number;
}

export interface PasantiaStatsProps {
  stats: PasantiaStats;
  loading: boolean;
}

// Nota: FieldMetadata se importa desde ElementCardGenerica para evitar duplicación
