// DTOs del backend
export interface PasantiaDto {
  idPasantia: number;
  idEstudiante: number;
  idConvenio: number;
  asignacionMensual: number;
  obraSocial: string;
  art: string;
  tutorEmpresa: string;
  tutorFacultad: string;
  expediente: string;
  fechaInicio: string; // DateOnly se maneja como string en frontend
  fechaFin: string;
  tipoAcuerdo: 'Pasantia' | 'PPS' | 'otro';
  observaciones: string;
}

export interface PasantiaCreateDto {
  idEstudiante: number;
  idConvenio: number;
  asignacionMensual: number;
  obraSocial: string;
  art: string;
  tutorEmpresa: string;
  tutorFacultad: string;
  expediente: string;
  fechaInicio: string;
  fechaFin: string;
  tipoAcuerdo: 'Pasantia' | 'PPS' | 'otro';
  observaciones: string;
}

// Tipos para formularios
export type PasantiaFormData = PasantiaCreateDto;

// Tipos para filtros y búsqueda
export interface PasantiaFilters {
  expediente?: string;
  obraSocial?: string;
  art?: string;
  tutorEmpresa?: string;
  tutorFacultad?: string;
  tipoAcuerdo?: 'Pasantia' | 'PPS' | 'otro';
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
