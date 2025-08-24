import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { CARRERAS_VALIDAS } from './estudianteHelpers';
import { apiClient } from '../../Shared/apis/apiClient';

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface StudentBusquedaAvanzadaDto {
  documento?: string;
  carrera?: string;
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
      name: 'documento',
      label: 'Documento',
      type: 'dynamicDropdown',
      placeholder: 'Seleccionar documento...',
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

export const formatEstudianteSearchFilters = (
  filters: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
): StudentBusquedaAvanzadaDto => {
  const formattedFilters: StudentBusquedaAvanzadaDto = {};

  if (filters.documento) {
    formattedFilters.documento = filters.documento;
  }
  if (filters.carrera) {
    formattedFilters.carrera = filters.carrera;
  }

  return formattedFilters;
};

export const getSugerenciasDocumentos = async (): Promise<
  { value: string; label: string }[]
> => {
  try {
    const documentos = await apiClient.get<
      Array<{ value: string; label: string }>
    >('/students/documentos-dropdown');
    return documentos;
  } catch (error) {
    console.error('Error al obtener sugerencias de documentos:', error);
    return [];
  }
};
