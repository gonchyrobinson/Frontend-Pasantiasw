import React from 'react';
import { useApiQuery } from '../../../hooks/useApi';
import { ROUTES } from '../../../helpers/routesHelper';
import { DropdownOption } from '../../../FormularioGenerico/types';

interface EmpresaDto {
  idEmpresa: number;
  nombre: string;
}

// Hook para obtener empresas para los dropdowns dinámicos
export const useEmpresasForDropdown = () => {
  const {
    data: empresasResponse,
    isLoading,
    error,
  } = useApiQuery<EmpresaDto[]>(ROUTES.EMPRESAS);

  // Opciones para búsqueda por nombre
  const empresasOptions: DropdownOption[] = React.useMemo(() => {
    const empresas = empresasResponse?.data;
    if (!empresas || !Array.isArray(empresas)) {
      return [];
    }

    return empresas.map(empresa => ({
      value: empresa.nombre,
      label: empresa.nombre,
    }));
  }, [empresasResponse]);

  // Opciones para asignación (usando ID)
  const empresasParaAsignarOptions: DropdownOption[] = React.useMemo(() => {
    const empresas = empresasResponse?.data;
    if (!empresas || !Array.isArray(empresas)) {
      return [];
    }

    return empresas.map(empresa => ({
      value: empresa?.idEmpresa ?? null,
      label: empresa.nombre,
    }));
  }, [empresasResponse]);

  return {
    empresasOptions, // Para búsqueda por nombre
    empresasParaAsignarOptions, // Para asignación usando ID
    isLoading,
    error,
  };
};
