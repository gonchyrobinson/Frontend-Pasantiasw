// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface ConvenioDto {
  idConvenio: number;
  idEmpresa?: number;
  representanteEmpresa?: string;
  nroAcuerdoMarco?: number;
  domicilioLegal?: string;
  domicilioAlternativo?: string;
  expediente?: string;
  docRepresentanteEmpresa?: string;
  representanteFacultad?: string;
  docRepresentanteFacultad?: string;
  fechaFirma?: string; // DateOnly se maneja como string en frontend
  fechaCaducidad?: string;
  caracter?: string;
  sudocu?: string;
}

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface ConvenioCreateDto {
  idEmpresa?: number;
  representanteEmpresa?: string;
  nroAcuerdoMarco?: number;
  domicilioLegal?: string;
  domicilioAlternativo?: string;
  docRepresentanteEmpresa?: string;
  docRepresentanteFacultad?: string;
  fechaFirma?: string;
  fechaCaducidad?: string;
  caracter?: string;
  sudocu?: string;
}

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface ConvenioEmpresaDto {
  idConvenio: number;
  expediente?: string;
  fechaFirma?: string;
  fechaCaducidad?: string;
  idEmpresa?: number;
  nombreEmpresa?: string;
  representanteEmpresa?: string;
  domicilioLegal?: string;
  domicilioAlternativo?: string;
  docRepresentanteFacultad?: string;
  caracter?: string;
  sudocu?: string;
}

export interface AsignarEmpresaDto {
  convenioId: number;
  empresaId: number;
}

export interface CaducarConvenioDto {
  convenioId: number;
  fechaCaducidad: string;
}

// Tipos para formularios
export type ConvenioFormData = ConvenioCreateDto;

// DTO para filtros de búsqueda - camelCase (compatible con model binding de ASP.NET Core)
export interface ConvenioEmpresaFiltroDto {
  fechaFirmaDesde?: string;
  fechaFirmaHasta?: string;
  fechaCaducidadDesde?: string;
  fechaCaducidadHasta?: string;
  nombreEmpresa?: string;
  docRepresentanteFacultad?: string;
  carrera?: string;
}

// Tipos para filtros locales (para compatibilidad)
export interface ConvenioFilters {
  expediente?: string;
  empresa?: string;
  fechaFirmaDesde?: string;
  fechaFirmaHasta?: string;
  fechaCaducidadDesde?: string;
  fechaCaducidadHasta?: string;
}

// Tipos para estadísticas
export interface ConvenioStats {
  totalConvenios: number;
  conveniosVigentes: number;
  conveniosCaducados: number;
  conveniosPorVencer: number;
}

// Tipos para acciones
export interface ConvenioActions {
  onEdit: (convenio: ConvenioDto) => void;
  onDelete: (convenio: ConvenioDto) => void;
  onCaducar: (convenio: ConvenioDto) => void;
  onAsignarEmpresa: (convenio: ConvenioDto) => void;
}

// Tipos para componentes
export interface ConvenioCardProps {
  convenio: ConvenioEmpresaDto;
  onEdit: () => void;
  onDelete: () => void;
  onCaducar: () => void;
  onAsignarEmpresa: () => void;
}

export interface ConvenioGridProps {
  convenios: ConvenioEmpresaDto[];
  loading: boolean;
  onEdit: (convenio: ConvenioEmpresaDto) => void;
  onDelete: (convenio: ConvenioEmpresaDto) => void;
  onCaducar: (convenio: ConvenioEmpresaDto) => void;
  onAsignarEmpresa: (convenio: ConvenioEmpresaDto) => void;
}

export interface ConvenioStatsProps {
  stats: ConvenioStats;
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
