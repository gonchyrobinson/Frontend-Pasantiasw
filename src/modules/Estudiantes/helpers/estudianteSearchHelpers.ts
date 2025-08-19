import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { CARRERAS_VALIDAS } from './estudianteHelpers';
import { apiClient } from '../../Shared/apis/apiClient';

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
      type: 'dynamicDropdown',
      placeholder: 'Buscar por apellido...',
    },
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'dynamicDropdown',
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

export const getSugerenciasNombres = async (): Promise<
  { value: string; label: string }[]
> => {
  try {
    const nombres = await apiClient.get<string[]>(
      '/students/sugerencias-nombres'
    );
    return nombres.map(nombre => ({ value: nombre, label: nombre }));
  } catch (error) {
    console.error('Error al obtener sugerencias de nombres:', error);
    return [];
  }
};

export const getSugerenciasApellidos = async (): Promise<
  { value: string; label: string }[]
> => {
  try {
    const apellidos = await apiClient.get<string[]>(
      '/students/sugerencias-apellidos'
    );
    return apellidos.map(apellido => ({ value: apellido, label: apellido }));
  } catch (error) {
    console.error('Error al obtener sugerencias de apellidos:', error);
    return [];
  }
};
