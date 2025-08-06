import { FieldMetadata } from '../../../ElementCardGenerica';

export interface EmpresaBusquedaAvanzadaDto {
  Nombre?: string;
  Vigencia?: string;
  TipoContrato?: string;
  FechaInicioDesde?: string;
  FechaInicioHasta?: string;
  FechaFinDesde?: string;
  FechaFinHasta?: string;
}

export const getEmpresaSearchMetadata = (): {
  title: string;
  fields: FieldMetadata[];
  submitButtonText: string;
  cancelButtonText: string;
} => ({
  title: 'Búsqueda Avanzada de Empresas',
  fields: [
    {
      name: 'Nombre',
      label: 'Nombre de la Empresa',
      type: 'text',
      placeholder: 'Buscar por nombre...',
    },
    {
      name: 'Vigencia',
      label: 'Vigencia',
      type: 'dropdown',
      options: [
        { value: '', label: 'Todas' },
        { value: 'vigente', label: 'Vigente' },
        { value: 'no_vigente', label: 'No Vigente' },
      ],
    },
    {
      name: 'TipoContrato',
      label: 'Tipo de Contrato',
      type: 'dropdown',
      options: [
        { value: '', label: 'Todos' },
        { value: 'temporal', label: 'Temporal' },
        { value: 'indefinido', label: 'Indefinido' },
        { value: 'otro', label: 'Otro' },
      ],
    },
    {
      name: 'FechaInicioDesde',
      label: 'Fecha de Inicio Desde',
      type: 'date',
    },
    {
      name: 'FechaInicioHasta',
      label: 'Fecha de Inicio Hasta',
      type: 'date',
    },
    {
      name: 'FechaFinDesde',
      label: 'Fecha de Fin Desde',
      type: 'date',
    },
    {
      name: 'FechaFinHasta',
      label: 'Fecha de Fin Hasta',
      type: 'date',
    },
  ],
  submitButtonText: 'Buscar',
  cancelButtonText: 'Limpiar',
});

export const formatEmpresaSearchFilters = (
  filters: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
): EmpresaBusquedaAvanzadaDto => {
  const formattedFilters: EmpresaBusquedaAvanzadaDto = {};

  if (filters.Nombre) {
    formattedFilters.Nombre = filters.Nombre;
  }
  if (filters.Vigencia) {
    formattedFilters.Vigencia = filters.Vigencia;
  }
  if (filters.TipoContrato) {
    formattedFilters.TipoContrato = filters.TipoContrato;
  }
  if (filters.FechaInicioDesde) {
    formattedFilters.FechaInicioDesde = filters.FechaInicioDesde;
  }
  if (filters.FechaInicioHasta) {
    formattedFilters.FechaInicioHasta = filters.FechaInicioHasta;
  }
  if (filters.FechaFinDesde) {
    formattedFilters.FechaFinDesde = filters.FechaFinDesde;
  }
  if (filters.FechaFinHasta) {
    formattedFilters.FechaFinHasta = filters.FechaFinHasta;
  }

  return formattedFilters;
};
