import { FieldMetadata } from '../../../lib/ElementCardGenerica';

export interface StudentBusquedaAvanzadaDto {
  Apellido?: string;
  Nombre?: string;
  Documento?: string;
  Carrera?: string;
  AreaTrabajo?: string;
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
      name: 'Apellido',
      label: 'Apellido',
      type: 'text',
      placeholder: 'Buscar por apellido...',
    },
    {
      name: 'Nombre',
      label: 'Nombre',
      type: 'text',
      placeholder: 'Buscar por nombre...',
    },
    {
      name: 'Documento',
      label: 'Documento',
      type: 'text',
      placeholder: 'Buscar por documento...',
    },
    {
      name: 'Carrera',
      label: 'Carrera',
      type: 'text',
      placeholder: 'Filtrar por carrera...',
    },
    {
      name: 'AreaTrabajo',
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

  if (filters.Apellido) {
    formattedFilters.Apellido = filters.Apellido;
  }
  if (filters.Nombre) {
    formattedFilters.Nombre = filters.Nombre;
  }
  if (filters.Documento) {
    formattedFilters.Documento = filters.Documento;
  }
  if (filters.Carrera) {
    formattedFilters.Carrera = filters.Carrera;
  }
  if (filters.AreaTrabajo) {
    formattedFilters.AreaTrabajo = filters.AreaTrabajo;
  }

  return formattedFilters;
};
