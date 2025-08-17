// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface PasantiaDto {
  idPasantia: number;
  idEstudiante?: number;
  idConvenio?: number;
  asignacionMensual?: number;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  tutorFacultad?: string;
  dniTutorFacultad?: string;
  tramite?: string; // Calculado en backend como "EXP-FACET-{IdPasantia:D3}"
  fechaInicio?: string; // DateOnly se maneja como string en frontend
  fechaFin?: string;
  tipoAcuerdo?: string;
  frecuenciaPago?: string;
  montoPago?: number;
  observaciones?: string;
  sudocu?: string;
  areaTrabajo?: string;
  estado?: string;
}

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface PasantiaCreateDto {
  idEstudiante?: number;
  idConvenio?: number;
  asignacionMensual?: number;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  tutorFacultad?: string;
  dniTutorFacultad?: string;
  fechaInicio?: string;
  fechaFin?: string;
  tipoAcuerdo?: string;
  frecuenciaPago?: string;
  montoPago?: number;
  observaciones?: string;
  sudocu?: string;
  areaTrabajo?: string;
  estado?: string;
}

// DTO para pasantía con detalles (incluye estudiante y convenio)
export interface PasantiaDetalleDto {
  pasantia: PasantiaDto;
  estudiante?: EstudianteDto;
  convenio?: ConvenioDto;
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

// Tipos para formularios
export type PasantiaFormData = PasantiaCreateDto;

// DTO para filtros de búsqueda avanzada - camelCase
export interface PasantiaBusquedaAvanzadaDto {
  idEstudiante?: number;
  idConvenio?: number;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  tutorFacultad?: string;
  tipoAcuerdo?: string;
  fechaInicioDesde?: string;
  fechaInicioHasta?: string;
  fechaFinDesde?: string;
  fechaFinHasta?: string;
  estado?: string;
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

// Tipos para acciones
export interface PasantiaActions {
  onEdit: (pasantia: PasantiaDto) => void;
  onDelete: (pasantia: PasantiaDto) => void;
  onFinalizar: (pasantia: PasantiaDto) => void;
  onActivar: (pasantia: PasantiaDto) => void;
}

// Tipos para componentes
export interface PasantiaCardProps {
  pasantia: PasantiaDto;
  onEdit: () => void;
  onDelete: () => void;
  onFinalizar: () => void;
  onActivar: () => void;
}

export interface PasantiaGridProps {
  pasantias: PasantiaDto[];
  loading: boolean;
  onEdit: (pasantia: PasantiaDto) => void;
  onDelete: (pasantia: PasantiaDto) => void;
  onFinalizar: (pasantia: PasantiaDto) => void;
  onActivar: (pasantia: PasantiaDto) => void;
}

export interface PasantiaStatsProps {
  stats: PasantiaStats;
  loading: boolean;
}

// Tipos para metadata de formularios
export interface FieldMetadata {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'date'
    | 'textarea';
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => string | true;
  };
  options?: Array<{ value: string | number; label: string }>;
  gridProps?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}
