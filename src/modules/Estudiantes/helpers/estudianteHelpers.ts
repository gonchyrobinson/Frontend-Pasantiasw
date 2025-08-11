import { FieldMetadata } from '../../../lib/ElementCardGenerica';
import { EstudianteDto } from '../types';

export const getEstudianteMetadata = (): FieldMetadata[] => [
  { name: 'apellido', label: 'Apellido', type: 'text' },
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'documento', label: 'Documento', type: 'text' },
  { name: 'domicilio', label: 'Domicilio', type: 'text' },
  { name: 'libreta', label: 'Libreta', type: 'text' },
  { name: 'telefono', label: 'Teléfono', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'carrera', label: 'Carrera', type: 'text' },
  { name: 'universidad', label: 'Universidad', type: 'text' },
  { name: 'estado', label: 'Estado', type: 'text' },
];

export const getCreacionEstudianteMetadata = () => ({
  title: 'Crear Nuevo Estudiante',
  submitButtonText: 'Crear Estudiante',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'apellido',
      label: 'Apellido',
      type: 'text' as const,
      validations: {
        required: 'El apellido es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'nombre',
      label: 'Nombre',
      type: 'text' as const,
      validations: {
        required: 'El nombre es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'documento',
      label: 'Documento',
      type: 'text' as const,
      validations: {
        required: 'El documento es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'domicilio',
      label: 'Domicilio',
      type: 'text' as const,
      validations: {
        required: 'El domicilio es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'libreta',
      label: 'Libreta',
      type: 'text' as const,
      validations: {
        required: 'La libreta es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'carrera',
      label: 'Carrera',
      type: 'text' as const,
      validations: {
        required: 'La carrera es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'areaTrabajo',
      label: 'Área de Trabajo',
      type: 'text' as const,
      validations: {
        required: 'El área de trabajo es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email' as const,
      validations: {
        required: 'El email es requerido',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Formato de email inválido',
        },
      },
      gridSize: 12,
    },
  ],
});

export const getEdicionEstudianteMetadata = () => ({
  ...getCreacionEstudianteMetadata(),
  title: 'Editar Estudiante',
  submitButtonText: 'Actualizar Estudiante',
});

export const getEstudianteCardTitle = (estudiante: EstudianteDto): string => {
  return `${estudiante.apellido}, ${estudiante.nombre}`;
};

export const getEstudianteCardSubtitle = (
  estudiante: EstudianteDto
): string => {
  return `${estudiante.carrera} - ${estudiante.areaTrabajo}`;
};

export const filterEstudiantes = (
  estudiantes: EstudianteDto[],
  searchText: string
): EstudianteDto[] => {
  if (!searchText.trim()) return estudiantes;
  const search = searchText.toLowerCase();
  return estudiantes.filter(
    estudiante =>
      estudiante.apellido.toLowerCase().includes(search) ||
      estudiante.nombre.toLowerCase().includes(search) ||
      estudiante.documento.toLowerCase().includes(search) ||
      estudiante.carrera.toLowerCase().includes(search) ||
      estudiante.areaTrabajo.toLowerCase().includes(search) ||
      estudiante.email.toLowerCase().includes(search)
  );
};

export const groupEstudiantesByCarrera = (estudiantes: EstudianteDto[]) => {
  return estudiantes.reduce(
    (groups, estudiante) => {
      const carrera = estudiante.carrera;
      if (!groups[carrera]) groups[carrera] = [];
      groups[carrera].push(estudiante);
      return groups;
    },
    {} as Record<string, EstudianteDto[]>
  );
};

export const getEstudiantesStats = (estudiantes: EstudianteDto[]) => {
  const total = estudiantes.length;
  const porCarrera = estudiantes.reduce(
    (acc, estudiante) => {
      acc[estudiante.carrera] = (acc[estudiante.carrera] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const porAreaTrabajo = estudiantes.reduce(
    (acc, estudiante) => {
      acc[estudiante.areaTrabajo] = (acc[estudiante.areaTrabajo] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return { total, porCarrera, porAreaTrabajo };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processEstudiantesResponse = (response: any): EstudianteDto[] => {
  if (!response) return [];
  return Array.isArray(response)
    ? response
    : response?.data && Array.isArray(response.data)
      ? response.data
      : [];
};

export const applyEstudiantesFilters = (
  estudiantes: EstudianteDto[],
  searchText: string,
  carreraFilter: string,
  areaTrabajoFilter: string
): EstudianteDto[] => {
  let filtered = filterEstudiantes(estudiantes, searchText);

  if (carreraFilter.trim()) {
    const carreraSearch = carreraFilter.toLowerCase();
    filtered = filtered.filter(e =>
      e.carrera.toLowerCase().includes(carreraSearch)
    );
  }

  if (areaTrabajoFilter.trim()) {
    const areaSearch = areaTrabajoFilter.toLowerCase();
    filtered = filtered.filter(e =>
      e.areaTrabajo.toLowerCase().includes(areaSearch)
    );
  }

  return filtered;
};

export const getEstudianteSearchFields = (): FieldMetadata[] => [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'apellido', label: 'Apellido', type: 'text' },
  { name: 'carrera', label: 'Carrera', type: 'text' },
  { name: 'areaTrabajo', label: 'Área de Trabajo', type: 'text' },
];
