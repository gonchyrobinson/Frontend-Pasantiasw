import { EmpresaDto } from '.';

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
  sudocu: string; // ISO format: YYYY-MM-DD
}

export interface CreacionEmpresaDto {
  nombre: string;
  vigencia: VigenciaType;
  fechaInicio: string; // ISO format: YYYY-MM-DD
  fechaFin: string; // ISO format: YYYY-MM-DD
  tipoContrato: TipoContratoType;
  encargado: string;
  celular: string;
  correoElectronico: string;
  sudocu: string; // ISO format: YYYY-MM-DD
}

export interface EmpresasState {
  loading: boolean;
  error: string | null;
  empresas: EmpresaDto[];
}

export interface EmpresasFiltersState {
  searchText: string;
  vigenciaFilter: string;
  tipoContratoFilter: string;
}

export interface EmpresasStats {
  total: number;
  activas: number;
  inactivas: number;
  porTipo: Record<string, number>;
}
export interface EmpresasGridProps {
  empresas: EmpresaDto[];
  onEmpresaClick?: (empresa: EmpresaDto) => void;
  onEmpresaEdit?: (empresa: EmpresaDto) => void;
  onEmpresaDelete?: (empresa: EmpresaDto) => void;
}
