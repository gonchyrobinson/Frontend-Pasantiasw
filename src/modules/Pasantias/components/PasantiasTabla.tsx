import React from 'react';
import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { PasantiaDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';

interface PasantiasTablaProps {
  pasantias: PasantiaDto[];
  loading: boolean;
  onRowClick?: (pasantia: PasantiaDto) => void;
  onEdit: (pasantia: PasantiaDto) => void;
  onDelete: (pasantia: PasantiaDto) => void;
  onFinalizar?: (pasantia: PasantiaDto) => void;
  onActivar?: (pasantia: PasantiaDto) => void;
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
    { name: 'obraSocial', label: 'Obra Social', type: 'text' },
    { name: 'art', label: 'ART', type: 'text' },
    { name: 'tipoAcuerdo', label: 'Tipo de Acuerdo', type: 'text' },
    { name: 'estado', label: 'Estado', type: 'text' },
    { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date' },
    { name: 'fechaFin', label: 'Fecha de Fin', type: 'date' },
    { name: 'asignacionMensual', label: 'Asignación Mensual', type: 'number' },
    { name: 'tutorEmpresa', label: 'Tutor Empresa', type: 'text' },
    { name: 'tutorFacultad', label: 'Tutor Facultad', type: 'text' },
  ];

  const pasantiasData = pasantias.map(pasantia => ({
    ...pasantia,
    id: pasantia.idPasantia,
  }));

  const handleRowClick = (row: Record<string, unknown>) => {
    const pasantia = pasantias.find(p => p.idPasantia === row.id);
    if (pasantia && onRowClick) onRowClick(pasantia);
  };

  const handleRowEdit = (row: Record<string, unknown>) => {
    const pasantia = pasantias.find(p => p.idPasantia === row.id);
    if (pasantia) onEdit(pasantia);
  };

  const handleRowDelete = (row: Record<string, unknown>) => {
    const pasantia = pasantias.find(p => p.idPasantia === row.id);
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
