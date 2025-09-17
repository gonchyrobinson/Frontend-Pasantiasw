import { EstudianteDto } from '../types';
import { getCarrerasOptions } from '../../../helpers/constants';
import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { apiClient } from '../../Shared/apis/apiClient';

/**
 * Helper consolidado para estudiantes
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata de formularios (crear/editar)
 * - Generación de metadata de formularios de búsqueda
 * - Formateo de filtros de búsqueda para el backend
 * - Obtención de sugerencias de documentos
 * - Cálculo de estadísticas de estudiantes
 */

// ==================== TIPOS ====================

/**
 * DTO para filtros de búsqueda avanzada de estudiantes
 * Compatible con model binding de ASP.NET Core (camelCase)
 */
export interface StudentBusquedaAvanzadaDto {
  documento?: string;
  carrera?: string;
}

// ==================== METADATA DE FORMULARIOS ====================

/**
 * Genera la metadata para el formulario de creación de estudiantes
 * Utilizado en CreacionEstudiantes
 *
 * @returns Configuración completa del formulario con campos, validaciones y opciones
 */
export const getCreacionEstudianteMetadata = () => ({
  title: 'Crear Nuevo Estudiante',
  submitButtonText: 'Crear Estudiante',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'apellido',
      label: 'Apellido',
      type: 'text' as const,
      validations: {
        required: 'El apellido es requerido',
        maxLength: {
          value: 100,
          message: 'El apellido no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text' as const,
      validations: {
        required: 'El nombre es requerido',
        maxLength: {
          value: 100,
          message: 'El nombre no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'documento',
      label: 'Documento',
      type: 'text' as const,
      validations: {
        required: 'El documento es requerido',
        pattern: {
          value: /^\d{7,8}$/,
          message: 'El documento debe ser un DNI válido (7 u 8 dígitos)',
        },
      },
      gridSize: 6,
    },
    {
      name: 'domicilio',
      label: 'Domicilio',
      type: 'text' as const,
      validations: {
        required: 'El domicilio es requerido',
        maxLength: {
          value: 255,
          message: 'El domicilio no puede exceder 255 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'libreta',
      label: 'Libreta Universitaria',
      type: 'text' as const,
      validations: {
        maxLength: {
          value: 50,
          message: 'La libreta no puede exceder 50 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'carrera',
      label: 'Carrera',
      type: 'dropdown' as const,
      options: getCarrerasOptions(),
      validations: {
        required: 'La carrera es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      validations: {
        required: 'El email es requerido',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'El email debe tener un formato válido',
        },
      },
      gridSize: 6,
    },
  ],
});

/**
 * Genera la metadata para el formulario de edición de estudiantes
 * Reutiliza la metadata de creación pero cambia título y botón
 * Utilizado en EditarEstudiante
 *
 * @returns Configuración completa del formulario para edición
 */
export const getEdicionEstudianteMetadata = () => ({
  ...getCreacionEstudianteMetadata(),
  title: 'Editar Estudiante',
  submitButtonText: 'Actualizar Estudiante',
});

// ==================== CÁLCULO DE ESTADÍSTICAS ====================

/**
 * Calcula las estadísticas de estudiantes basadas en un array de estudiantes
 * Utilizado en EstudiantesStats
 *
 * @param estudiantes - Array de estudiantes para calcular estadísticas
 * @returns Objeto con estadísticas calculadas (total, por carrera, activos, eliminados)
 */
export const getEstudiantesStats = (estudiantes: EstudianteDto[]) => {
  const total = estudiantes.length;
  const activos = estudiantes.filter(e => !e.eliminado).length;
  const eliminados = estudiantes.filter(e => e.eliminado).length;

  const porCarrera = estudiantes
    .filter(e => !e.eliminado) // Solo contar estudiantes activos
    .reduce(
      (acc, estudiante) => {
        if (estudiante.carrera) {
          acc[estudiante.carrera] = (acc[estudiante.carrera] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

  return { total, porCarrera, activos, eliminados };
};

// ==================== METADATA DE BÚSQUEDA ====================

/**
 * Genera la metadata para el formulario de búsqueda avanzada de estudiantes
 * Utilizado en EstudiantesFilters
 *
 * @returns Configuración completa del formulario de búsqueda con campos y opciones
 */
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
        ...getCarrerasOptions(),
      ],
    },
  ],
  submitButtonText: 'Buscar',
  cancelButtonText: 'Limpiar',
});

// ==================== FORMATEO DE FILTROS ====================

/**
 * Formatea los filtros del formulario de búsqueda para enviarlos al backend
 * Convierte los valores del frontend al formato esperado por la API
 *
 * @param filters - Filtros del formulario de búsqueda
 * @returns Objeto DTO formateado para el backend
 */
export const formatEstudianteSearchFilters = (
  filters: Record<string, unknown>
): StudentBusquedaAvanzadaDto => {
  const formattedFilters: StudentBusquedaAvanzadaDto = {};

  if (filters.documento) {
    formattedFilters.documento = filters.documento as string;
  }
  if (filters.carrera) {
    formattedFilters.carrera = filters.carrera as string;
  }

  return formattedFilters;
};

// ==================== SERVICIOS DE DATOS ====================

/**
 * Obtiene sugerencias de documentos de estudiantes desde el backend
 * Utilizado en EstudiantesFilters para el dropdown dinámico
 *
 * @returns Promise con array de opciones de documentos
 */
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
