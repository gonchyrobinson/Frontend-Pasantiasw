import { Vigencia, TipoContrato } from '../types';

export const getCreacionEmpresaMetadata = () => ({
  title: 'Crear Nueva Empresa',
  submitButtonText: 'Crear Empresa',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'nombre',
      label: 'Nombre de la Empresa',
      type: 'text' as const,
      validations: {
        required: 'El nombre es requerido',
        minLength: {
          value: 2,
          message: 'El nombre debe tener al menos 2 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'vigencia',
      label: 'Vigencia',
      type: 'dropdown' as const,
      options: [
        { value: Vigencia.Vigente, label: 'Vigente' },
        { value: Vigencia.NoVigente, label: 'No Vigente' },
      ],
      validations: {
        required: 'La vigencia es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'tipoContrato',
      label: 'Tipo de Contrato',
      type: 'dropdown' as const,
      options: [
        { value: TipoContrato.Indefinido, label: 'Indefinido' },
        { value: TipoContrato.Temporal, label: 'Temporal' },
        { value: TipoContrato.Otro, label: 'Otro' },
      ],
      validations: {
        required: 'El tipo de contrato es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'fechaInicio',
      label: 'Fecha de Inicio',
      type: 'date' as const,
      validations: {
        required: 'La fecha de inicio es requerida',
      },
      gridSize: 6,
    },
    {
      name: 'fechaFin',
      label: 'Fecha de Fin',
      type: 'date' as const,
      gridSize: 6,
    },
    {
      name: 'encargado',
      label: 'Encargado',
      type: 'text' as const,
      validations: {
        required: 'El encargado es requerido',
      },
      gridSize: 6,
    },
    {
      name: 'celular',
      label: 'Celular',
      type: 'text' as const,
      validations: {
        required: 'El celular es requerido',
        pattern: {
          value: /^[0-9+\-\s()]+$/,
          message: 'Formato de celular inválido',
        },
      },
      gridSize: 6,
    },
    {
      name: 'correoElectronico',
      label: 'Correo Electrónico',
      type: 'email' as const,
      validations: {
        required: 'El correo electrónico es requerido',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Formato de correo electrónico inválido',
        },
      },
      gridSize: 6,
    },
    {
      name: 'sudocu',
      label: 'SUDOCU',
      type: 'date' as const,
      gridSize: 6,
    },
  ],
});

export const getEdicionEmpresaMetadata = () => ({
  ...getCreacionEmpresaMetadata(),
  title: 'Editar Empresa',
  submitButtonText: 'Actualizar Empresa',
});
