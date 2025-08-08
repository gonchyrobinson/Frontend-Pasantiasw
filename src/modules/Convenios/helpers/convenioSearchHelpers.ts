// Metadata para búsqueda avanzada de convenios
export const getConvenioSearchMetadata = () => ({
  title: 'Búsqueda Avanzada de Convenios',
  submitButtonText: 'Buscar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'nombreEmpresa',
      label: 'Empresa',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccionar empresa',
      gridSize: 6,
    },
    {
      name: 'docRepresentanteFacultad',
      label: 'Documento del Representante de Facultad',
      type: 'text' as const,
      placeholder: 'Buscar por documento del representante de facultad',
      gridSize: 6,
    },
    {
      name: 'fechaFirmaDesde',
      label: 'Fecha de Firma Desde',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaFirmaHasta',
      label: 'Fecha de Firma Hasta',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaCaducidadDesde',
      label: 'Fecha de Caducidad Desde',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaCaducidadHasta',
      label: 'Fecha de Caducidad Hasta',
      type: 'date' as const,
      gridSize: 6,
    },
  ],
});

// Formatear filtros para la búsqueda avanzada
export const formatConvenioSearchFilters = (
  filters: Record<string, unknown>
) => {
  const searchFilters: Record<string, unknown> = {};

  // Solo incluir filtros que tengan valor
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== '') {
      searchFilters[key] = value;
    }
  });

  return searchFilters;
};
