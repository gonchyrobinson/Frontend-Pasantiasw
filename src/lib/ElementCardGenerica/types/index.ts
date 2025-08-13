import { FieldType } from '../../FormularioGenerico/types';

export interface FieldMetadata {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
}

export interface ElementCardProps {
  metadata: FieldMetadata[];
  data: Record<string, unknown>;
  onClick?: () => void;
  onClickEdit?: () => void;
  onClickEliminar?: () => void;
  title?: string;
  subtitle?: string;
  extraButtons?: Array<{
    label: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: React.ReactNode;
  }>;
}

// Stats Component Types
export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
}

export interface StatData {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color?: 'primary' | 'success' | 'error' | 'warning' | 'info';
}

export interface DistributionData {
  [key: string]: number;
}

export interface DistributionSection {
  title: string;
  data: DistributionData;
}

export interface StatsProps {
  title: string;
  titleIcon: React.ReactNode;
  stats: StatData[];
  distributions?: DistributionSection[];
}

// Grids Component Types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GridsProps<T = any> {
  items: T[];
  metadata: FieldMetadata[];
  getCardTitle: (item: T) => string;
  getCardSubtitle: (item: T) => string;
  onItemClick?: (item: T) => void;
  onItemEdit?: (item: T) => void;
  onItemDelete?: (item: T) => void;
  getExtraButtons?: (item: T) => Array<{
    label: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: React.ReactNode;
  }>;
  emptyStateTitle: string;
  emptyStateText: string;
}

// Advanced Search Form Types
export interface AdvancedSearchFormProps {
  metadata: {
    title: string;
    fields: FieldMetadata[];
    submitButtonText: string;
    cancelButtonText?: string;
  };
  onSubmit: (filters: Record<string, any>) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onCancel?: () => void;
  onClear?: () => void;
  initialValues?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  loading?: boolean;
  dynamicDropdownOptions?: Record<
    string,
    Array<{ value: string | number; label: string }>
  >;
}

// Search Dialog Types
export interface SearchDialogProps {
  title: string;
  buttonText: string;
  metadata: AdvancedSearchFormProps['metadata'];
  onSubmit: (filters: Record<string, any>) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClearResults?: () => void;
  hasResults?: boolean;
  dynamicDropdownOptions?: Record<
    string,
    Array<{ value: string | number; label: string }>
  >;
  loading?: boolean;
}

// Module Header Types
export interface ModuleHeaderProps {
  title: string;
  subtitle: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
  onAction?: () => void;
  actionButtonText?: string;
}

// Searchable Content Types
export interface SearchableContentProps {
  hasSearched: boolean;
  searchResults: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  isLoading?: boolean;
  isRefreshing?: boolean;
  emptyStateTitle: string;
  emptyStateText: string;
  noResultsTitle: string;
  noResultsText: string;
  loadingMessage: string;
  children: React.ReactNode;
  statsComponent?: React.ReactNode;
}
