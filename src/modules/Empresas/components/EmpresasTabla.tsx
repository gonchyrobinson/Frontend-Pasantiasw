import React from 'react';
import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { EmpresaDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';

interface EmpresasTablaProps {
  empresas: EmpresaDto[];
  loading?: boolean;
  onRowClick?: (empresa: EmpresaDto) => void;
  onRowEdit?: (empresa: EmpresaDto) => void;
  onRowDelete?: (empresa: EmpresaDto) => void;
  extraButtons?: Array<{
    label: string;
    onClick: (empresa: EmpresaDto) => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: React.ReactNode;
  }>;
}

const EmpresasTabla: React.FC<EmpresasTablaProps> = ({
  empresas,
  loading = false,
  onRowClick,
  onRowEdit,
  onRowDelete,
  extraButtons = [],
}) => {
  const metadata: FieldMetadata[] = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'vigencia', label: 'Vigencia', type: 'text' },
    { name: 'tipoContrato', label: 'Tipo de Contrato', type: 'text' },
  ];

  // Convertir EmpresaDto[] a Record<string, unknown>[] para compatibilidad
  const empresasData = empresas.map(empresa => ({
    ...empresa,
    // Agregar campos adicionales para compatibilidad
    id: empresa.idEmpresa,
    activa: empresa.vigencia === 'vigente',
  }));

  // Wrapper para las funciones de callback para manejar el tipo correcto
  const handleRowClick = (row: Record<string, unknown>) => {
    if (onRowClick) {
      const empresa = empresas.find(e => e.idEmpresa === row.id);
      if (empresa) onRowClick(empresa);
    }
  };

  const handleRowEdit = (row: Record<string, unknown>) => {
    if (onRowEdit) {
      const empresa = empresas.find(e => e.idEmpresa === row.id);
      if (empresa) onRowEdit(empresa);
    }
  };

  const handleRowDelete = (row: Record<string, unknown>) => {
    if (onRowDelete) {
      const empresa = empresas.find(e => e.idEmpresa === row.id);
      if (empresa) onRowDelete(empresa);
    }
  };

  // Convertir extraButtons para que funcionen con el tipo genérico
  const extraButtonsGeneric = extraButtons.map(button => ({
    ...button,
    onClick: (row: Record<string, unknown>) => {
      const empresa = empresas.find(e => e.idEmpresa === row.id);
      if (empresa) button.onClick(empresa);
    },
  }));

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={empresasData}
      title='Empresas'
      subtitle='Lista de empresas registradas en el sistema'
      loading={loading}
      onRowClick={handleRowClick}
      onRowEdit={handleRowEdit}
      onRowDelete={handleRowDelete}
      extraButtons={extraButtonsGeneric}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      // Ordenamiento inicial por nombre
      initialSortModel={[{ field: 'nombre', sort: 'asc' }]}
    />
  );
};

export default EmpresasTabla;
