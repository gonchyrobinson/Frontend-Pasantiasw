// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface PagosDto {
  idPago: number;
  idPasantia?: number;
  pagado?: boolean;
  fechaPago?: string; // DateOnly se maneja como string en frontend
  fechaVencimiento?: string;
  monto?: number;
  observaciones?: string;

  // Campos adicionales de navegación
  tramiteSudocu?: string;
  nombreEstudiante?: string;
  nombreEmpresa?: string;
}

// DTO para creación - omite el ID y pagado que son manejados por el backend
export type CreatePagosDto = Omit<PagosDto, 'idPago' | 'pagado'>;

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

export interface PagosStatsProps {
  stats: PagosStats;
  loading: boolean;
}
