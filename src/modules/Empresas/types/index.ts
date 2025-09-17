export interface EmpresaDto {
  idEmpresa: number;
  nombre?: string;
  correoElectronico?: string;
}

// DTO para creación - omite el ID que es generado por el backend
export type CreacionEmpresaDto = Omit<EmpresaDto, 'idEmpresa'>;

// DTO para búsqueda avanzada - compatible con backend
export interface EmpresaBusquedaAvanzadaDto {
  nombre?: string;
}
