import { FieldMetadata, DropdownOption } from '../types';
import {
  createEmailValidation,
  createRequiredValidation,
} from './validationHelpers';

// Helper para crear opciones de dropdown
export const createDropdownOptions = (
  items: Array<{ id: string | number; name: string }>
): DropdownOption[] => {
  return items.map(item => ({
    value: item.id,
    label: item.name,
  }));
};

// Helper para crear metadata de campos comunes
export const createTextField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'text',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createEmailField = (
  name = 'email',
  label = 'Email',
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'email',
  gridSize,
  validations: createEmailValidation(),
});

export const createDateField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'date',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createCurrencyField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'currency',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createDropdownField = (
  name: string,
  label: string,
  options: DropdownOption[],
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'dropdown',
  options,
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createDynamicDropdownField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'dynamicDropdown',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});
