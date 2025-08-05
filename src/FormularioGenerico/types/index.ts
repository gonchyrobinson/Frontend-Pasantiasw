// Tipos para el sistema de formularios genéricos

export type FieldType =
  | 'text'
  | 'password'
  | 'email'
  | 'currency'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'dropdown'
  | 'dynamicDropdown'
  | 'textarea';

export type DropdownOption = {
  value: string | number;
  label: string;
};

export type ValidationRule = {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
};

export type FieldMetadata = {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  readonly?: boolean;
  validations?: ValidationRule;
  options?: DropdownOption[]; // Para dropdowns estáticos
  dependsOn?: string; // Campo del cual depende (para dropdowns dinámicos)
  gridSize?: number; // Tamaño en grid (1-12)
};

export type FormMetadata = {
  fields: FieldMetadata[];
  title?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
};

export type DynamicDropdownOptions = {
  [fieldName: string]: DropdownOption[];
};

export type GenericFormProps = {
  metadata: FormMetadata;
  onSubmit: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  initialValues?: Record<string, unknown>;
  onChange?: (data: Record<string, unknown>) => void;
  dynamicDropdownOptions?: DynamicDropdownOptions;
  loading?: boolean;
};
