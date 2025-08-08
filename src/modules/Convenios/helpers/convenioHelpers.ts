import { ConvenioStats, ConvenioEmpresaDto, ConvenioFilters } from '../types';

// Metadata para formularios de convenios
export const getConvenioFormMetadata = () => ({
  title: 'Información del Convenio',
  submitButtonText: 'Guardar',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'expediente',
      label: 'Expediente',
      type: 'text' as const,
      required: true,
      validations: {
        minLength: {
          value: 3,
          message: 'El expediente debe tener al menos 3 caracteres',
        },
        maxLength: {
          value: 50,
          message: 'El expediente no puede exceder 50 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'idEmpresa',
      label: 'Empresa',
      type: 'dynamicDropdown' as const,
      required: true,
      placeholder: 'Seleccione una empresa',
      gridSize: 6,
    },
    {
      name: 'representanteEmpresa',
      label: 'Representante de la Empresa',
      type: 'text' as const,
      required: true,
      validations: {
        minLength: {
          value: 2,
          message: 'El representante debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El representante no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'docRepresentanteEmpresa',
      label: 'Documento del Representante',
      type: 'text' as const,
      required: true,
      validations: {
        minLength: {
          value: 5,
          message: 'El documento debe tener al menos 5 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El documento no puede exceder 20 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'nroAcuerdoMarco',
      label: 'Número de Acuerdo Marco',
      type: 'number' as const,
      required: true,
      validations: {
        min: { value: 1, message: 'El número debe ser mayor a 0' },
      },
      gridSize: 6,
    },
    {
      name: 'domicilioLegal',
      label: 'Domicilio Legal',
      type: 'textarea' as const,
      required: true,
      validations: {
        minLength: {
          value: 10,
          message: 'El domicilio debe tener al menos 10 caracteres',
        },
        maxLength: {
          value: 200,
          message: 'El domicilio no puede exceder 200 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'representanteFacultad',
      label: 'Representante de la Facultad',
      type: 'text' as const,
      required: true,
      validations: {
        minLength: {
          value: 2,
          message: 'El representante debe tener al menos 2 caracteres',
        },
        maxLength: {
          value: 100,
          message: 'El representante no puede exceder 100 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'docRepresentanteFacultad',
      label: 'Documento del Representante Facultad',
      type: 'text' as const,
      required: true,
      validations: {
        minLength: {
          value: 5,
          message: 'El documento debe tener al menos 5 caracteres',
        },
        maxLength: {
          value: 20,
          message: 'El documento no puede exceder 20 caracteres',
        },
      },
      gridSize: 6,
    },
    {
      name: 'fechaFirma',
      label: 'Fecha de Firma',
      type: 'date' as const,
      required: true,
      gridSize: 6,
    },
    {
      name: 'fechaCaducidad',
      label: 'Fecha de Caducidad',
      type: 'date' as const,
      required: true,
      gridSize: 6,
    },
  ],
});

// Función para calcular estadísticas de convenios
export const calculateConvenioStats = (
  convenios: ConvenioEmpresaDto[]
): ConvenioStats => {
  const totalConvenios = convenios.length;
  const fechaActual = new Date();

  const conveniosVigentes = convenios.filter(convenio => {
    if (!convenio.fechaCaducidad) return false;
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    return fechaCaducidad > fechaActual;
  }).length;

  const conveniosCaducados = convenios.filter(convenio => {
    if (!convenio.fechaCaducidad) return false;
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    return fechaCaducidad <= fechaActual;
  }).length;

  // Convenios que caducan en los próximos 30 días
  const treintaDias = new Date();
  treintaDias.setDate(treintaDias.getDate() + 30);

  const conveniosPorVencer = convenios.filter(convenio => {
    if (!convenio.fechaCaducidad) return false;
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    return fechaCaducidad > fechaActual && fechaCaducidad <= treintaDias;
  }).length;

  return {
    totalConvenios,
    conveniosVigentes,
    conveniosCaducados,
    conveniosPorVencer,
  };
};

// Función para filtrar convenios
export const filterConvenios = (
  convenios: ConvenioEmpresaDto[],
  filters: ConvenioFilters
): ConvenioEmpresaDto[] => {
  return convenios.filter(convenio => {
    // Filtro por expediente
    if (
      filters.expediente &&
      !convenio.expediente
        ?.toLowerCase()
        .includes(filters.expediente.toLowerCase())
    ) {
      return false;
    }

    // Filtro por empresa
    if (
      filters.empresa &&
      !convenio.nombreEmpresa
        ?.toLowerCase()
        .includes(filters.empresa.toLowerCase())
    ) {
      return false;
    }

    // Filtro por fecha de firma
    if (filters.fechaFirmaDesde && convenio.fechaFirma) {
      const fechaFirma = new Date(convenio.fechaFirma);
      const fechaDesde = new Date(filters.fechaFirmaDesde);
      if (fechaFirma < fechaDesde) return false;
    }

    if (filters.fechaFirmaHasta && convenio.fechaFirma) {
      const fechaFirma = new Date(convenio.fechaFirma);
      const fechaHasta = new Date(filters.fechaFirmaHasta);
      if (fechaFirma > fechaHasta) return false;
    }

    // Filtro por fecha de caducidad
    if (filters.fechaCaducidadDesde && convenio.fechaCaducidad) {
      const fechaCaducidad = new Date(convenio.fechaCaducidad);
      const fechaDesde = new Date(filters.fechaCaducidadDesde);
      if (fechaCaducidad < fechaDesde) return false;
    }

    if (filters.fechaCaducidadHasta && convenio.fechaCaducidad) {
      const fechaCaducidad = new Date(convenio.fechaCaducidad);
      const fechaHasta = new Date(filters.fechaCaducidadHasta);
      if (fechaCaducidad > fechaHasta) return false;
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

// Función para verificar si un convenio está vigente
export const isConvenioVigente = (fechaCaducidad?: string): boolean => {
  if (!fechaCaducidad) return false;
  const fechaActual = new Date();
  const fechaCaducidadDate = new Date(fechaCaducidad);
  return fechaCaducidadDate > fechaActual;
};

// Función para obtener el estado de un convenio
export const getConvenioEstado = (fechaCaducidad?: string): string => {
  if (!fechaCaducidad) return 'Sin fecha de caducidad';

  const fechaActual = new Date();
  const fechaCaducidadDate = new Date(fechaCaducidad);

  if (fechaCaducidadDate > fechaActual) {
    const diasRestantes = Math.ceil(
      (fechaCaducidadDate.getTime() - fechaActual.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diasRestantes <= 30) {
      return `Por vencer (${diasRestantes} días)`;
    }
    return 'Vigente';
  }

  return 'Caducado';
};

// Función para obtener valores por defecto del formulario
export const getDefaultConvenioValues = () => ({
  expediente: '',
  idEmpresa: undefined,
  representanteEmpresa: '',
  docRepresentanteEmpresa: '',
  nroAcuerdoMarco: undefined,
  domicilioLegal: '',
  representanteFacultad: '',
  docRepresentanteFacultad: '',
  fechaFirma: '',
  fechaCaducidad: '',
});

// Metadata para ElementCard
export const getConvenioMetadata = () => [
  { name: 'expediente', label: 'Expediente', type: 'text' as const },
  { name: 'nombreEmpresa', label: 'Empresa', type: 'text' as const },
  {
    name: 'representanteEmpresa',
    label: 'Representante Empresa',
    type: 'text' as const,
  },
  {
    name: 'representanteFacultad',
    label: 'Representante Facultad',
    type: 'text' as const,
  },
  { name: 'fechaFirma', label: 'Fecha de Firma', type: 'date' as const },
  {
    name: 'fechaCaducidad',
    label: 'Fecha de Caducidad',
    type: 'date' as const,
  },
];

// Función para obtener el título de la tarjeta
export const getConvenioCardTitle = (convenio: ConvenioEmpresaDto) => {
  return convenio.expediente || 'Sin expediente';
};

// Función para obtener el subtítulo de la tarjeta
export const getConvenioCardSubtitle = (convenio: ConvenioEmpresaDto) => {
  return convenio.nombreEmpresa || 'Sin empresa asignada';
};
