import { EmpresaDto, Vigencia } from '../types';

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
