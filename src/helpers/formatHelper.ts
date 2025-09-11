/**
 * Helper centralizado para formateo y detección de tipos
 *
 * Contiene funciones utilitarias para:
 * - Formateo de fechas en diferentes formatos
 * - Formateo de monedas y números
 * - Detección automática de tipos de datos
 * - Parsing seguro de números y fechas
 * - Validaciones de tipos
 */

// ==================== CONSTANTES ====================

/**
 * Configuración de localización para Argentina
 */
export const LOCALE_AR = 'es-AR';

/**
 * Configuración de moneda argentina
 */
export const CURRENCY_CONFIG = {
  style: 'currency' as const,
  currency: 'ARS',
};

// ==================== FORMATEO DE FECHAS ====================

/**
 * Formatea una fecha para mostrar en formato argentino (dd/mm/yyyy)
 *
 * @param dateValue - Valor de fecha (string, number, Date, o cualquier tipo)
 * @returns Fecha formateada en formato dd/mm/yyyy o '-' si es inválida
 */
export const formatDate = (dateValue: unknown): string => {
  try {
    if (!dateValue) return '-';
    const date = new Date(dateValue as string | number | Date);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString(LOCALE_AR);
  } catch {
    return '-';
  }
};

/**
 * Formatea una fecha para mostrar en formato argentino con fallback personalizado
 *
 * @param dateValue - Valor de fecha (string, number, Date, o cualquier tipo)
 * @param fallback - Valor a mostrar si la fecha es inválida (por defecto 'N/A')
 * @returns Fecha formateada o valor de fallback
 */
export const formatDateWithFallback = (
  dateValue: unknown,
  fallback = 'N/A'
): string => {
  try {
    if (!dateValue) return fallback;
    const date = new Date(dateValue as string | number | Date);
    if (isNaN(date.getTime())) return fallback;
    return date.toLocaleDateString(LOCALE_AR);
  } catch {
    return fallback;
  }
};

// ==================== FORMATEO DE NÚMEROS Y MONEDAS ====================

/**
 * Formatea un valor numérico como moneda argentina (ARS)
 *
 * @param value - Valor numérico a formatear (number, string, o cualquier tipo)
 * @returns Valor formateado como moneda ($X.XXX,XX) o el valor original si no es numérico
 */
export const formatCurrency = (value: unknown): string => {
  try {
    const numValue = parseFloat(String(value));
    if (isNaN(numValue)) return String(value);
    return new Intl.NumberFormat(LOCALE_AR, CURRENCY_CONFIG).format(numValue);
  } catch {
    return String(value);
  }
};

/**
 * Formatea un valor numérico como moneda con fallback personalizado
 *
 * @param value - Valor numérico a formatear
 * @param fallback - Valor a mostrar si no es numérico (por defecto 'N/A')
 * @returns Valor formateado como moneda o valor de fallback
 */
export const formatCurrencyWithFallback = (
  value: unknown,
  fallback = 'N/A'
): string => {
  try {
    if (value === null || value === undefined) return fallback;
    const numValue = parseFloat(String(value));
    if (isNaN(numValue)) return fallback;
    return new Intl.NumberFormat(LOCALE_AR, CURRENCY_CONFIG).format(numValue);
  } catch {
    return fallback;
  }
};

/**
 * Formatea un número con separadores de miles
 *
 * @param value - Valor numérico a formatear
 * @param fallback - Valor a mostrar si no es numérico (por defecto 'N/A')
 * @returns Número formateado con separadores de miles o valor de fallback
 */
export const formatNumber = (value: unknown, fallback = 'N/A'): string => {
  try {
    if (value === null || value === undefined) return fallback;
    const numValue =
      typeof value === 'string' ? parseFloat(value) : Number(value);
    if (isNaN(numValue)) return fallback;
    return numValue.toLocaleString(LOCALE_AR);
  } catch {
    return fallback;
  }
};

// ==================== PARSING SEGURO ====================

/**
 * Parsea un string a número de forma segura
 *
 * @param value - Valor a parsear
 * @param defaultValue - Valor por defecto si el parsing falla (por defecto null)
 * @returns Número parseado o valor por defecto
 */
export const safeParseInt = (
  value: unknown,
  defaultValue: number | null = null
): number | null => {
  try {
    if (value === null || value === undefined) return defaultValue;
    const parsed = parseInt(String(value), 10);
    return isNaN(parsed) ? defaultValue : parsed;
  } catch {
    return defaultValue;
  }
};

/**
 * Parsea un string a float de forma segura
 *
 * @param value - Valor a parsear
 * @param defaultValue - Valor por defecto si el parsing falla (por defecto null)
 * @returns Float parseado o valor por defecto
 */
export const safeParseFloat = (
  value: unknown,
  defaultValue: number | null = null
): number | null => {
  try {
    if (value === null || value === undefined) return defaultValue;
    const parsed = parseFloat(String(value));
    return isNaN(parsed) ? defaultValue : parsed;
  } catch {
    return defaultValue;
  }
};

// ==================== DETECCIÓN DE TIPOS ====================

/**
 * Detecta automáticamente el tipo de un valor basándose en su contenido
 *
 * NOTA: Esta detección es básica y puede no cubrir todos los casos edge.
 * Para mayor precisión, especificar el tipo explícitamente.
 *
 * @param value - Valor del cual detectar el tipo
 * @returns Tipo detectado como string ('boolean', 'number', 'date', 'email', 'string')
 */
export const detectType = (value: unknown): string => {
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') {
    // Detectar fechas en formato ISO (YYYY-MM-DD) o similar
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return 'date';
    // Detectar emails básicos (contiene @ y .)
    if (value.includes('@') && value.includes('.')) return 'email';
  }
  return 'string';
};

// ==================== VALIDACIONES ====================

/**
 * Verifica si un valor es una fecha válida
 *
 * @param value - Valor a verificar
 * @returns true si es una fecha válida, false en caso contrario
 */
export const isValidDate = (value: unknown): boolean => {
  try {
    if (!value) return false;
    const date = new Date(value as string | number | Date);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
};

/**
 * Verifica si un valor es un número válido
 *
 * @param value - Valor a verificar
 * @returns true si es un número válido, false en caso contrario
 */
export const isValidNumber = (value: unknown): boolean => {
  try {
    if (value === null || value === undefined) return false;
    const numValue =
      typeof value === 'string' ? parseFloat(value) : Number(value);
    return !isNaN(numValue) && isFinite(numValue);
  } catch {
    return false;
  }
};

// ==================== FORMATEO AUTOMÁTICO ====================

/**
 * Formatea un valor automáticamente según su tipo detectado
 *
 * @param value - Valor a formatear
 * @param type - Tipo específico (opcional, se detecta automáticamente si no se proporciona)
 * @returns Valor formateado según su tipo
 */
export const formatValueAuto = (value: unknown, type?: string): string => {
  if (value === null || value === undefined) return '-';

  const valueType = type || detectType(value);

  switch (valueType) {
    case 'date':
      return formatDate(value);
    case 'currency':
      return formatCurrency(value);
    case 'number':
      return formatNumber(value);
    case 'boolean':
      return value ? 'Sí' : 'No';
    case 'email':
      return String(value);
    default:
      return String(value);
  }
};

/**
 * Formatea un valor según metadata de campo específica
 *
 * Esta función actúa como un adapter entre componentes que usan metadata de campo
 * y el sistema de formateo centralizado, permitiendo usar estructuras de metadata
 * específicas mientras aprovecha las funciones de formateo centralizadas.
 *
 * @param value - Valor a formatear (puede ser cualquier tipo)
 * @param field - Metadata de campo que contiene información de tipo
 * @returns Cadena formateada lista para mostrar al usuario
 */
export const formatValue = (
  value: unknown,
  field: { type?: string }
): string => {
  return formatValueAuto(value, field.type);
};
