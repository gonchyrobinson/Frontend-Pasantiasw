// Metadata para búsqueda avanzada de pagos
export const getPagosSearchMetadata = () => ({
  title: 'Búsqueda Avanzada de Pagos',
  submitButtonText: 'Buscar',
  cancelButtonText: 'Cancelar',
  fields: [
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

// Formatear filtros para la búsqueda avanzada - compatible con PagosBusquedaAvanzadaDto del backend
export const formatPagosSearchFilters = (filters: Record<string, unknown>) => {
  const searchFilters: Record<string, unknown> = {};

  // Mapear campos del formulario al DTO esperado por el backend
  // Solo incluir campos que tengan valor (no null, undefined, o string vacío)
  if (
    filters.idEmpresa &&
    filters.idEmpresa !== '' &&
    filters.idEmpresa !== 'null'
  ) {
    searchFilters.idEmpresa = Number(filters.idEmpresa);
  }
  if (
    filters.estudiante &&
    filters.estudiante !== '' &&
    filters.estudiante !== 'null'
  ) {
    searchFilters.estudiante = filters.estudiante;
  }
  if (
    filters.estadoPago &&
    filters.estadoPago !== '' &&
    filters.estadoPago !== 'null'
  ) {
    searchFilters.estadoPago = filters.estadoPago === 'true';
  }
  if (
    filters.fechaVencimiento &&
    filters.fechaVencimiento !== '' &&
    filters.fechaVencimiento !== 'null'
  ) {
    // Convertir la fecha del frontend (string) al formato esperado por el backend
    const fecha = new Date(filters.fechaVencimiento as string);
    if (!isNaN(fecha.getTime())) {
      // Formatear como YYYY-MM-DD para DateOnly
      const fechaFormateada = fecha.toISOString().split('T')[0];
      searchFilters.fechaVencimiento = fechaFormateada;
    }
  }

  return searchFilters;
};
