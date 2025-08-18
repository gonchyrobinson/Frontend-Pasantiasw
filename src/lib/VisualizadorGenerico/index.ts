// Componente principal
export { default as VisualizadorGenerico } from './components/VisualizadorGenerico';

// Componentes de campo individuales
export {
  TextDisplayField,
  EmailDisplayField,
  PhoneDisplayField,
  CurrencyDisplayField,
  NumberDisplayField,
  DateDisplayField,
  BooleanDisplayField,
  BadgeDisplayField,
  LinkDisplayField,
  ImageDisplayField,
  JsonDisplayField,
  ListDisplayField,
  CustomDisplayField,
} from './components/FieldDisplayComponents';

// Tipos
export type {
  FieldDisplayType,
  FieldDisplayMetadata,
  SectionMetadata,
  DisplayMetadata,
  VisualizadorGenericoProps,
  BadgeConfig,
  LinkConfig,
  CurrencyFormat,
  DateFormat,
  NumberFormat,
} from './types';
