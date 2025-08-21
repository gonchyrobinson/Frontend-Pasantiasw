import React from 'react';
import { Business } from '@mui/icons-material';
import { useConveniosPorVencer } from '../../../Convenios/hooks/useConveniosPorVencer';
import { ConvenioEmpresaDto } from '../../../Convenios/types';
import VencimientosNotifications, {
  VencimientoItem,
  VencimientoConfig,
} from '../../../../lib/components/VencimientosNotifications';

interface ConveniosVencerNotificationsProps {
  onClose: () => void;
  onNavigateToConvenio?: (convenioId: number) => void;
}

const ConveniosVencerNotifications: React.FC<
  ConveniosVencerNotificationsProps
> = ({ onClose, onNavigateToConvenio }) => {
  const { data: convenios, isLoading, error } = useConveniosPorVencer();

  // Configuración específica para convenios
  const config: VencimientoConfig = {
    title: 'Convenios por Vencer',
    icon: <Business />,
    emptyMessage: 'No hay convenios por vencer',
    emptySubtitle: 'Todos los convenios están al día',
    getItemTitle: (item: VencimientoItem) => {
      const convenio = item as unknown as ConvenioEmpresaDto;
      return convenio.expediente || `Convenio ID: ${convenio.idConvenio}`;
    },
    getItemSubtitle: (item: VencimientoItem) => {
      const convenio = item as unknown as ConvenioEmpresaDto;
      return convenio.nombreEmpresa || 'Sin empresa asignada';
    },
    onItemClick: (item: VencimientoItem) => {
      onNavigateToConvenio?.(item.id);
    },
  };

  // Convertir convenios a VencimientoItem
  const items: VencimientoItem[] = (convenios || []).map(convenio => ({
    id: convenio.idConvenio,
    fechaVencimiento: convenio.fechaCaducidad,
    ...convenio,
  }));

  return (
    <VencimientosNotifications
      items={items}
      isLoading={isLoading}
      error={error}
      config={config}
      onClose={onClose}
      maxItems={5}
    />
  );
};

export default ConveniosVencerNotifications;
