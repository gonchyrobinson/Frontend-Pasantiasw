import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';

// Metadata para el formulario de búsqueda avanzada
export const getPasantiaSearchMetadata = () => ({
  title: 'Búsqueda Avanzada de Pasantías',
  fields: [
    {
      name: 'tramite',
      label: 'Tramite',
      type: 'text',
      required: false,
      placeholder: 'Buscar por trámite...',
    },
    {
      name: 'obraSocial',
      label: 'Obra Social',
      type: 'text',
      required: false,
      placeholder: 'Buscar por obra social...',
    },
    {
      name: 'art',
      label: 'ART',
      type: 'text',
      required: false,
      placeholder: 'Buscar por ART...',
    },
    {
      name: 'tutorEmpresa',
      label: 'Tutor Empresa',
      type: 'text',
      required: false,
      placeholder: 'Buscar por tutor de empresa...',
    },
    {
      name: 'tutorFacultad',
      label: 'Tutor Facultad',
      type: 'text',
      required: false,
      placeholder: 'Buscar por tutor de facultad...',
    },
    {
      name: 'tipoAcuerdo',
      label: 'Tipo de Acuerdo',
      type: 'dropdown',
      required: false,
      options: [
        { value: 'Pasantia', label: 'Pasantía' },
        { value: 'PPS', label: 'PPS' },
        { value: 'otro', label: 'Otro' },
      ],
    },
    {
      name: 'fechaInicioDesde',
      label: 'Fecha de Inicio Desde',
      type: 'date',
      required: false,
    },
    {
      name: 'fechaInicioHasta',
      label: 'Fecha de Inicio Hasta',
      type: 'date',
      required: false,
    },
    {
      name: 'fechaFinDesde',
      label: 'Fecha de Fin Desde',
      type: 'date',
      required: false,
    },
    {
      name: 'fechaFinHasta',
      label: 'Fecha de Fin Hasta',
      type: 'date',
      required: false,
    },
    {
      name: 'idEstudiante',
      label: 'Estudiante',
      type: 'dynamicDropdown',
      required: false,
      placeholder: 'Seleccionar estudiante...',
    },
    {
      name: 'idConvenio',
      label: 'Convenio',
      type: 'dynamicDropdown',
      required: false,
      placeholder: 'Seleccionar convenio...',
    },
    {
      name: 'estado',
      label: 'Estado',
      type: 'dropdown',
      required: false,
      options: [
        { value: 'Activa', label: 'Activa' },
        { value: 'Finalizada', label: 'Finalizada' },
        { value: 'Suspendida', label: 'Suspendida' },
        { value: 'Cancelada', label: 'Cancelada' },
      ],
    },
  ] as FieldMetadata[],
  submitButtonText: 'Buscar',
  cancelButtonText: 'Cancelar',
});

// Función para formatear los filtros de búsqueda
export const formatPasantiaSearchFilters = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedFilters: Record<string, any> = {};

  // Filtros de texto
  if (filters.tramite) {
    formattedFilters.tramite = filters.tramite;
  }
  if (filters.obraSocial) {
    formattedFilters.obraSocial = filters.obraSocial;
  }
  if (filters.art) {
    formattedFilters.art = filters.art;
  }
  if (filters.tutorEmpresa) {
    formattedFilters.tutorEmpresa = filters.tutorEmpresa;
  }
  if (filters.tutorFacultad) {
    formattedFilters.tutorFacultad = filters.tutorFacultad;
  }
  if (filters.tipoAcuerdo) {
    formattedFilters.tipoAcuerdo = filters.tipoAcuerdo;
  }

  // Filtros de fecha
  if (filters.fechaInicioDesde) {
    formattedFilters.fechaInicioDesde = filters.fechaInicioDesde;
  }
  if (filters.fechaInicioHasta) {
    formattedFilters.fechaInicioHasta = filters.fechaInicioHasta;
  }
  if (filters.fechaFinDesde) {
    formattedFilters.fechaFinDesde = filters.fechaFinDesde;
  }
  if (filters.fechaFinHasta) {
    formattedFilters.fechaFinHasta = filters.fechaFinHasta;
  }

  // Filtros de ID (dropdowns)
  if (filters.idEstudiante) {
    formattedFilters.idEstudiante = Number(filters.idEstudiante);
  }
  if (filters.idConvenio) {
    formattedFilters.idConvenio = Number(filters.idConvenio);
  }
  if (filters.estado) {
    formattedFilters.estado = filters.estado;
  }

  return formattedFilters;
};
