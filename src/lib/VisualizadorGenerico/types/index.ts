export type FieldDisplayType =
  | 'text'
  | 'email'
  | 'phone'
  | 'currency'
  | 'number'
  | 'date'
  | 'datetime'
  | 'boolean'
  | 'badge'
  | 'link'
  | 'image'
  | 'json'
  | 'list'
  | 'custom';

export interface BadgeConfig {
  variant?: 'filled' | 'outlined';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  size?: 'small' | 'medium';
}

export interface LinkConfig {
  href?: string;
  target?: '_blank' | '_self';
  external?: boolean;
}

export interface FieldDisplayMetadata {
  name: string;
  label: string;
  type: FieldDisplayType;
  gridSize?: number;
  format?: string; // Para fechas, números, etc.
  prefix?: string; // Para monedas, símbolos, etc.
  suffix?: string;
  fallback?: string; // Valor por defecto si el campo está vacío
  hidden?: boolean;

  // Configuración específica por tipo
  badgeConfig?: BadgeConfig;
  linkConfig?: LinkConfig;

  // Para renderizado personalizado
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, data: Record<string, any>) => React.ReactNode;
}

export interface SectionMetadata {
  title?: string;
  subtitle?: string;
  fields: FieldDisplayMetadata[];
  collapsible?: boolean;
  defaultExpanded?: boolean;
  gridContainer?: boolean;
}

export interface DisplayMetadata {
  title?: string;
  subtitle?: string;
  sections: SectionMetadata[];
  showCopyButton?: boolean;
  showPrintButton?: boolean;
  showEditButton?: boolean;
  editButtonText?: string;
  onEdit?: () => void;
}

export interface VisualizadorGenericoProps {
  metadata: DisplayMetadata;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

// Tipos auxiliares para diferentes formatos
export interface CurrencyFormat {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface DateFormat {
  format?: 'short' | 'medium' | 'long' | 'full' | string;
  locale?: string;
  includeTime?: boolean;
}

export interface NumberFormat {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
}
