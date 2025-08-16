import { FieldMetadata } from '../../../lib/ElementCardGenerica';

export interface EmpresaBusquedaAvanzadaDto {
  Nombre?: string;
  Vigencia?: boolean; // true = vigente, false = no vigente, undefined = todas
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
      name: 'nombre',
      label: 'Nombre de la Empresa',
      type: 'text',
      placeholder: 'Buscar por nombre...',
    },
    {
      name: 'vigencia',
      label: 'Vigencia',
      type: 'dropdown',
      options: [
        { value: '', label: 'Todas' },
        { value: 'vigente', label: 'Vigente' },
        { value: 'no_vigente', label: 'No Vigente' },
      ],
    },
    {
      name: 'tipoContrato',
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
      name: 'fechaInicioDesde',
      label: 'Fecha de Inicio Desde',
      type: 'date',
    },
    {
      name: 'fechaInicioHasta',
      label: 'Fecha de Inicio Hasta',
      type: 'date',
    },
    {
      name: 'fechaFinDesde',
      label: 'Fecha de Fin Desde',
      type: 'date',
    },
    {
      name: 'fechaFinHasta',
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

  if (filters.nombre) {
    formattedFilters.Nombre = filters.nombre;
  }
  if (filters.vigencia) {
    // Convertir string del frontend a boolean esperado por el backend
    if (filters.vigencia === 'vigente') {
      formattedFilters.Vigencia = true;
    } else if (filters.vigencia === 'no_vigente') {
      formattedFilters.Vigencia = false;
    }
    // Si es empty string o 'todas', no se incluye el filtro
  }
  if (filters.tipoContrato) {
    formattedFilters.TipoContrato = filters.tipoContrato;
  }
  if (filters.fechaInicioDesde) {
    formattedFilters.FechaInicioDesde = filters.fechaInicioDesde;
  }
  if (filters.fechaInicioHasta) {
    formattedFilters.FechaInicioHasta = filters.fechaInicioHasta;
  }
  if (filters.fechaFinDesde) {
    formattedFilters.FechaFinDesde = filters.fechaFinDesde;
  }
  if (filters.fechaFinHasta) {
    formattedFilters.FechaFinHasta = filters.fechaFinHasta;
  }

  return formattedFilters;
};
