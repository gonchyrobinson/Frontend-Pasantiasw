import { EmpresaBusquedaAvanzadaDto } from '../types';
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
        maxLength: {
          value: 255,
          message: 'El nombre no puede exceder 255 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'correoElectronico',
      label: 'Correo Electrónico',
      type: 'email' as const,
      validations: {
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'El correo electrónico debe tener un formato válido',
        },
        maxLength: {
          value: 255,
          message: 'El correo electrónico no puede exceder 255 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'celular',
      label: 'Teléfono',
      type: 'text' as const,
      required: false,
      validations: {
        maxLength: {
          value: 50,
          message: 'El teléfono no puede exceder 50 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'encargado',
      label: 'Encargado',
      type: 'text' as const,
      required: false,
      validations: {
        maxLength: {
          value: 100,
          message: 'El encargado no puede exceder 100 caracteres',
        },
      },
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
