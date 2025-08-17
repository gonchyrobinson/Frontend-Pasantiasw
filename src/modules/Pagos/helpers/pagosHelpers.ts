import { PagosStats, PagosDto, PagosFilters } from '../types';

// Metadata para formularios de pagos
export const getPagosFormMetadata = () => ({
  title: 'Información del Pago',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'idPasantia',
      label: 'Pasantía',
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

// Función para calcular estadísticas de pagos
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

// Función para filtrar pagos
export const filterPagos = (
  pagos: PagosDto[],
  filters: PagosFilters
): PagosDto[] => {
  return pagos.filter(pago => {
    // Filtro por ID de pasantía
    if (filters.idPasantia && pago.idPasantia) {
      if (pago.idPasantia.toString() !== filters.idPasantia) {
        return false;
      }
    }

    // Filtro por fecha de pago
    if (filters.fechaPagoDesde && pago.fechaPago) {
      const fechaPago = new Date(pago.fechaPago);
      const fechaDesde = new Date(filters.fechaPagoDesde);
      if (fechaPago < fechaDesde) return false;
    }

    if (filters.fechaPagoHasta && pago.fechaPago) {
      const fechaPago = new Date(pago.fechaPago);
      const fechaHasta = new Date(filters.fechaPagoHasta);
      if (fechaPago > fechaHasta) return false;
    }

    // Filtro por fecha de vencimiento
    if (filters.fechaVencimientoDesde && pago.fechaVencimiento) {
      const fechaVencimiento = new Date(pago.fechaVencimiento);
      const fechaDesde = new Date(filters.fechaVencimientoDesde);
      if (fechaVencimiento < fechaDesde) return false;
    }

    if (filters.fechaVencimientoHasta && pago.fechaVencimiento) {
      const fechaVencimiento = new Date(pago.fechaVencimiento);
      const fechaHasta = new Date(filters.fechaVencimientoHasta);
      if (fechaVencimiento > fechaHasta) return false;
    }

    // Filtro por monto
    if (filters.montoMin && pago.monto) {
      if (pago.monto < filters.montoMin) return false;
    }

    if (filters.montoMax && pago.monto) {
      if (pago.monto > filters.montoMax) return false;
    }

    return true;
  });
};

// Función para obtener valores por defecto del formulario
export const getDefaultPagosValues = () => ({
  idPasantia: undefined,
  fechaPago: '',
  fechaVencimiento: '',
  monto: undefined,
  observaciones: '',
});

// Función para verificar si un pago está vencido
export const isPagoVencido = (fechaVencimiento?: string): boolean => {
  if (!fechaVencimiento) return false;
  const fechaActual = new Date();
  const fechaVencimientoDate = new Date(fechaVencimiento);
  return fechaVencimientoDate <= fechaActual;
};

// Función para obtener el estado de un pago
export const getPagoEstado = (pago: PagosDto): string => {
  if (pago.pagado) return 'Pagado';
  if (isPagoVencido(pago.fechaVencimiento)) return 'Vencido';
  return 'Pendiente';
};

// Función para formatear fechas
export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'No especificada';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
