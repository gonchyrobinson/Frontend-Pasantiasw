import { CARRERAS_VALIDAS } from '../../Estudiantes/helpers/estudianteHelpers';

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
      name: 'carrera',
      label: 'Carrera',
      type: 'dropdown' as const,
      options: [
        { value: '', label: 'Todas las carreras' },
        ...CARRERAS_VALIDAS.map(carrera => ({
          value: carrera,
          label: carrera,
        })),
      ],
      gridSize: 12,
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

// Formatear filtros para la búsqueda avanzada - compatible con ConvenioEmpresaFiltroDto del backend
export const formatConvenioSearchFilters = (
  filters: Record<string, unknown>
) => {
  const searchFilters: Record<string, unknown> = {};

  // Mapear campos del formulario al DTO esperado por el backend
  if (filters.nombreEmpresa) {
    searchFilters.nombreEmpresa = filters.nombreEmpresa;
  }
  if (filters.docRepresentanteFacultad) {
    searchFilters.docRepresentanteFacultad = filters.docRepresentanteFacultad;
  }
  if (filters.carrera) {
    searchFilters.carrera = filters.carrera;
  }
  if (filters.fechaFirmaDesde) {
    searchFilters.fechaFirmaDesde = filters.fechaFirmaDesde;
  }
  if (filters.fechaFirmaHasta) {
    searchFilters.fechaFirmaHasta = filters.fechaFirmaHasta;
  }
  if (filters.fechaCaducidadDesde) {
    searchFilters.fechaCaducidadDesde = filters.fechaCaducidadDesde;
  }
  if (filters.fechaCaducidadHasta) {
    searchFilters.fechaCaducidadHasta = filters.fechaCaducidadHasta;
  }

  return searchFilters;
};
