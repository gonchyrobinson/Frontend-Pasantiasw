import { EstudianteDto } from '../types';

// Carreras válidas según el backend
export const CARRERAS_VALIDAS = [
  'AGRIMENSURA',
  'INGENIERÍA AZUCARERA',
  'INGENIERÍA BIOMÉDICA',
  'INGENIERÍA CIVIL',
  'INGENIERÍA EN COMPUTACIÓN',
  'INGENIERÍA EN INFORMÁTICA',
  'INGENIERÍA ELÉCTRICA',
  'INGENIERÍA ELECTRÓNICA',
  'INGENIERÍA GEODÉSICA Y GEOFÍSICA',
  'INGENIERÍA INDUSTRIAL',
  'INGENIERÍA MECÁNICA',
  'INGENIERÍA QUÍMICA',
  'LICENCIATURA EN FÍSICA',
  'LICENCIATURA EN MATEMÁTICA',
  'LICENCIATURA EN INFORMÁTICA',
  'DISEÑO DE ILUMINACIÓN',
  'PROGRAMADOR UNIVERSITARIO',
  'TECNICATURA UNIVERSITARIA EN TECNOLOGÍA',
  'AZUCARERA E INDUSTRIAS DERIVADAS',
  'TECNICATURA UNIVERSITARIA EN FÍSICA',
  'TECNICATURA UNIVERSITARIA EN FÍSICA AMBIENTAL',
  'OTRA',
] as const;

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
      type: 'dropdown' as const,
      options: CARRERAS_VALIDAS.map(carrera => ({
        value: carrera,
        label: carrera,
      })),
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
