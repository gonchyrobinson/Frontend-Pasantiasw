import React from 'react';
import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { PagosDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';
import { getPagoEstado } from '../helpers/pagosHelpers';
import { CheckCircle } from '@mui/icons-material';

interface PagosTablaProps {
  pagos: PagosDto[];
  loading: boolean;
  onRowClick?: (pago: PagosDto) => void;
  onEdit: (pago: PagosDto) => void;
  onDelete: (pago: PagosDto) => void; // Ahora representa "marcar como pagado"
}

const PagosTabla: React.FC<PagosTablaProps> = ({
  pagos,
  loading,
  onRowClick,
  onEdit,
  onDelete,
}) => {
  const metadata: FieldMetadata[] = [
    { name: 'idPago', label: 'ID Pago', type: 'text' },
    { name: 'idPasantia', label: 'ID Pasantía', type: 'text' },
    { name: 'estado', label: 'Estado', type: 'text' },
    { name: 'fechaPago', label: 'Fecha de Pago', type: 'date' },
    { name: 'fechaVencimiento', label: 'Fecha de Vencimiento', type: 'date' },
    { name: 'monto', label: 'Monto', type: 'text' },
    { name: 'observaciones', label: 'Observaciones', type: 'text' },
  ];

  const pagosData = pagos.map(pago => ({
    ...pago,
    id: pago.idPago,
    estado: getPagoEstado(pago),
    monto: pago.monto ? `$${pago.monto.toLocaleString()}` : '-',
    fechaPago: pago.fechaPago,
    fechaVencimiento: pago.fechaVencimiento,
    observaciones: pago.observaciones || '-',
  }));
  const handleRowClick = (row: Record<string, unknown>) => {
    const pago = pagos.find(p => p.idPago === row.id);
    if (pago && onRowClick) onRowClick(pago);
  };

  const handleRowEdit = (row: Record<string, unknown>) => {
    const pago = pagos.find(p => p.idPago === row.id);
    if (pago) onEdit(pago);
  };

  const handleMarcarPagado = (row: Record<string, unknown>) => {
    const pago = pagos.find(p => p.idPago === row.id);
    if (pago) onDelete(pago); // Reutilizamos la prop onDelete para la nueva funcionalidad
  };

  const extraButtons = [
    {
      label: 'Marcar como Pagado',
      icon: <CheckCircle />,
      color: 'success' as const,
      onClick: handleMarcarPagado,
      // Solo mostrar el botón si el pago no está marcado como pagado
      showCondition: (row: Record<string, unknown>) => {
        const pago = pagos.find(p => p.idPago === row.id);
        return pago ? !pago.pagado : true;
      },
    },
  ];

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={pagosData}
      title='Pagos'
      subtitle='Lista de pagos registrados en el sistema'
      loading={loading}
      onRowClick={handleRowClick}
      onRowEdit={handleRowEdit}
      extraButtons={extraButtons}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      initialSortModel={[{ field: 'idPago', sort: 'desc' }]}
    />
  );
};

export default PagosTabla;
