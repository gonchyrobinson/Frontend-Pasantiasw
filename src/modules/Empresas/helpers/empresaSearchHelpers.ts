import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { apiClient } from '../../Shared/apis/apiClient';

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface EmpresaBusquedaAvanzadaDto {
  nombre?: string;
  vigencia?: boolean; // true = vigente, false = no vigente, undefined = todas
  tipoContrato?: string;
  fechaInicioDesde?: string;
  fechaInicioHasta?: string;
  fechaFinDesde?: string;
  fechaFinHasta?: string;
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
      type: 'dynamicDropdown',
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
    formattedFilters.nombre = filters.nombre;
  }
  if (filters.vigencia) {
    // Convertir string del frontend a boolean esperado por el backend
    if (filters.vigencia === 'vigente') {
      formattedFilters.vigencia = true;
    } else if (filters.vigencia === 'no_vigente') {
      formattedFilters.vigencia = false;
    }
    // Si es empty string o 'todas', no se incluye el filtro
  }
  if (filters.tipoContrato) {
    formattedFilters.tipoContrato = filters.tipoContrato;
  }
  if (filters.fechaInicioDesde) {
    formattedFilters.fechaInicioDesde = filters.fechaInicioDesde;
  }
  if (filters.fechaInicioHasta) {
    formattedFilters.fechaInicioHasta = filters.fechaInicioHasta;
  }
  if (filters.fechaFinDesde) {
    formattedFilters.fechaFinDesde = filters.fechaFinDesde;
  }
  if (filters.fechaFinHasta) {
    formattedFilters.fechaFinHasta = filters.fechaFinHasta;
  }

  return formattedFilters;
};

export const getSugerenciasNombresEmpresas = async (): Promise<
  { value: string; label: string }[]
> => {
  try {
    const nombres = await apiClient.get<string[]>(
      '/empresas/sugerencias-nombres'
    );
    return nombres.map(nombre => ({ value: nombre, label: nombre }));
  } catch (error) {
    console.error(
      'Error al obtener sugerencias de nombres de empresas:',
      error
    );
    return [];
  }
};
