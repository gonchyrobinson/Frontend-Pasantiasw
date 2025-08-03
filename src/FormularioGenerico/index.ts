// Exportaciones principales del sistema de formularios genéricos
export { default as FormularioGenerico } from './components/FormularioGenerico';

// Componentes de campos individuales
export { default as TextField } from './components/TextField';
export { default as EmailField } from './components/EmailField';
export { default as CurrencyField } from './components/CurrencyField';
export { default as DateField } from './components/DateField';
export { default as CheckboxField } from './components/CheckboxField';
export { default as DropdownField } from './components/DropdownField';
export { default as DynamicDropdownField } from './components/DynamicDropdownField';
export { default as NumberField } from './components/NumberField';

// Tipos
export type {
  FieldType,
  DropdownOption,
  ValidationRule,
  FieldMetadata,
  FormMetadata,
  DynamicDropdownOptions,
  GenericFormProps,
} from './types';

// Helpers
export {
  createEmailValidation,
  createRequiredValidation,
  createMinLengthValidation,
  createMaxLengthValidation,
  createNumberRangeValidation,
} from './helpers/validationHelpers';

export {
  createDropdownOptions,
  createTextField,
  createEmailField,
  createDateField,
  createCurrencyField,
  createDropdownField,
  createDynamicDropdownField,
  createConvenioFormMetadata,
  createEmpresaFormMetadata,
  createEstudianteFormMetadata,
} from './helpers/formMetadataHelpers';
