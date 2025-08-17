import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { CARRERAS_VALIDAS } from './estudianteHelpers';

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface StudentBusquedaAvanzadaDto {
  apellido?: string;
  nombre?: string;
  documento?: string;
  carrera?: string;
  areaTrabajo?: string;
}

export const getEstudianteSearchMetadata = (): {
  title: string;
  fields: FieldMetadata[];
  submitButtonText: string;
  cancelButtonText: string;
} => ({
  title: 'Búsqueda Avanzada de Estudiantes',
  fields: [
    {
      name: 'apellido',
      label: 'Apellido',
      type: 'text',
      placeholder: 'Buscar por apellido...',
    },
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Buscar por nombre...',
    },
    {
      name: 'documento',
      label: 'Documento',
      type: 'text',
      placeholder: 'Buscar por documento...',
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
    {
      name: 'areaTrabajo',
      label: 'Área de Trabajo',
      type: 'text',
      placeholder: 'Filtrar por área de trabajo...',
    },
  ],
  submitButtonText: 'Buscar',
  cancelButtonText: 'Limpiar',
});

export const formatEstudianteSearchFilters = (
  filters: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
): StudentBusquedaAvanzadaDto => {
  const formattedFilters: StudentBusquedaAvanzadaDto = {};

  if (filters.apellido) {
    formattedFilters.apellido = filters.apellido;
  }
  if (filters.nombre) {
    formattedFilters.nombre = filters.nombre;
  }
  if (filters.documento) {
    formattedFilters.documento = filters.documento;
  }
  if (filters.carrera) {
    formattedFilters.carrera = filters.carrera;
  }
  if (filters.areaTrabajo) {
    formattedFilters.areaTrabajo = filters.areaTrabajo;
  }

  return formattedFilters;
};
