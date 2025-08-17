// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface PagosDto {
  idPago: number;
  idPasantia?: number;
  pagado?: boolean;
  fechaPago?: string; // DateOnly se maneja como string en frontend
  fechaVencimiento?: string;
  monto?: number;
  observaciones?: string;
}

// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface CreatePagosDto {
  idPasantia?: number;
  fechaPago?: string;
  fechaVencimiento?: string;
  monto?: number;
  observaciones?: string;
}

// Tipos para formularios
export type PagosFormData = CreatePagosDto;

// DTO para marcar pago como pagado - camelCase
export interface MarcarPagoDto {
  idPago: number;
  fechaPago?: string;
}

// DTO para filtros de búsqueda - camelCase
export interface PagosBusquedaAvanzadaDto {
  idPasantia?: number;
  fechaPagoDesde?: string;
  fechaPagoHasta?: string;
  fechaVencimientoDesde?: string;
  fechaVencimientoHasta?: string;
  pagado?: boolean;
  montoMin?: number;
  montoMax?: number;
}

// Tipos para filtros locales (para compatibilidad)
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
