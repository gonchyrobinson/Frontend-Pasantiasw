// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface ConvenioDto {
  idConvenio: number;
  idEmpresa?: number;
  representanteEmpresa?: string;
  nroAcuerdoMarco?: number;
  domicilioLegal?: string;
  numeroConvenio: string; // Computed property from backend
  docRepresentanteEmpresa?: string;
  nombreDecano?: string;
  documentoDecano?: string;
  fechaInicio?: string; // DateOnly se maneja como string en frontend
  fechaCaducidad?: string;
  tipoAcuerdo?: string;
  expedienteSudocu?: string;
}

// DTO para creación - omite el ID, numeroConvenio y expedienteSudocu que son generados por el backend
export type ConvenioCreateDto = Omit<
  ConvenioDto,
  'idConvenio' | 'numeroConvenio' | 'expedienteSudocu'
>;

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface ConvenioEmpresaDto {
  idConvenio: number;
  numeroConvenio: string; // Computed property from backend
  fechaInicio?: string;
  fechaCaducidad?: string;
  idEmpresa?: number;
  nombreEmpresa?: string;
  representanteEmpresa?: string;
  nroAcuerdoMarco?: number;
  domicilioLegal?: string;
  documentoDecano?: string;
  tipoAcuerdo?: string;
  expedienteSudocu?: string;
}

export interface AsignarEmpresaDto {
  convenioId: number;
  empresaId: number;
}

export interface CaducarConvenioDto {
  convenioId: number;
  fechaCaducidad: string;
}

// DTO para dropdown de empresas con convenio vigente
export interface EmpresaConvenioDropdownDto {
  idEmpresa: number;
  nombreEmpresa: string;
  idConvenio: number;
  numeroConvenio: string;
  fechaInicio: string;
  fechaCaducidad: string;
}

// DTO para filtros de búsqueda - camelCase (compatible con model binding de ASP.NET Core)
export interface ConvenioEmpresaFiltroDto {
  nombreEmpresa?: string;
  expedienteSudocu?: string;
  vigencia?: boolean; // true = vigente, false = no vigente, undefined = todos
}

// Tipos para estadísticas
export interface ConvenioStats {
  totalConvenios: number;
  conveniosVigentes: number;
  conveniosCaducados: number;
  conveniosPorVencer: number;
}

export interface ConvenioStatsProps {
  stats: ConvenioStats;
  loading: boolean;
}

// Nota: FieldMetadata se importa desde ElementCardGenerica para evitar duplicación
