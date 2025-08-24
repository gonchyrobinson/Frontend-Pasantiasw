import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { apiClient } from '../../Shared/apis/apiClient';

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface EmpresaBusquedaAvanzadaDto {
  nombre?: string;
  vigencia?: boolean; // true = vigente, false = no vigente, undefined = todas
  tipoContrato?: string;
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
      placeholder: 'Seleccionar empresa...',
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
        { value: 'PPS', label: 'PPS' },
        { value: 'Pasantia', label: 'Pasantía' },
        { value: 'otro', label: 'Otro' },
      ],
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
