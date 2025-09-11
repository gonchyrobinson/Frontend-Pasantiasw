// Removed circular import

export const Vigencia = {
  Vigente: 'vigente',
  NoVigente: 'no_vigente',
} as const;

export type VigenciaType = (typeof Vigencia)[keyof typeof Vigencia];

export const TipoContrato = {
  Indefinido: 'indefinido',
  Temporal: 'temporal',
  Otro: 'otro',
} as const;

export type TipoContratoType = (typeof TipoContrato)[keyof typeof TipoContrato];

export interface EmpresaDto {
  idEmpresa: number;
  nombre: string;
  vigencia: VigenciaType;
  fechaInicio: string; // ISO format: YYYY-MM-DD
  fechaFin: string; // ISO format: YYYY-MM-DD
  tipoContrato: TipoContratoType;
  encargado: string;
  celular: string;
  correoElectronico: string;
  sudocu: string; // Text field, not date
}

// DTO para creación - omite el ID que es generado por el backend
export type CreacionEmpresaDto = Omit<EmpresaDto, 'idEmpresa'>;

export interface EmpresasStats {
  total: number;
  activas: number;
  inactivas: number;
  porTipo: Record<string, number>;
}
