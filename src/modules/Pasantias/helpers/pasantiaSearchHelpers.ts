import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { CARRERAS_VALIDAS } from '../../Estudiantes/helpers/estudianteHelpers';

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface PasantiaBusquedaAvanzadaDto {
  numeroTramite?: string;
  tipo?: string;
  estudiante?: string;
  empresa?: string;
  vigente?: boolean;
  carrera?: string;
}

export const getPasantiaSearchMetadata = (): {
  title: string;
  fields: FieldMetadata[];
  submitButtonText: string;
  cancelButtonText: string;
} => ({
  title: 'Búsqueda Avanzada de Pasantías',
  fields: [
    {
      name: 'numeroTramite',
      label: 'Número de Trámite',
      type: 'dynamicDropdown',
      placeholder: 'Seleccionar número de trámite...',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'dropdown',
      options: [
        { value: '', label: 'Todos' },
        { value: 'PPS', label: 'PPS' },
        { value: 'Pasantia', label: 'Pasantía' },
        { value: 'otro', label: 'Otro' },
      ],
    },
    {
      name: 'estudiante',
      label: 'Documento del Estudiante',
      type: 'dynamicDropdown',
      placeholder: 'Seleccionar documento del estudiante...',
    },
    {
      name: 'empresa',
      label: 'Empresa',
      type: 'dynamicDropdown',
      placeholder: 'Seleccionar empresa...',
    },
    {
      name: 'vigente',
      label: 'Vigente',
      type: 'dropdown',
      options: [
        { value: '', label: 'Todos' },
        { value: 'vigente', label: 'Vigente' },
        { value: 'no_vigente', label: 'No Vigente' },
      ],
    },
    {
      name: 'carrera',
      label: 'Carrera',
      type: 'dropdown',
      options: [
        { value: '', label: 'Todas las carreras' },
        ...CARRERAS_VALIDAS.map(carrera => ({
          value: carrera,
          label: carrera,
        })),
      ],
    },
  ],
  submitButtonText: 'Buscar',
  cancelButtonText: 'Limpiar',
});

export const formatPasantiaSearchFilters = (
  filters: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
): PasantiaBusquedaAvanzadaDto => {
  const formattedFilters: PasantiaBusquedaAvanzadaDto = {};

  if (filters.numeroTramite) {
    formattedFilters.numeroTramite = filters.numeroTramite;
  }
  if (filters.tipo) {
    formattedFilters.tipo = filters.tipo;
  }
  if (filters.estudiante) {
    formattedFilters.estudiante = filters.estudiante;
  }
  if (filters.empresa) {
    formattedFilters.empresa = filters.empresa;
  }
  if (filters.vigente) {
    // Convertir string del frontend a boolean esperado por el backend
    if (filters.vigente === 'vigente') {
      formattedFilters.vigente = true;
    } else if (filters.vigente === 'no_vigente') {
      formattedFilters.vigente = false;
    }
    // Si es empty string o 'todos', no se incluye el filtro
  }
  if (filters.carrera) {
    formattedFilters.carrera = filters.carrera;
  }

  return formattedFilters;
};
