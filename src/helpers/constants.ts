/**
 * Constantes globales del sistema de Acuerdos Individuales
 *
 * Centraliza todas las constantes que se usan en múltiples módulos
 * para evitar dependencias cruzadas y duplicación.
 */

// ==================== CARRERAS ACADÉMICAS ====================

/**
 * Lista de carreras válidas según el backend
 * Utilizada en formularios de estudiantes y filtros de búsqueda
 */
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

// ==================== TIPOS DE ACUERDO ====================

/**
 * Lista de tipos de acuerdo válidos para Acuerdos Individuales
 * Utilizada en formularios de Acuerdos Individuales y filtros de búsqueda
 */
export const TIPOS_ACUERDO_VALIDOS = [
  { value: 'Pasantia', label: 'Pasantía' },
  { value: 'PPS', label: 'PPS' },
  { value: 'otro', label: 'Otro' },
] as const;

/**
 * Lista de tipos de acuerdo válidos para convenios
 * Basada en AppConstants.ConvenioTipoAcuerdoPermitidos del backend
 * Utilizada en formularios de convenios
 */
export const TIPOS_ACUERDO_CONVENIO_VALIDOS = [
  {
    value: 'Carta Acuerdo de Cooperación y Asistencia Técnica',
    label: 'Carta Acuerdo de Cooperación y Asistencia Técnica',
  },
  { value: 'Pasantías y PPS', label: 'Pasantías y PPS' },
  { value: 'otro', label: 'Otro' },
] as const;

// ==================== UTILIDADES DE CARRERAS ====================

/**
 * Genera opciones de dropdown para carreras válidas
 * Utilizada en formularios de estudiantes y filtros de búsqueda
 *
 * @returns Array de opciones formateadas para dropdowns
 */
export const getCarrerasOptions = () =>
  CARRERAS_VALIDAS.map(carrera => ({
    value: carrera,
    label: carrera,
  }));
