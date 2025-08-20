import { PasantiaStats, PasantiaDto, PasantiaFilters } from '../types';

// Metadata para formularios de pasantías
export const getPasantiaFormMetadata = () => ({
  title: 'Información de la Pasantía',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'idEstudiante',
      label: 'Estudiante',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccione un estudiante',
      gridSize: 6,
    },
    {
      name: 'idConvenio',
      label: 'Empresa',
      type: 'dynamicDropdown' as const,
      placeholder: 'Seleccione una empresa',
      gridSize: 6,
    },
    {
      name: 'asignacionMensual',
      label: 'Asignación Mensual',
      type: 'number' as const,
      validations: {
        min: { value: 0, message: 'La asignación debe ser mayor o igual a 0' },
      },
      gridSize: 6,
    },
    {
      name: 'obraSocial',
      label: 'Obra Social',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'La obra social debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'La obra social no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'art',
      label: 'ART',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'El ART debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El ART no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'tutorEmpresa',
      label: 'Tutor de la Empresa',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'El tutor debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El tutor no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'tutorFacultad',
      label: 'Tutor de la Facultad',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 2,
          message: 'El tutor debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El tutor no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'dniTutorFacultad',
      label: 'DNI del Tutor de Facultad',
      type: 'text' as const,
      validations: {
        minLength: {
          value: 7,
          message: 'El DNI debe tener al menos 7 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El DNI no puede exceder 20 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Fin',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'tipoAcuerdo',
      label: 'Tipo de Acuerdo',
      type: 'dropdown' as const,
      options: [
        { value: 'Pasantia', label: 'Pasantía' },
        { value: 'PPS', label: 'PPS' },
        { value: 'otro', label: 'Otro' },
      ],
      gridSize: 6,
    },
    {
      name: 'frecuenciaPago',
      label: 'Frecuencia de Pago',
      type: 'dropdown' as const,
      options: [
        { value: 'Mensual', label: 'Mensual' },
        { value: 'Trimestral', label: 'Trimestral' },
        { value: 'Semestral', label: 'Semestral' },
        { value: 'Anual', label: 'Anual' },
      ],
      gridSize: 6,
    },
    {
      name: 'montoPago',
      label: 'Monto de Pago',
      type: 'number' as const,
      validations: {
        min: { value: 0, message: 'El monto debe ser mayor o igual a 0' },
      },
      gridSize: 6,
    },
    // areaTrabajo y estado se calculan automáticamente - no deben estar en el formulario
    {
      name: 'sudocu',
      label: 'SUDOCU',
      type: 'text' as const,
      gridSize: 6,
    },
    {
      name: 'observaciones',
      label: 'Observaciones',
      type: 'textarea' as const,
      validations: {
        maxLength: {
          value: 500,
          message: 'Las observaciones no pueden exceder 500 caracteres',
        },
      },
      gridSize: 12,
    },
  ],
});

// Función para calcular estadísticas de pasantías
export const calculatePasantiaStats = (
  pasantias: PasantiaDto[]
): PasantiaStats => {
  const totalPasantias = pasantias.length;
  const fechaActual = new Date();

  const pasantiasActivas = pasantias.filter(pasantia => {
    if (!pasantia.fechaFin) return false;
    const fechaFin = new Date(pasantia.fechaFin);
    return fechaFin > fechaActual;
  }).length;

  const pasantiasFinalizadas = pasantias.filter(pasantia => {
    if (!pasantia.fechaFin) return false;
    const fechaFin = new Date(pasantia.fechaFin);
    return fechaFin <= fechaActual;
  }).length;

  // Pasantías que finalizan en los próximos 30 días
  const treintaDias = new Date();
  treintaDias.setDate(treintaDias.getDate() + 30);

  const pasantiasPorVencer = pasantias.filter(pasantia => {
    if (!pasantia.fechaFin) return false;
    const fechaFin = new Date(pasantia.fechaFin);
    return fechaFin > fechaActual && fechaFin <= treintaDias;
  }).length;

  return {
    totalPasantias,
    pasantiasActivas,
    pasantiasFinalizadas,
    pasantiasPorVencer,
  };
};

// Función para filtrar pasantías
export const filterPasantias = (
  pasantias: PasantiaDto[],
  filters: PasantiaFilters
): PasantiaDto[] => {
  return pasantias.filter(pasantia => {
    // Filtro por trámite
    if (
      filters.expediente &&
      !pasantia.tramite
        ?.toLowerCase()
        .includes(filters.expediente.toLowerCase())
    ) {
      return false;
    }

    // Filtro por obra social
    if (
      filters.obraSocial &&
      !pasantia.obraSocial
        ?.toLowerCase()
        .includes(filters.obraSocial.toLowerCase())
    ) {
      return false;
    }

    // Filtro por ART
    if (
      filters.art &&
      !pasantia.art?.toLowerCase().includes(filters.art.toLowerCase())
    ) {
      return false;
    }

    // Filtro por tutor empresa
    if (
      filters.tutorEmpresa &&
      !pasantia.tutorEmpresa
        ?.toLowerCase()
        .includes(filters.tutorEmpresa.toLowerCase())
    ) {
      return false;
    }

    // Filtro por tutor facultad
    if (
      filters.tutorFacultad &&
      !pasantia.tutorFacultad
        ?.toLowerCase()
        .includes(filters.tutorFacultad.toLowerCase())
    ) {
      return false;
    }

    // Filtro por tipo de acuerdo
    if (filters.tipoAcuerdo && pasantia.tipoAcuerdo !== filters.tipoAcuerdo) {
      return false;
    }

    // Filtro por fecha de inicio
    if (filters.fechaInicioDesde && pasantia.fechaInicio) {
      const fechaInicio = new Date(pasantia.fechaInicio);
      const fechaDesde = new Date(filters.fechaInicioDesde);
      if (fechaInicio < fechaDesde) return false;
    }

    if (filters.fechaInicioHasta && pasantia.fechaInicio) {
      const fechaInicio = new Date(pasantia.fechaInicio);
      const fechaHasta = new Date(filters.fechaInicioHasta);
      if (fechaInicio > fechaHasta) return false;
    }

    // Filtro por fecha de fin
    if (filters.fechaFinDesde && pasantia.fechaFin) {
      const fechaFin = new Date(pasantia.fechaFin);
      const fechaDesde = new Date(filters.fechaFinDesde);
      if (fechaFin < fechaDesde) return false;
    }

    if (filters.fechaFinHasta && pasantia.fechaFin) {
      const fechaFin = new Date(pasantia.fechaFin);
      const fechaHasta = new Date(filters.fechaFinHasta);
      if (fechaFin > fechaHasta) return false;
    }

    return true;
  });
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

// Función para verificar si una pasantía está activa
export const isPasantiaActiva = (fechaFin?: string): boolean => {
  if (!fechaFin) return false;
  const fechaActual = new Date();
  const fechaFinDate = new Date(fechaFin);
  return fechaFinDate > fechaActual;
};

// Función para obtener el estado de una pasantía
export const getPasantiaEstado = (fechaFin?: string): string => {
  if (!fechaFin) return 'Sin fecha de fin';

  const fechaActual = new Date();
  const fechaFinDate = new Date(fechaFin);

  if (fechaFinDate <= fechaActual) {
    return 'Finalizada';
  }

  const diasRestantes = Math.ceil(
    (fechaFinDate.getTime() - fechaActual.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diasRestantes <= 30) {
    return `Por vencer (${diasRestantes} días)`;
  }
  return 'Activa';
};

// Función para obtener valores por defecto del formulario
export const getDefaultPasantiaValues = () => ({
  idEstudiante: undefined,
  idConvenio: undefined,
  asignacionMensual: 0,
  obraSocial: '',
  art: '',
  tutorEmpresa: '',
  tutorFacultad: '',
  dniTutorFacultad: '',
  fechaInicio: '',
  fechaFin: '',
  tipoAcuerdo: 'Pasantia',
  frecuenciaPago: 'Mensual',
  montoPago: 0,
  observaciones: '',
  areaTrabajo: '',
  estado: 'Activa',
  sudocu: '',
});
