import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { EmpresaDto, Vigencia, VigenciaType } from '../types';

export const getEmpresaMetadata = (): FieldMetadata[] => [
  { name: 'nombre', label: 'Nombre de la Empresa', type: 'text' },
  { name: 'encargado', label: 'Encargado', type: 'text' },
  { name: 'celular', label: 'Teléfono', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'vigencia', label: 'Estado de Vigencia', type: 'text' },
  { name: 'areaTrabajo', label: 'Área de Trabajo', type: 'text' },
];

export const getEmpresaCardTitle = (empresa: EmpresaDto): string => {
  return empresa.nombre;
};

export const getEmpresaCardSubtitle = (empresa: EmpresaDto): string => {
  return empresa.encargado || '';
};

export const filterEmpresas = (
  empresas: EmpresaDto[],
  searchText: string
): EmpresaDto[] => {
  if (!searchText.trim()) return empresas;

  const searchLower = searchText.toLowerCase();
  return empresas.filter(
    empresa =>
      empresa.nombre.toLowerCase().includes(searchLower) ||
      empresa.encargado.toLowerCase().includes(searchLower) ||
      empresa.correoElectronico.toLowerCase().includes(searchLower) ||
      empresa.tipoContrato.toLowerCase().includes(searchLower) ||
      empresa.vigencia.toLowerCase().includes(searchLower)
  );
};

export const getEmpresaSearchFields = (): FieldMetadata[] => [
  { name: 'nombre', label: 'Nombre de la Empresa', type: 'text' },
  { name: 'encargado', label: 'Encargado', type: 'text' },
  { name: 'tipoContrato', label: 'Tipo de Contrato', type: 'text' },
];

export const groupEmpresasByVigencia = (empresas: EmpresaDto[]) => {
  return empresas.reduce(
    (groups, empresa) => {
      const vigencia = empresa.vigencia;
      if (!groups[vigencia]) groups[vigencia] = [];
      groups[vigencia].push(empresa);
      return groups;
    },
    {} as Record<VigenciaType, EmpresaDto[]>
  );
};

export const getEmpresasStats = (empresas: EmpresaDto[]) => {
  const total = empresas.length;
  const activas = empresas.filter(e => e.vigencia === Vigencia.Vigente).length;
  const inactivas = empresas.filter(
    e => e.vigencia === Vigencia.NoVigente
  ).length;
  const porTipo = empresas.reduce(
    (acc, empresa) => {
      acc[empresa.tipoContrato] = (acc[empresa.tipoContrato] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return { total, activas, inactivas, porTipo };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processEmpresasResponse = (response: any): EmpresaDto[] => {
  if (!response) return [];
  return Array.isArray(response)
    ? response
    : response?.data && Array.isArray(response.data)
      ? response.data
      : [];
};

export const applyEmpresasFilters = (
  empresas: EmpresaDto[],
  searchText: string,
  vigenciaFilter: string,
  tipoContratoFilter: string
): EmpresaDto[] => {
  let filtered = filterEmpresas(empresas, searchText);
  if (vigenciaFilter) {
    filtered = filtered.filter(e => e.vigencia === vigenciaFilter);
  }
  if (tipoContratoFilter) {
    filtered = filtered.filter(e => e.tipoContrato === tipoContratoFilter);
  }
  return filtered;
};
