import React from 'react';
import { Stats, StatsProps } from '../../../lib/ElementCardGenerica';
import { calculatePasantiaStats } from '../helpers/pasantiaHelpers';
import { PasantiaDto } from '../types';
import { Work, CheckCircle, Cancel, Warning } from '@mui/icons-material';
import { usePasantiasPorVencer } from '../hooks/usePasantiasPorVencer';

interface PasantiaStatsProps {
  pasantias: PasantiaDto[];
}

const PasantiaStats: React.FC<PasantiaStatsProps> = ({ pasantias }) => {
  // Obtener pasantías por vencer del hook (ya calculadas)
  const { data: pasantiasPorVencer } = usePasantiasPorVencer();

  // Calcular estadísticas usando el valor pre-calculado
  const stats = calculatePasantiaStats(pasantias, pasantiasPorVencer?.length);

  const statsData: StatsProps = {
    title: 'Estadísticas de Pasantías',
    titleIcon: <Work />,
    stats: [
      {
        icon: <Work />,
        title: 'Total',
        value: stats.totalPasantias,
        color: 'primary',
      },
      {
        icon: <CheckCircle />,
        title: 'Activas',
        value: stats.pasantiasActivas,
        color: 'success',
      },
      {
        icon: <Cancel />,
        title: 'Finalizadas',
        value: stats.pasantiasFinalizadas,
        color: 'info',
      },
      {
        icon: <Warning />,
        title: 'Por Vencer',
        value: stats.pasantiasPorVencer,
        color: 'warning',
      },
    ],
  };

  return <Stats {...statsData} />;
};

export default PasantiaStats;
