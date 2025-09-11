import { EmpresaDto, Vigencia, TipoContrato, TipoContratoType } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { apiClient } from '../../Shared/apis/apiClient';

/**
 * Helper consolidado para empresas
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata de formularios (crear/editar)
 * - Generación de metadata de formularios de búsqueda
 * - Formateo de filtros de búsqueda para el backend
 * - Cálculo de estadísticas de empresas
 * - Obtención de sugerencias de nombres
 */

// ==================== UTILIDADES DE OPCIONES ====================

/**
 * Genera opciones de dropdown para vigencia
 * Utilizada en formularios de empresas
 *
 * @returns Array de opciones formateadas para dropdowns
 */
export const getVigenciaOptions = () => [
  { value: Vigencia.Vigente, label: 'Vigente' },
  { value: Vigencia.NoVigente, label: 'No Vigente' },
];

/**
 * Genera opciones de dropdown para vigencia en búsquedas
 * Incluye opción "Todas" para filtros
 *
 * @returns Array de opciones formateadas para dropdowns de búsqueda
 */
export const getVigenciaSearchOptions = () => [
  { value: '', label: 'Todas' },
  { value: 'vigente', label: 'Vigente' },
  { value: 'no_vigente', label: 'No Vigente' },
];

/**
 * Genera opciones de dropdown para tipo de contrato
 * Utilizada en formularios de empresas
 *
 * @returns Array de opciones formateadas para dropdowns
 */
export const getTipoContratoOptions = () => [
  { value: TipoContrato.Indefinido, label: 'Indefinido' },
  { value: TipoContrato.Temporal, label: 'Temporal' },
  { value: TipoContrato.Otro, label: 'Otro' },
];

/**
 * Genera opciones de dropdown para tipo de contrato en búsquedas
 * Incluye opción "Todos" para filtros
 *
 * @returns Array de opciones formateadas para dropdowns de búsqueda
 */
export const getTipoContratoSearchOptions = () => [
  { value: '', label: 'Todos' },
  { value: TipoContrato.Indefinido, label: 'Indefinido' },
  { value: TipoContrato.Temporal, label: 'Temporal' },
  { value: TipoContrato.Otro, label: 'Otro' },
];

// ==================== METADATA DE FORMULARIOS ====================

/**
 * Genera la metadata para el formulario de creación de empresas
 * Utilizado en CreacionEmpresas
 *
 * @returns Configuración completa del formulario con campos, validaciones y opciones
 */
export const getCreacionEmpresaMetadata = () => ({
  title: 'Crear Nueva Empresa',
  submitButtonText: 'Crear Empresa',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre de la Empresa',
      type: 'text' as const,
      validations: {
        required: 'El nombre es requerido',
        minLength: {
          value: 2,
          message: 'El nombre debe tener al menos 2 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'vigencia',
      label: 'Vigencia',
      type: 'dropdown' as const,
      options: getVigenciaOptions(),
      validations: {
        required: 'La vigencia es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'tipoContrato',
      label: 'Tipo de Contrato',
      type: 'dropdown' as const,
      options: getTipoContratoOptions(),
      validations: {
        required: 'El tipo de contrato es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'date' as const,
      validations: {
        required: 'La fecha de inicio es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Fin',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'encargado',
      label: 'Encargado',
      type: 'text' as const,
      validations: {
        required: 'El encargado es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'celular',
      label: 'Celular',
      type: 'text' as const,
      validations: {
        required: 'El celular es requerido',
        pattern: {
          value: /^[0-9+\-\s()]+$/,
          message: 'Formato de celular inválido',
        },
      },
      gridSize: 6,
    },
    {
      name: 'correoElectronico',
      label: 'Correo Electrónico',
      type: 'email' as const,
      validations: {
        required: 'El correo electrónico es requerido',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Formato de correo electrónico inválido',
        },
      },
      gridSize: 6,
    },
    {
      name: 'sudocu',
      label: 'SUDOCU',
      type: 'text' as const,
      gridSize: 6,
    },
  ],
});

/**
 * Genera la metadata para el formulario de edición de empresas
 * Reutiliza la metadata de creación pero cambia título y botón
 * Utilizado en EditarEmpresa
 *
 * @returns Configuración completa del formulario para edición
 */
export const getEdicionEmpresaMetadata = () => ({
  ...getCreacionEmpresaMetadata(),
  title: 'Editar Empresa',
  submitButtonText: 'Actualizar Empresa',
});

// ==================== METADATA DE BÚSQUEDA ====================

/**
 * DTO para filtros de búsqueda avanzada de empresas
 * Compatible con model binding de ASP.NET Core (camelCase)
 */
export interface EmpresaBusquedaAvanzadaDto {
  nombre?: string;
  vigencia?: boolean; // true = vigente, false = no vigente, undefined = todas
  tipoContrato?: TipoContratoType;
}

/**
 * Genera la metadata para el formulario de búsqueda avanzada de empresas
 * Utilizado en EmpresasFilters
 *
 * @returns Configuración completa del formulario de búsqueda con campos y opciones
 */
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
      options: getVigenciaSearchOptions(),
    },
    {
      name: 'tipoContrato',
      label: 'Tipo de Contrato',
      type: 'dropdown',
      options: getTipoContratoSearchOptions(),
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
export const formatEmpresaSearchFilters = (
  filters: Record<string, unknown>
): EmpresaBusquedaAvanzadaDto => {
  const formattedFilters: EmpresaBusquedaAvanzadaDto = {};

  if (filters.nombre) {
    formattedFilters.nombre = filters.nombre as string;
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
    formattedFilters.tipoContrato = filters.tipoContrato as TipoContratoType;
  }

  return formattedFilters;
};

// ==================== SERVICIOS DE DATOS ====================

/**
 * Obtiene sugerencias de nombres de empresas desde el backend
 * Utilizado en EmpresasFilters para el dropdown dinámico
 *
 * @returns Promise con array de opciones de nombres de empresas
 */
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

// ==================== CÁLCULO DE ESTADÍSTICAS ====================

/**
 * Calcula las estadísticas de empresas basadas en un array de empresas
 * Utilizado en EmpresasStats
 *
 * @param empresas - Array de empresas para calcular estadísticas
 * @returns Objeto con estadísticas calculadas (total, activas, inactivas, por tipo)
 */
export const getEmpresasStats = (empresas: EmpresaDto[]) => {
  const total = empresas.length;
  const activas = empresas.filter(e => e.vigencia === Vigencia.Vigente).length;
  const inactivas = empresas.filter(
    e => e.vigencia === Vigencia.NoVigente
  ).length;
  const porTipo = empresas.reduce(
    (acc, empresa) => {
      acc[empresa.tipoContrato] = (acc[empresa.tipoContrato] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return { total, activas, inactivas, porTipo };
};
