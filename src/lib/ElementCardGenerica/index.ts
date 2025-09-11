export { default as ElementCard } from './components/ElementCard';
export { default as Stats } from './components/Stats';
export { default as Grids } from './components/Grids';
export { default as AdvancedSearchForm } from './components/AdvancedSearchForm';
export { default as SearchDialog } from './components/SearchDialog';
export { default as ModuleHeader } from './components/ModuleHeader';
export { default as SearchableContent } from './components/SearchableContent';
export type {
  ElementCardProps,
  FieldMetadata,
  StatsProps,
  StatCardProps,
  StatData,
  DistributionData,
  DistributionSection,
  GridsProps,
  AdvancedSearchFormProps,
  SearchDialogProps,
  ModuleHeaderProps,
  SearchableContentProps,
} from './types';
// Funciones específicas de ElementCard
export { formatValue } from '../../helpers/formatHelper';

// Re-exportar funciones del helper centralizado para compatibilidad
export {
  detectType,
  formatDate,
  formatCurrency,
} from '../../helpers/formatHelper';
