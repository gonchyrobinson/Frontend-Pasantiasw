import { FieldMetadata } from '../types';

export const formatValue = (value: unknown, field: FieldMetadata): string => {
  if (value === null || value === undefined) return '-';

  // Auto-detect type if not specified
  const fieldType = field.type || detectType(value);

  switch (fieldType) {
    case 'date':
      return formatDate(value);
    case 'currency':
      return formatCurrency(value);
    case 'number':
      return typeof value === 'number'
        ? value.toLocaleString()
        : value.toString();
    case 'boolean':
      return value ? 'Sí' : 'No';
    case 'email':
      return value.toString();
    default:
      return value.toString();
  }
};

export const detectType = (value: unknown): string => {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') {
    // Check if it's a date (ISO format or date-like)
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return 'date';
    // Check if it's an email
    if (value.includes('@') && value.includes('.')) return 'email';
  }
  return 'string';
};

export const formatDate = (dateValue: unknown): string => {
  try {
    const date = new Date(dateValue as string | number | Date);
    return date.toLocaleDateString('es-AR');
  } catch {
    return String(dateValue);
  }
};

export const formatCurrency = (value: unknown): string => {
  const numValue = parseFloat(String(value));
  if (isNaN(numValue)) return String(value);
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(numValue);
};
