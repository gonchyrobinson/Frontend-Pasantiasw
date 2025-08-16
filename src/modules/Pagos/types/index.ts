// DTOs del backend
export interface PagosDto {
  idPago: number;
  idPasantia: number;
  monto: number;
  fechaPago: string;
  numeroReferencia: string;
  observaciones?: string;
  [key: string]: unknown;
}

export interface CreatePagosDto {
  idPasantia: number;
  monto: number;
  fechaPago: string;
  numeroReferencia: string;
  observaciones?: string;
  [key: string]: unknown;
}

// Tipos para formularios
export type PagosFormData = CreatePagosDto;

// Tipos para filtros y búsqueda
export interface PagosFilters {
  idPasantia?: string;
  fechaPagoDesde?: string;
  fechaPagoHasta?: string;
  fechaVencimientoDesde?: string;
  fechaVencimientoHasta?: string;
  montoMin?: number;
  montoMax?: number;
}

// Tipos para estadísticas
export interface PagosStats {
  totalPagos: number;
  pagosVigentes: number;
  pagosVencidos: number;
  montoTotal: number;
}

// Tipos para acciones
export interface PagosActions {
  onEdit: (pago: PagosDto) => void;
  onDelete: (pago: PagosDto) => void;
}

// Tipos para componentes
export interface PagosCardProps {
  pago: PagosDto;
  onEdit: () => void;
  onDelete: () => void;
}

export interface PagosGridProps {
  pagos: PagosDto[];
  loading: boolean;
  onEdit: (pago: PagosDto) => void;
  onDelete: (pago: PagosDto) => void;
}

export interface PagosStatsProps {
  stats: PagosStats;
  loading: boolean;
}
