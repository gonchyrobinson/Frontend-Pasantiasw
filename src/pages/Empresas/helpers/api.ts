import { Empresa } from '../types/empresa';
import { apiClient } from '../../../apis/apiClient';
// --- Búsqueda avanzada de empresas ---
export const buscarEmpresasAvanzado = async (filtros: {
  nombre?: string;
  vigencia?: string;
  tipoContrato?: string;
  fechaInicioDesde?: string;
  fechaInicioHasta?: string;
  fechaFinDesde?: string;
  fechaFinHasta?: string;
}): Promise<Empresa[]> => {
  const params = new URLSearchParams();
  if (filtros.nombre) params.append('nombre', filtros.nombre);
  if (filtros.vigencia) params.append('vigencia', filtros.vigencia);
  if (filtros.tipoContrato) params.append('tipoContrato', filtros.tipoContrato);
  if (filtros.fechaInicioDesde)
    params.append('fechaInicioDesde', filtros.fechaInicioDesde);
  if (filtros.fechaInicioHasta)
    params.append('fechaInicioHasta', filtros.fechaInicioHasta);
  if (filtros.fechaFinDesde)
    params.append('fechaFinDesde', filtros.fechaFinDesde);
  if (filtros.fechaFinHasta)
    params.append('fechaFinHasta', filtros.fechaFinHasta);
  const res = await apiClient.get<Empresa[]>(
    `/Empresas/buscar/avanzado?${params.toString()}`
  );
  if (Array.isArray(res)) return res;
  if ('data' in res && Array.isArray(res.data)) return res.data;
  throw new Error('Error al buscar empresas');
};

export const fetchEmpresas = async (): Promise<Empresa[]> => {
  const res = await apiClient.get<Empresa[]>('/Empresas');
  // Si la respuesta es un array plano
  if (Array.isArray(res)) return res;
  // Si es un objeto tipo ApiResponse
  if ('data' in res && Array.isArray(res.data)) return res.data;
  throw new Error('Error al obtener empresas');
};

// Limpia los campos vacíos ('') del objeto antes de enviarlo
function cleanEmpresa<T extends object>(empresa: T): T {
  const cleaned: Partial<Empresa> = {};
  Object.entries(empresa).forEach(([key, value]) => {
    if (value !== '') cleaned[key] = value;
  });
  return cleaned;
}

export const createEmpresa = async (
  empresa: Omit<Empresa, 'idEmpresa'>
): Promise<Empresa> => {
  const cleaned = cleanEmpresa(empresa);
  const res = await apiClient.post<Empresa>('/Empresas', cleaned);
  // Si la respuesta es ApiResponse
  if (typeof res === 'object' && 'success' in res) {
    if (!res.success || !res.data)
      throw new Error(res.error || 'Error al crear empresa');
    return res.data;
  }
  // Si la respuesta es el objeto empresa plano
  if (typeof res === 'object' && 'idEmpresa' in res) {
    return res as Empresa;
  }
  throw new Error('Respuesta inesperada al crear empresa');
};

export const updateEmpresa = async (empresa: Empresa): Promise<Empresa> => {
  const cleaned = cleanEmpresa(empresa);
  const res = await apiClient.put<Empresa>(
    `/Empresas/${empresa.idEmpresa}`,
    cleaned
  );
  // Si la respuesta es ApiResponse
  if (typeof res === 'object' && 'success' in res) {
    if (!res.success || !res.data)
      throw new Error(res.error || 'Error al actualizar empresa');
    return res.data;
  }
  // Si la respuesta es el objeto empresa plano
  if (typeof res === 'object' && 'idEmpresa' in res) {
    return res as Empresa;
  }
  throw new Error('Respuesta inesperada al actualizar empresa');
};

export const deleteEmpresa = async (idEmpresa: number): Promise<void> => {
  const res = await apiClient.delete<null>(`/Empresas/${idEmpresa}`);
  // Si la respuesta es ApiResponse
  if (typeof res === 'object' && res !== null && 'success' in res) {
    if (!res.success) throw new Error(res.error || 'Error al eliminar empresa');
    return;
  }
  // Si la respuesta es vacía, undefined, null o un objeto vacío, considerar éxito
  if (
    res === null ||
    res === undefined ||
    (typeof res === 'object' && Object.keys(res).length === 0)
  ) {
    return;
  }
  // Si la respuesta es un string vacío, también considerar éxito
  if (typeof res === 'string') {
    if ((res as string).trim() === '') {
      return;
    }
  }
  throw new Error('Respuesta inesperada al eliminar empresa');
};
