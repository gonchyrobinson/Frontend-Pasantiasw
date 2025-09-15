import React from 'react';
import { Stats, StatsProps } from '../../../lib/ElementCardGenerica';
import { getEstudiantesStats } from '../helpers/estudianteHelpers';
import { EstudianteDto } from '../types';
import { IconoEstudiante, IconoPersona } from './ComponentesPersonalizados';

interface EstudiantesStatsProps {
  estudiantes: EstudianteDto[];
}

const EstudiantesStats: React.FC<EstudiantesStatsProps> = ({ estudiantes }) => {
  const stats = getEstudiantesStats(estudiantes);

  const statsData: StatsProps = {
    title: 'Estadísticas de Estudiantes',
    titleIcon: <IconoEstudiante />,
    stats: [
      {
        icon: <IconoEstudiante />,
        title: 'Total',
        value: stats.total,
        color: 'primary',
      },
      {
        icon: <IconoPersona />,
        title: 'Carreras',
        value: stats.porCarrera ? Object.keys(stats.porCarrera).length : 0,
        color: 'success',
      },
      {
        icon: <IconoPersona />,
        title: 'Activos',
        value: stats.activos,
        color: 'warning',
      },
      {
        icon: <IconoEstudiante />,
        title: 'Promedio',
        value:
          stats.total > 0 && stats.porCarrera
            ? Math.round(stats.total / Object.keys(stats.porCarrera).length)
            : 0,
        color: 'info',
      },
    ],
  };

  return <Stats {...statsData} />;
};

export default EstudiantesStats;
