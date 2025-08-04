import { Convenio, Pasantia, Pago } from '../../../types';

export interface StatItem {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  loading: boolean;
  error: boolean;
  trend: string;
  trendDirection: 'up' | 'down';
}

export interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

export interface SpeedDialAction {
  icon: React.ReactNode;
  name: string;
  action: () => void;
}

export interface ProgressItem {
  label: string;
  value: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

export interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

export interface ProgressSectionProps {
  title: string;
  items: ProgressItem[];
}

export interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  loading?: boolean;
  error?: boolean;
  trend: string;
  trendDirection: 'up' | 'down';
}

export interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  statusLabel?: string;
  statusColor?: 'success' | 'error' | 'warning' | 'info';
}

export interface InicioData {
  conveniosData: Convenio[] | undefined;
  pasantiasData: Pasantia[] | undefined;
  pagosData: Pago[] | undefined;
  conveniosLoading: boolean;
  pasantiasLoading: boolean;
  pagosLoading: boolean;
  conveniosError: boolean;
  pasantiasError: boolean;
  pagosError: boolean;
}
