import { GridSortModel, GridFilterModel } from '@mui/x-data-grid';
import { FieldType } from '../../FormularioGenerico/types';
import { FieldMetadata } from '../../ElementCardGenerica/types';

export interface ColumnMetadata {
  name: string;
  label: string;
  type: FieldType;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (value: unknown) => React.ReactNode;
}

export interface TablaGenericaProps {
  columns?: ColumnMetadata[];
  data: Record<string, unknown>[];
  title?: string;
  subtitle?: string;
  loading?: boolean;
  onRowClick?: (row: Record<string, unknown>) => void;
  onRowEdit?: (row: Record<string, unknown>) => void;
  onRowDelete?: (row: Record<string, unknown>) => void;
  extraButtons?: Array<{
    label: string;
    onClick: (row: Record<string, unknown>) => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: React.ReactNode;
  }>;
  pageSize?: number;
  pageSizeOptions?: number[];
  disableSelection?: boolean;
  disableSorting?: boolean;
  disableFiltering?: boolean;
  emptyStateTitle?: string;
  emptyStateText?: string;
  initialSortModel?: GridSortModel;
  initialFilterModel?: GridFilterModel;
  metadata?: FieldMetadata[]; // Para compatibilidad con ElementCardGenerica

  // Nuevas propiedades para el header de página
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onPageAction?: () => void;
  pageActionText?: string;
  headerVariant?: 'default' | 'compact' | 'detailed' | 'page';
}

export interface TablaGenericaState {
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
  pageSize: number;
}
