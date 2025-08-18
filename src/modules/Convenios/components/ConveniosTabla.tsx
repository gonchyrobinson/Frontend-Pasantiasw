import React from 'react';
import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { ConvenioEmpresaDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';
import { Warning, Business } from '@mui/icons-material';

interface ConveniosTablaProps {
  convenios: ConvenioEmpresaDto[];
  loading: boolean;
  onRowClick?: (convenio: ConvenioEmpresaDto) => void;
  onEdit: (convenio: ConvenioEmpresaDto) => void;
  onDelete: (convenio: ConvenioEmpresaDto) => void;
  onCaducar: (convenio: ConvenioEmpresaDto) => void;
  onAsignarEmpresa: (convenio: ConvenioEmpresaDto) => void;
}

const ConveniosTabla: React.FC<ConveniosTablaProps> = ({
  convenios,
  loading,
  onRowClick,
  onEdit,
  onDelete,
  onCaducar,
  onAsignarEmpresa,
}) => {
  const metadata: FieldMetadata[] = [
    { name: 'expediente', label: 'Expediente', type: 'text' },
    { name: 'nombreEmpresa', label: 'Empresa', type: 'text' },
    {
      name: 'representanteEmpresa',
      label: 'Representante Empresa',
      type: 'text',
    },
    {
      name: 'docRepresentanteFacultad',
      label: 'Doc. Representante Facultad',
      type: 'text',
    },
    { name: 'fechaFirma', label: 'Fecha de Firma', type: 'date' },
    { name: 'fechaCaducidad', label: 'Fecha de Caducidad', type: 'date' },
  ];

  const conveniosData = convenios.map(convenio => ({
    ...convenio,
    id: convenio.idConvenio,
  }));

  const handleRowClick = (row: Record<string, unknown>) => {
    const convenio = convenios.find(c => c.idConvenio === row.id);
    if (convenio && onRowClick) onRowClick(convenio);
  };

  const handleRowEdit = (row: Record<string, unknown>) => {
    const convenio = convenios.find(c => c.idConvenio === row.id);
    if (convenio) onEdit(convenio);
  };

  const handleRowDelete = (row: Record<string, unknown>) => {
    const convenio = convenios.find(c => c.idConvenio === row.id);
    if (convenio) onDelete(convenio);
  };

  const extraButtons = [
    {
      label: 'Caducar',
      onClick: (row: Record<string, unknown>) => {
        const convenio = convenios.find(c => c.idConvenio === row.id);
        if (convenio) onCaducar(convenio);
      },
      color: 'warning' as const,
      variant: 'outlined' as const,
      icon: <Warning />,
    },
    {
      label: 'Asignar Empresa',
      onClick: (row: Record<string, unknown>) => {
        const convenio = convenios.find(c => c.idConvenio === row.id);
        if (convenio) onAsignarEmpresa(convenio);
      },
      color: 'info' as const,
      variant: 'outlined' as const,
      icon: <Business />,
    },
  ];

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={conveniosData}
      title='Convenios'
      subtitle='Lista de convenios registrados en el sistema'
      loading={loading}
      onRowClick={handleRowClick}
      onRowEdit={handleRowEdit}
      onRowDelete={handleRowDelete}
      extraButtons={extraButtons}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      initialSortModel={[{ field: 'expediente', sort: 'asc' }]}
    />
  );
};

export default ConveniosTabla;
