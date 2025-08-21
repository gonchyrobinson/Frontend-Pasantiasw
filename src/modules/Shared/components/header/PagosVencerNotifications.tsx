import React from 'react';
import { Payment } from '@mui/icons-material';
import { usePagosPorVencer } from '../../../Pagos/hooks/usePagosPorVencer';
import { PagosDto } from '../../../Pagos/types';
import VencimientosNotifications, {
  VencimientoItem,
  VencimientoConfig,
} from '../../../../lib/components/VencimientosNotifications';

interface PagosVencerNotificationsProps {
  onClose: () => void;
  onNavigateToPago?: (pagoId: number) => void;
}

const PagosVencerNotifications: React.FC<PagosVencerNotificationsProps> = ({
  onClose,
  onNavigateToPago,
}) => {
  const { data: pagos, isLoading, error } = usePagosPorVencer();

  // Configuración específica para pagos
  const config: VencimientoConfig = {
    title: 'Pagos por Vencer',
    icon: <Payment />,
    emptyMessage: 'No hay pagos por vencer',
    emptySubtitle: 'Todos los pagos están al día',
    getItemTitle: (item: VencimientoItem) => {
      const pago = item as unknown as PagosDto;
      return `Pago ID: ${pago.idPago}`;
    },
    getItemSubtitle: (item: VencimientoItem) => {
      const pago = item as unknown as PagosDto;
      return `Monto: $${pago.monto?.toLocaleString() || 'N/A'}`;
    },
    onItemClick: (item: VencimientoItem) => {
      onNavigateToPago?.(item.id);
    },
  };

  // Convertir pagos a VencimientoItem
  const items: VencimientoItem[] = (pagos || []).map(pago => ({
    id: pago.idPago,
    fechaVencimiento: pago.fechaVencimiento,
    ...pago,
  }));

  return (
    <VencimientosNotifications
      items={items}
      isLoading={isLoading}
      error={error}
      config={config}
      onClose={onClose}
    />
  );
};

export default PagosVencerNotifications;
