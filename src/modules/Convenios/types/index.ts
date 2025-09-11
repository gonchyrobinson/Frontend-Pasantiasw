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

// DTO para creación - omite el ID y expediente que son generados por el backend
export type ConvenioCreateDto = Omit<ConvenioDto, 'idConvenio' | 'expediente'>;

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

export interface ConvenioStatsProps {
  stats: ConvenioStats;
  loading: boolean;
}

// Nota: FieldMetadata se importa desde ElementCardGenerica para evitar duplicación
