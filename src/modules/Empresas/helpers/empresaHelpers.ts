import { FieldMetadata } from '../../../ElementCardGenerica';
import { EmpresaDto, Vigencia, VigenciaType } from '../types';

export const getEmpresaMetadata = (): FieldMetadata[] => [
  { name: 'nombre', label: 'Nombre de la Empresa' },
  { name: 'encargado', label: 'Encargado' },
  { name: 'celular', label: 'Teléfono' },
  { name: 'correoElectronico', label: 'Email', type: 'email' },
  { name: 'vigencia', label: 'Vigencia' },
  { name: 'tipoContrato', label: 'Tipo de Contrato' },
  { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date' },
  { name: 'fechaFin', label: 'Fecha de Fin', type: 'date' },
  { name: 'sudocu', label: 'SUDOCU', type: 'date' },
];

export const getEmpresaCardTitle = (empresa: EmpresaDto): string =>
  empresa.nombre;
export const getEmpresaCardSubtitle = (empresa: EmpresaDto): string =>
  `Contrato ${empresa.tipoContrato} - ${empresa.vigencia}`;

export const filterEmpresas = (
  empresas: EmpresaDto[],
  searchText: string
): EmpresaDto[] => {
  if (!searchText.trim()) return empresas;
  const search = searchText.toLowerCase();
  return empresas.filter(
    empresa =>
      empresa.nombre.toLowerCase().includes(search) ||
      empresa.encargado.toLowerCase().includes(search) ||
      empresa.correoElectronico.toLowerCase().includes(search) ||
      empresa.tipoContrato.toLowerCase().includes(search) ||
      empresa.vigencia.toLowerCase().includes(search)
  );
};

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
