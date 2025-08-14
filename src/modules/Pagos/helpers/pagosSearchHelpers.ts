// Metadata para búsqueda avanzada de pagos
export const getPagosSearchMetadata = () => ({
  title: 'Búsqueda de Pagos por Pasantía',
  submitButtonText: 'Buscar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'idPasantia',
      label: 'Pasantía',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccione una pasantía',
      required: true,
      gridSize: 12,
    },
  ],
});

// Formatear filtros para la búsqueda por pasantía
export const formatPagosSearchFilters = (filters: Record<string, unknown>) => {
  const searchFilters: Record<string, unknown> = {};

  // Solo incluir filtros que tengan valor
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== '') {
      searchFilters[key] = value;
    }
  });

  return searchFilters;
};
