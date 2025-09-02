import React from 'react';
import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { PasantiaShowTableDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';

interface PasantiasTablaProps {
  pasantias: PasantiaShowTableDto[];
  loading: boolean;
  onRowClick?: (pasantia: PasantiaShowTableDto) => void;
  onEdit: (pasantia: PasantiaShowTableDto) => void;
  onDelete: (pasantia: PasantiaShowTableDto) => void;
  onFinalizar?: (pasantia: PasantiaShowTableDto) => void;
  onActivar?: (pasantia: PasantiaShowTableDto) => void;
}

const PasantiasTabla: React.FC<PasantiasTablaProps> = ({
  pasantias,
  loading,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  const metadata: FieldMetadata[] = [
    { name: 'tramite', label: 'Trámite', type: 'text' },
    { name: 'estudiante', label: 'Estudiante', type: 'text' },
    { name: 'empresa', label: 'Empresa', type: 'text' },
    { name: 'tipoAcuerdo', label: 'Tipo de Acuerdo', type: 'text' },
    { name: 'estado', label: 'Estado', type: 'text' },
    { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date' },
    { name: 'fechaFin', label: 'Fecha de Fin', type: 'date' },
  ];

  const pasantiasData = pasantias.map(pasantia => ({
    ...pasantia,
    id: pasantia.id,
  }));

  const handleRowClick = (row: Record<string, unknown>) => {
    const pasantia = pasantias.find(p => p.id === row.id);
    if (pasantia && onRowClick) onRowClick(pasantia);
  };

  const handleRowEdit = (row: Record<string, unknown>) => {
    const pasantia = pasantias.find(p => p.id === row.id);
    if (pasantia) onEdit(pasantia);
  };

  const handleRowDelete = (row: Record<string, unknown>) => {
    const pasantia = pasantias.find(p => p.id === row.id);
    if (pasantia) onDelete(pasantia);
  };

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={pasantiasData}
      title='Pasantías'
      subtitle='Lista de pasantías registradas en el sistema'
      loading={loading}
      onRowClick={handleRowClick}
      onRowEdit={handleRowEdit}
      onRowDelete={handleRowDelete}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      initialSortModel={[{ field: 'tramite', sort: 'asc' }]}
    />
  );
};

export default PasantiasTabla;
