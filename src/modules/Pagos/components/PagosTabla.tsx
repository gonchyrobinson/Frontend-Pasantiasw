import React from 'react';
import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { PagosDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';

interface PagosTablaProps {
  pagos: PagosDto[];
  loading: boolean;
  onEdit: (pago: PagosDto) => void;
  onDelete: (pago: PagosDto) => void;
}

const PagosTabla: React.FC<PagosTablaProps> = ({
  pagos,
  loading,
  onEdit,
  onDelete,
}) => {
  const metadata: FieldMetadata[] = [
    { name: 'idPago', label: 'ID Pago', type: 'text' },
    { name: 'idPasantia', label: 'ID Pasantía', type: 'text' },
    { name: 'fechaPago', label: 'Fecha de Pago', type: 'date' },
    { name: 'fechaVencimiento', label: 'Fecha de Vencimiento', type: 'date' },
    { name: 'monto', label: 'Monto', type: 'text' },
    { name: 'observaciones', label: 'Observaciones', type: 'text' },
  ];

  const pagosData = pagos.map(pago => ({
    ...pago,
    id: pago.idPago,
    monto: pago.monto ? `$${pago.monto.toLocaleString()}` : '-',
  }));

  const handleRowEdit = (row: Record<string, unknown>) => {
    const pago = pagos.find(p => p.idPago === row.id);
    if (pago) onEdit(pago);
  };

  const handleRowDelete = (row: Record<string, unknown>) => {
    const pago = pagos.find(p => p.idPago === row.id);
    if (pago) onDelete(pago);
  };

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={pagosData}
      title='Pagos'
      subtitle='Lista de pagos registrados en el sistema'
      loading={loading}
      onRowEdit={handleRowEdit}
      onRowDelete={handleRowDelete}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      initialSortModel={[{ field: 'idPago', sort: 'desc' }]}
    />
  );
};

export default PagosTabla;
