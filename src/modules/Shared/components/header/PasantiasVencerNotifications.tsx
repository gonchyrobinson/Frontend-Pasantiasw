import React from 'react';
import { School } from '@mui/icons-material';
import { usePasantiasPorVencer } from '../../../Pasantias/hooks/usePasantias';
import { PasantiaDto } from '../../../Pasantias/types';
import VencimientosNotifications, {
  VencimientoItem,
  VencimientoConfig,
} from '../../../../lib/components/VencimientosNotifications';

interface PasantiasVencerNotificationsProps {
  onClose: () => void;
  onNavigateToPasantia?: (pasantiaId: number) => void;
}

const PasantiasVencerNotifications: React.FC<
  PasantiasVencerNotificationsProps
> = ({ onClose, onNavigateToPasantia }) => {
  const { data: pasantias, isLoading, error } = usePasantiasPorVencer();

  // Configuración específica para Acuerdos Individuales
  const config: VencimientoConfig = {
    title: 'Acuerdos Individuales por Vencer',
    icon: <School />,
    emptyMessage: 'No hay Acuerdos Individuales por vencer',
    emptySubtitle: 'Todas las Acuerdos Individuales están al día',
    getItemTitle: (item: VencimientoItem) => {
      const pasantia = item as unknown as PasantiaDto;
      return pasantia.tramite || `Pasantía ID: ${pasantia.idPasantia}`;
    },
    getItemSubtitle: (item: VencimientoItem) => {
      const pasantia = item as unknown as PasantiaDto;
      return pasantia.areaTrabajo || 'Sin área de trabajo especificada';
    },
    onItemClick: (item: VencimientoItem) => {
      onNavigateToPasantia?.(item.id);
    },
  };

  // Convertir Acuerdos Individuales a VencimientoItem
  const items: VencimientoItem[] = (pasantias || []).map(pasantia => ({
    id: pasantia.idPasantia,
    fechaVencimiento: pasantia.fechaFin,
    ...pasantia,
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

export default PasantiasVencerNotifications;
