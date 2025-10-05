import { PagosStats, PagosDto } from '../types';

/**
 * Helper consolidado para pagos
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata de formularios (crear/editar)
 * - Generación de metadata de formularios de búsqueda
 * - Formateo de filtros de búsqueda para el backend
 * - Cálculo de estadísticas de pagos
 * - Verificación de estados de pagos
 */

// ==================== METADATA DE FORMULARIOS ====================

/**
 * Genera la metadata para el formulario de pagos
 * Utilizado en CrearPago y EditarPago
 *
 * @returns Configuración completa del formulario con campos, validaciones y opciones
 */
export const getPagosFormMetadata = () => ({
  title: 'Información del Pago',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'idPasantia',
      label:
        'Número de trámite - SUDOCU (o id de pasantía en caso de no tener asignado)',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccione una pasantía',
      required: true,
      validations: {
        required: 'Debe seleccionar una pasantía',
      },
      gridSize: 6,
    },
    {
      name: 'fechaPago',
      label: 'Fecha de Pago',
      type: 'date' as const,
      gridSize: 6,
      validations: {
        validate: (value: string) => {
          if (!value) return true; // Campo opcional
          const fechaActual = new Date();
          const fechaPago = new Date(value);
          if (fechaPago > fechaActual) {
            return 'La fecha de pago no puede ser futura';
          }
          return true;
        },
      },
    },
    {
      name: 'fechaVencimiento',
      label: 'Fecha de Vencimiento',
      type: 'date' as const,
      gridSize: 6,
      validations: {
        validate: (value: string, formValues: Record<string, unknown>) => {
          if (!value) return true; // Campo opcional
          const fechaPago = formValues.fechaPago as string;
          if (fechaPago && value <= fechaPago) {
            return 'La fecha de vencimiento debe ser posterior a la fecha de pago';
          }
          return true;
        },
      },
    },
    {
      name: 'monto',
      label: 'Monto',
      type: 'number' as const,
      placeholder: '0.00',
      validations: {
        min: { value: 0, message: 'El monto debe ser mayor o igual a 0' },
      },
      gridSize: 6,
    },
    {
      name: 'observaciones',
      label: 'Observaciones',
      type: 'textarea' as const,
      placeholder: 'Observaciones adicionales del pago',
      gridSize: 12,
      validations: {
        maxLength: {
          value: 500,
          message: 'Las observaciones no pueden exceder 500 caracteres',
        },
      },
    },
  ],
});

// ==================== CÁLCULO DE ESTADÍSTICAS ====================

/**
 * Calcula las estadísticas de pagos basadas en un array de pagos
 *
 * @param pagos - Array de pagos para calcular estadísticas
 * @returns Objeto con estadísticas calculadas (total, vigentes, vencidos, monto total)
 */
export const calculatePagosStats = (pagos: PagosDto[]): PagosStats => {
  const totalPagos = pagos.length;
  const fechaActual = new Date();
  let montoTotal = 0;

  const pagosVigentes = pagos.filter(pago => {
    if (!pago.fechaVencimiento) return false;
    const fechaVencimiento = new Date(pago.fechaVencimiento);
    return fechaVencimiento > fechaActual;
  }).length;

  const pagosVencidos = pagos.filter(pago => {
    if (!pago.fechaVencimiento) return false;
    const fechaVencimiento = new Date(pago.fechaVencimiento);
    return fechaVencimiento <= fechaActual;
  }).length;

  // Calcular monto total
  pagos.forEach(pago => {
    if (pago.monto) {
      montoTotal += pago.monto;
    }
  });

  return {
    totalPagos,
    pagosVigentes,
    pagosVencidos,
    montoTotal,
  };
};

// ==================== VERIFICACIÓN DE ESTADOS ====================

/**
 * Verifica si un pago está vencido basándose en su fecha de vencimiento
 *
 * @param fechaVencimiento - Fecha de vencimiento del pago (string ISO)
 * @returns true si el pago está vencido, false en caso contrario
 */
export const isPagoVencido = (fechaVencimiento?: string): boolean => {
  if (!fechaVencimiento) return false;
  const fechaActual = new Date();
  const fechaVencimientoDate = new Date(fechaVencimiento);
  return fechaVencimientoDate <= fechaActual;
};

/**
 * Obtiene el estado de un pago basándose en su información
 * Utilizado en PagosTabla para mostrar el estado en la tabla
 *
 * @param pago - Objeto pago con información completa
 * @returns Estado del pago: 'Pagado', 'Vencido' o 'Pendiente'
 */
export const getPagoEstado = (pago: PagosDto): string => {
  if (pago.pagado) return 'Pagado';
  if (isPagoVencido(pago.fechaVencimiento)) return 'Vencido';
  return 'Pendiente';
};

// ==================== METADATA DE BÚSQUEDA ====================

/**
 * Genera la metadata para el formulario de búsqueda avanzada de pagos
 * Utilizado en PagosFilters
 *
 * @returns Configuración completa del formulario de búsqueda con campos y opciones
 */
export const getPagosSearchMetadata = () => ({
  title: 'Búsqueda Avanzada de Pagos',
  submitButtonText: 'Buscar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'tramiteSudocu',
      label: 'Trámite SUDOCU',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccionar trámite SUDOCU...',
    },
    {
      name: 'idEmpresa',
      label: 'Empresa',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccionar empresa...',
    },
    {
      name: 'estudiante',
      label: 'Documento del Estudiante',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccionar documento del estudiante...',
    },
    {
      name: 'estadoPago',
      label: 'Estado del Pago',
      type: 'dropdown' as const,
      options: [
        { value: '', label: 'Todos' },
        { value: 'true', label: 'Pagado' },
        { value: 'false', label: 'Pendiente' },
      ],
      placeholder: 'Seleccionar estado...',
    },
    {
      name: 'fechaVencimiento',
      label: 'Fecha de Vencimiento',
      type: 'date' as const,
    },
  ],
});

// ==================== FORMATEO DE FILTROS ====================

/**
 * Formatea los filtros del formulario de búsqueda para enviarlos al backend
 * Convierte los valores del frontend al formato esperado por la API
 * Compatible con PagosBusquedaAvanzadaDto del backend
 *
 * @param filters - Filtros del formulario de búsqueda
 * @returns Objeto DTO formateado para el backend
 */
export const formatPagosSearchFilters = (filters: Record<string, unknown>) => {
  const searchFilters: Record<string, unknown> = {};

  /**
   * Verifica si un valor es válido (no vacío, null o 'null')
   */
  const isValidValue = (value: unknown): boolean => {
    return (
      value !== null && value !== undefined && value !== '' && value !== 'null'
    );
  };

  // Mapear campos del formulario al DTO esperado por el backend
  // Solo incluir campos que tengan valor válido

  // Trámite SUDOCU - mantener como string
  if (isValidValue(filters.tramiteSudocu)) {
    searchFilters.tramiteSudocu = filters.tramiteSudocu;
  }

  // ID de empresa - convertir a número
  if (isValidValue(filters.idEmpresa)) {
    searchFilters.idEmpresa = Number(filters.idEmpresa);
  }

  // Documento del estudiante - mantener como string
  if (isValidValue(filters.estudiante)) {
    searchFilters.estudiante = filters.estudiante;
  }

  // Estado del pago - convertir string a boolean
  if (isValidValue(filters.estadoPago)) {
    searchFilters.estadoPago = filters.estadoPago === 'true';
  }

  // Fecha de vencimiento - formatear para DateOnly del backend
  if (isValidValue(filters.fechaVencimiento)) {
    const fecha = new Date(filters.fechaVencimiento as string);
    if (!isNaN(fecha.getTime())) {
      // Formatear como YYYY-MM-DD para DateOnly
      searchFilters.fechaVencimiento = fecha.toISOString().split('T')[0];
    }
  }

  return searchFilters;
};
