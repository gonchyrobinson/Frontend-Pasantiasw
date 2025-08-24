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
      placeholder: 'Seleccionar empresa...',
    },
    {
      name: 'numeroAcuerdoMarco',
      label: 'Número de Acuerdo Marco',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccionar número de acuerdo marco...',
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

// Formatear filtros para la búsqueda avanzada - compatible con ConvenioEmpresaFiltroDto del backend
export const formatConvenioSearchFilters = (
  filters: Record<string, unknown>
) => {
  const searchFilters: Record<string, unknown> = {};

  // Mapear campos del formulario al DTO esperado por el backend
  if (filters.nombreEmpresa) {
    searchFilters.nombreEmpresa = filters.nombreEmpresa;
  }
  if (filters.numeroAcuerdoMarco) {
    searchFilters.numeroAcuerdoMarco = filters.numeroAcuerdoMarco;
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
