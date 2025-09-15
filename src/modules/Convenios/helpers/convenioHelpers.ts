import { ConvenioStats, ConvenioEmpresaDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { TIPOS_ACUERDO_CONVENIO_VALIDOS } from '../../../helpers/constants';

/**
 * Helper consolidado para convenios
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata de formularios (crear/editar)
 * - Generación de metadata de formularios de búsqueda
 * - Formateo de filtros de búsqueda para el backend
 * - Cálculo de estadísticas de convenios
 * - Valores por defecto de formularios
 */

// ==================== TIPOS ====================

/**
 * DTO para filtros de búsqueda avanzada de convenios
 * Compatible con ConvenioEmpresaFiltroDto del backend
 */
export interface ConvenioBusquedaAvanzadaDto {
  nombreEmpresa?: string;
  expedienteSudocu?: string;
  vigencia?: boolean; // true = vigente, false = no vigente, undefined = todos
}

// ==================== METADATA DE FORMULARIOS ====================

/**
 * Genera la metadata para el formulario de convenios (crear/editar)
 * Utilizado en CrearConvenio y EditarConvenio
 *
 * @returns Configuración completa del formulario con campos, validaciones y opciones
 */
export const getConvenioFormMetadata = () => ({
  title: 'Información del Convenio',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'idEmpresa',
      label: 'Empresa',
      type: 'dynamicDropdown' as const,
      required: true,
      placeholder: 'Seleccione una empresa',
      gridSize: 6,
    },
    {
      name: 'representanteEmpresa',
      label: 'Representante de la Empresa',
      type: 'text' as const,
      required: true,
      validations: {
        minLength: {
          value: 2,
          message: 'El representante debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El representante no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'docRepresentanteEmpresa',
      label: 'Documento del Representante',
      type: 'text' as const,
      required: true,
      validations: {
        pattern: {
          value: /^\d{7,8}$/,
          message: 'El documento debe ser un DNI válido (7 u 8 dígitos)',
        },
      },
      gridSize: 6,
    },
    {
      name: 'domicilioLegal',
      label: 'Domicilio Legal',
      type: 'textarea' as const,
      required: true,
      validations: {
        minLength: {
          value: 10,
          message: 'El domicilio debe tener al menos 10 caracteres',
        },
        maxLength: {
          value: 255,
          message: 'El domicilio no puede exceder 255 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'nombreDecano',
      label: 'Nombre del Decano',
      type: 'text' as const,
      required: true,
      validations: {
        minLength: {
          value: 2,
          message: 'El nombre debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El nombre no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'documentoDecano',
      label: 'Documento del Decano',
      type: 'text' as const,
      required: true,
      validations: {
        pattern: {
          value: /^\d{7,8}$/,
          message: 'El documento debe ser un DNI válido (7 u 8 dígitos)',
        },
      },
      gridSize: 6,
    },
    {
      name: 'tipoAcuerdo',
      label: 'Tipo de Acuerdo',
      type: 'dropdown' as const,
      required: true,
      options: TIPOS_ACUERDO_CONVENIO_VALIDOS,
      gridSize: 6,
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'date' as const,
      required: true,
      gridSize: 6,
    },
    {
      name: 'fechaCaducidad',
      label: 'Fecha de Caducidad',
      type: 'date' as const,
      required: true,
      gridSize: 6,
    },
  ],
});

// ==================== METADATA DE BÚSQUEDA ====================

/**
 * Genera la metadata para el formulario de búsqueda avanzada de convenios
 * Utilizado en ConveniosFilters
 *
 * @returns Configuración completa del formulario de búsqueda con campos y opciones
 */
export const getConvenioSearchMetadata = (): {
  title: string;
  fields: FieldMetadata[];
  submitButtonText: string;
  cancelButtonText: string;
} => ({
  title: 'Búsqueda Avanzada de Convenios',
  submitButtonText: 'Buscar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'nombreEmpresa',
      label: 'Empresa',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccionar empresa...',
    },
    {
      name: 'expedienteSudocu',
      label: 'Expediente SUDOCU',
      type: 'text' as const,
      placeholder: 'Ingrese el expediente SUDOCU...',
    },
    {
      name: 'vigencia',
      label: 'Vigencia',
      type: 'dropdown' as const,
      options: [
        { value: '', label: 'Todos' },
        { value: 'vigente', label: 'Vigente' },
        { value: 'no_vigente', label: 'No Vigente' },
      ],
    },
  ],
});

// ==================== FORMATEO DE FILTROS ====================

/**
 * Formatea los filtros del formulario de búsqueda para enviarlos al backend
 * Compatible con ConvenioEmpresaFiltroDto del backend
 *
 * @param filters - Filtros del formulario de búsqueda
 * @returns Objeto DTO formateado para el backend
 */
export const formatConvenioSearchFilters = (
  filters: Record<string, unknown>
): ConvenioBusquedaAvanzadaDto => {
  const searchFilters: ConvenioBusquedaAvanzadaDto = {};

  // Mapear campos del formulario al DTO esperado por el backend
  if (filters.nombreEmpresa) {
    searchFilters.nombreEmpresa = filters.nombreEmpresa as string;
  }
  if (filters.expedienteSudocu) {
    searchFilters.expedienteSudocu = filters.expedienteSudocu as string;
  }
  if (filters.vigencia) {
    // Convertir string del frontend a boolean esperado por el backend
    if (filters.vigencia === 'vigente') {
      searchFilters.vigencia = true;
    } else if (filters.vigencia === 'no_vigente') {
      searchFilters.vigencia = false;
    }
    // Si es empty string o 'todos', no se incluye el filtro
  }

  return searchFilters;
};

// ==================== CÁLCULO DE ESTADÍSTICAS ====================

/**
 * Calcula las estadísticas de convenios basadas en un array de convenios
 * Utilizado en useConvenios hook
 *
 * @param convenios - Array de convenios para calcular estadísticas
 * @returns Objeto con estadísticas calculadas (total, vigentes, caducados, por vencer)
 */
export const calculateConvenioStats = (
  convenios: ConvenioEmpresaDto[]
): ConvenioStats => {
  const totalConvenios = convenios.length;
  const fechaActual = new Date();

  const conveniosVigentes = convenios.filter(convenio => {
    if (!convenio.fechaCaducidad) return false;
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    return fechaCaducidad > fechaActual;
  }).length;

  const conveniosCaducados = convenios.filter(convenio => {
    if (!convenio.fechaCaducidad) return false;
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    return fechaCaducidad <= fechaActual;
  }).length;

  // Convenios que caducan en los próximos 30 días
  const treintaDias = new Date();
  treintaDias.setDate(treintaDias.getDate() + 30);

  const conveniosPorVencer = convenios.filter(convenio => {
    if (!convenio.fechaCaducidad) return false;
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    return fechaCaducidad > fechaActual && fechaCaducidad <= treintaDias;
  }).length;

  return {
    totalConvenios,
    conveniosVigentes,
    conveniosCaducados,
    conveniosPorVencer,
  };
};

// ==================== VALORES POR DEFECTO ====================

/**
 * Obtiene los valores por defecto para el formulario de convenios
 * Utilizado en useConvenios hook
 *
 * @returns Objeto con valores por defecto para todos los campos del formulario
 */
export const getDefaultConvenioValues = () => ({
  idEmpresa: undefined,
  representanteEmpresa: '',
  docRepresentanteEmpresa: '',
  domicilioLegal: '',
  nombreDecano: '',
  documentoDecano: '',
  tipoAcuerdo: '',
  fechaInicio: '',
  fechaCaducidad: '',
});
