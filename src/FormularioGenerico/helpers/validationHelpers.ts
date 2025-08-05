import { ValidationRule } from '../types';

export const createEmailValidation = (): ValidationRule => ({
  required: 'Email es requerido',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email inválido',
  },
});

export const createRequiredValidation = (
  fieldName: string
): ValidationRule => ({
  required: `${fieldName} es requerido`,
});

export const createMinLengthValidation = (
  min: number,
  fieldName: string
): ValidationRule => ({
  minLength: {
    value: min,
    message: `${fieldName} debe tener al menos ${min} caracteres`,
  },
});

export const createMaxLengthValidation = (
  max: number,
  fieldName: string
): ValidationRule => ({
  maxLength: {
    value: max,
    message: `${fieldName} no puede tener más de ${max} caracteres`,
  },
});

export const createNumberRangeValidation = (
  min?: number,
  max?: number
): ValidationRule => {
  const validation: ValidationRule = {};

  if (min !== undefined) {
    validation.min = {
      value: min,
      message: `El valor debe ser mayor o igual a ${min}`,
    };
  }

  if (max !== undefined) {
    validation.max = {
      value: max,
      message: `El valor debe ser menor o igual a ${max}`,
    };
  }

  return validation;
};
