import {
  PasantiaStats,
  PasantiaDto,
  PasantiaBusquedaAvanzadaDto,
} from '../types';
import {
  TIPOS_ACUERDO_VALIDOS,
  CARRERAS_VALIDAS,
} from '../../../helpers/constants';
import { FieldMetadata } from '../../../lib/ElementCardGenerica';

/**
 * Helper consolidado para pasantías
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata de formularios (crear/editar)
 * - Generación de metadata de formularios de búsqueda
 * - Formateo de filtros de búsqueda para el backend
 * - Cálculo de estadísticas de pasantías
 */

// ==================== METADATA DE FORMULARIOS ====================

/**
 * Genera la metadata para el formulario de pasantías
 * Utilizado en CrearPasantia y EditarPasantia
 *
 * @returns Configuración completa del formulario con campos, validaciones y opciones
 */
export const getPasantiaFormMetadata = () => ({
  title: 'Información de la Pasantía',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'dniEstudiante',
      label: 'Documento del Estudiante',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccione un estudiante...',
      validations: {
        minLength: {
          value: 7,
          message: 'El DNI debe tener al menos 7 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El DNI no puede exceder 20 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'idConvenio',
      label: 'Empresa',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccione una empresa',
      gridSize: 6,
    },
    {
      name: 'asignacionMensual',
      label: 'Asignación Mensual',
      type: 'number' as const,
      validations: {
        min: { value: 0, message: 'La asignación debe ser mayor o igual a 0' },
      },
      gridSize: 6,
    },
    {
      name: 'obraSocial',
      label: 'Obra Social',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'La obra social debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'La obra social no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'art',
      label: 'ART',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'El ART debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El ART no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'tutorEmpresa',
      label: 'Tutor de la Empresa',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'El tutor debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El tutor no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'dniTutorEmpresa',
      label: 'DNI del Tutor de Empresa',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 7,
          message: 'El DNI debe tener al menos 7 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El DNI no puede exceder 20 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'tutorFacultad',
      label: 'Tutor de la Facultad',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'El tutor debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El tutor no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'dniTutorFacultad',
      label: 'DNI del Tutor de Facultad',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 7,
          message: 'El DNI debe tener al menos 7 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El DNI no puede exceder 20 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Fin',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'tipoAcuerdo',
      label: 'Tipo de Acuerdo',
      type: 'dropdown' as const,
      options: [...TIPOS_ACUERDO_VALIDOS],
      gridSize: 6,
    },
    {
      name: 'frecuenciaPago',
      label: 'Frecuencia de Pago',
      type: 'dropdown' as const,
      options: [
        { value: 'Mensual', label: 'Mensual' },
        { value: 'Trimestral', label: 'Trimestral' },
        { value: 'Semestral', label: 'Semestral' },
        { value: 'Anual', label: 'Anual' },
      ],
      gridSize: 6,
    },
    {
      name: 'horasSemanales',
      label: 'Horas Semanales',
      type: 'number' as const,
      validations: {
        min: { value: 1, message: 'Las horas semanales deben ser positivas' },
        max: { value: 20, message: 'Las horas semanales no pueden exceder 20' },
      },
      gridSize: 6,
    },
    {
      name: 'tramiteSudocu',
      label: 'Trámite SUDOCU',
      type: 'text' as const,
      gridSize: 6,
    },
    {
      name: 'areaTrabajo',
      label: 'Área de Trabajo',
      type: 'text' as const,
      gridSize: 6,
    },
    {
      name: 'observaciones',
      label: 'Observaciones',
      type: 'textarea' as const,
      validations: {
        maxLength: {
          value: 500,
          message: 'Las observaciones no pueden exceder 500 caracteres',
        },
      },
      gridSize: 12,
    },
  ],
});

// ==================== CÁLCULO DE ESTADÍSTICAS ====================

/**
 * Calcula las estadísticas de pasantías basadas en un array de pasantías
 *
 * @param pasantias - Array de pasantías para calcular estadísticas
 * @param pasantiasPorVencer - Número opcional de pasantías por vencer (si no se proporciona, se calcula automáticamente)
 * @returns Objeto con estadísticas calculadas (total, activas, finalizadas, por vencer)
 */
export const calculatePasantiaStats = (
  pasantias: PasantiaDto[],
  pasantiasPorVencer?: number
): PasantiaStats => {
  const totalPasantias = pasantias.length;
  const fechaActual = new Date();

  const pasantiasActivas = pasantias.filter(pasantia => {
    if (!pasantia.fechaFin) return false;
    const fechaFin = new Date(pasantia.fechaFin);
    return fechaFin > fechaActual;
  }).length;

  const pasantiasFinalizadas = pasantias.filter(pasantia => {
    if (!pasantia.fechaFin) return false;
    const fechaFin = new Date(pasantia.fechaFin);
    return fechaFin <= fechaActual;
  }).length;

  // Si no se proporciona pasantiasPorVencer, calcular por defecto (30 días)
  const pasantiasPorVencerCalculadas =
    pasantiasPorVencer ??
    (() => {
      const treintaDias = new Date();
      treintaDias.setDate(treintaDias.getDate() + 30);

      return pasantias.filter(pasantia => {
        if (!pasantia.fechaFin) return false;
        const fechaFin = new Date(pasantia.fechaFin);
        return fechaFin > fechaActual && fechaFin <= treintaDias;
      }).length;
    })();

  return {
    totalPasantias,
    pasantiasActivas,
    pasantiasFinalizadas,
    pasantiasPorVencer: pasantiasPorVencerCalculadas,
  };
};

// ==================== METADATA DE BÚSQUEDA ====================

/**
 * Genera la metadata para el formulario de búsqueda avanzada de pasantías
 * Utilizado en PasantiaFilters
 *
 * @returns Configuración completa del formulario de búsqueda con campos y opciones
 */
export const getPasantiaSearchMetadata = (): {
  title: string;
  fields: FieldMetadata[];
  submitButtonText: string;
  cancelButtonText: string;
} => ({
  title: 'Búsqueda Avanzada de Pasantías',
  fields: [
    {
      name: 'tramiteSudocu',
      label: 'Trámite SUDOCU',
      type: 'dynamicDropdown',
      placeholder: 'Seleccionar trámite SUDOCU...',
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'dropdown',
      options: [{ value: '', label: 'Todos' }, ...TIPOS_ACUERDO_VALIDOS],
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

// ==================== FORMATEO DE FILTROS ====================

/**
 * Formatea los filtros del formulario de búsqueda para enviarlos al backend
 * Convierte los valores del frontend al formato esperado por la API
 *
 * @param filters - Filtros del formulario de búsqueda
 * @returns Objeto DTO formateado para el backend
 */
export const formatPasantiaSearchFilters = (
  filters: Record<string, unknown>
): PasantiaBusquedaAvanzadaDto => {
  const formattedFilters: PasantiaBusquedaAvanzadaDto = {};

  if (filters.tramiteSudocu) {
    formattedFilters.tramiteSudocu = filters.tramiteSudocu as string;
  }
  if (filters.tipo) {
    formattedFilters.tipo = filters.tipo as string;
  }
  if (filters.estudiante) {
    formattedFilters.estudiante = filters.estudiante as string;
  }
  if (filters.empresa) {
    formattedFilters.empresa = filters.empresa as string;
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
    formattedFilters.carrera = filters.carrera as string;
  }

  return formattedFilters;
};

// ==================== METADATA PARA EDICIÓN ====================

/**
 * Obtiene la metadata específica para el formulario de edición de pasantías
 * Convierte los campos dniEstudiante e idConvenio a readonly
 *
 * @returns Metadata configurada para edición con campos readonly
 */
export const getPasantiaEditMetadata = () => {
  const baseMetadata = getPasantiaFormMetadata();

  // Modificar los campos para que dniEstudiante e idConvenio sean readonly
  const modifiedFields = baseMetadata.fields.map(field => {
    if (field.name === 'dniEstudiante') {
      return {
        ...field,
        type: 'text' as const,
        readonly: true,
        label: 'Documento del Estudiante',
      };
    }
    if (field.name === 'idConvenio') {
      return {
        ...field,
        type: 'text' as const,
        readonly: true,
        label: 'Empresa',
      };
    }
    return field;
  });

  return {
    ...baseMetadata,
    fields: modifiedFields,
  };
};
