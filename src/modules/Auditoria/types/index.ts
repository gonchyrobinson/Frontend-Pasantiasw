// DTO unificado - camelCase (compatible con model binding de ASP.NET Core)
export interface AuditoriaDto {
  idAuditoria: number;
  idUsuario?: number;
  tablaAfectada?: string;
  tipoOperacion?: string;
  datosAnteriores?: string;
  datosNuevos?: string;
  fechaOperacion?: string;
  funcionLlamada?: string;
  usuarioNombre?: string;
}

export interface AuditoriaBuscarDto {
  fechaDesde?: string;
  fechaHasta?: string;
  usuarioNombre?: string;
  accion?: string;
}

// Tipos para componentes
export interface AuditoriaFiltersProps {
  onSearchResults: (auditorias: AuditoriaDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

export interface AuditoriaTablaProps {
  auditorias: AuditoriaDto[];
  loading?: boolean;
  onRowClick?: (auditoria: AuditoriaDto) => void;
}
