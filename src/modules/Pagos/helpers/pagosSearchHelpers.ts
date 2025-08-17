// Metadata para búsqueda avanzada de pagos
export const getPagosSearchMetadata = () => ({
  title: 'Búsqueda Avanzada de Pagos',
  submitButtonText: 'Buscar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'idPasantia',
      label: 'Pasantía',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccione una pasantía',
      gridSize: 6,
    },
    {
      name: 'pagado',
      label: 'Estado de Pago',
      type: 'dropdown' as const,
      options: [
        { value: 'true', label: 'Pagado' },
        { value: 'false', label: 'Pendiente' },
      ],
      placeholder: 'Seleccionar estado...',
      gridSize: 6,
    },
    {
      name: 'fechaPagoDesde',
      label: 'Fecha de Pago Desde',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaPagoHasta',
      label: 'Fecha de Pago Hasta',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaVencimientoDesde',
      label: 'Fecha de Vencimiento Desde',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaVencimientoHasta',
      label: 'Fecha de Vencimiento Hasta',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'montoMin',
      label: 'Monto Mínimo',
      type: 'number' as const,
      placeholder: 'Monto mínimo...',
      gridSize: 6,
    },
    {
      name: 'montoMax',
      label: 'Monto Máximo',
      type: 'number' as const,
      placeholder: 'Monto máximo...',
      gridSize: 6,
    },
  ],
});

// Formatear filtros para la búsqueda avanzada - compatible con PagosBusquedaAvanzadaDto del backend
export const formatPagosSearchFilters = (filters: Record<string, unknown>) => {
  const searchFilters: Record<string, unknown> = {};

  // Mapear campos del formulario al DTO esperado por el backend
  if (filters.idPasantia) {
    searchFilters.idPasantia = Number(filters.idPasantia);
  }
  if (filters.pagado !== undefined && filters.pagado !== '') {
    searchFilters.pagado = filters.pagado === 'true';
  }
  if (filters.fechaPagoDesde) {
    searchFilters.fechaPagoDesde = filters.fechaPagoDesde;
  }
  if (filters.fechaPagoHasta) {
    searchFilters.fechaPagoHasta = filters.fechaPagoHasta;
  }
  if (filters.fechaVencimientoDesde) {
    searchFilters.fechaVencimientoDesde = filters.fechaVencimientoDesde;
  }
  if (filters.fechaVencimientoHasta) {
    searchFilters.fechaVencimientoHasta = filters.fechaVencimientoHasta;
  }
  if (filters.montoMin) {
    searchFilters.montoMin = Number(filters.montoMin);
  }
  if (filters.montoMax) {
    searchFilters.montoMax = Number(filters.montoMax);
  }

  return searchFilters;
};
