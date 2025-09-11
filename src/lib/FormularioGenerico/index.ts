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

// Nota: Las validaciones se definen directamente inline en cada helper de módulo
// No se necesitan funciones helper adicionales para validaciones
