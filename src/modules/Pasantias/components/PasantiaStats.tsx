import React from 'react';
import { Stats, StatsProps } from '../../../../src/ElementCardGenerica';
import { calculatePasantiaStats } from '../helpers/pasantiaHelpers';
import { PasantiaDto } from '../types';
import { Work, CheckCircle, Cancel, Warning } from '@mui/icons-material';

interface PasantiaStatsProps {
  pasantias: PasantiaDto[];
}

const PasantiaStats: React.FC<PasantiaStatsProps> = ({ pasantias }) => {
  const stats = calculatePasantiaStats(pasantias);

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
    distributions: [
      {
        title: 'Distribución por tipo de acuerdo',
        data: pasantias.reduce(
          (acc, pasantia) => {
            const tipo = pasantia.tipoAcuerdo || 'No especificado';
            acc[tipo] = (acc[tipo] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ),
      },
      {
        title: 'Distribución por tutor empresa',
        data: pasantias.reduce(
          (acc, pasantia) => {
            const tutor = pasantia.tutorEmpresa || 'No especificado';
            acc[tutor] = (acc[tutor] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        ),
      },
    ],
  };

  return <Stats {...statsData} />;
};

export default PasantiaStats;
