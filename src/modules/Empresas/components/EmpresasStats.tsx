import React from 'react';
import { Stats, StatsProps } from '../../../lib/ElementCardGenerica';
import { getEmpresasStats } from '../helpers/empresaHelpers';
import { EmpresaDto } from '../types';
import {
  IconoEmpresa,
  IconoActivo,
  IconoInactivo,
  IconoCategoria,
} from './ComponentesPersonalizados';

interface EmpresasStatsProps {
  empresas: EmpresaDto[];
}

const EmpresasStats: React.FC<EmpresasStatsProps> = ({ empresas }) => {
  const stats = getEmpresasStats(empresas);

  const statsData: StatsProps = {
    title: 'Estadísticas de Empresas',
    titleIcon: <IconoEmpresa />,
    stats: [
      {
        icon: <IconoEmpresa />,
        title: 'Total',
        value: stats.total,
        color: 'primary',
      },
      {
        icon: <IconoActivo />,
        title: 'Activas',
        value: stats.activas,
        color: 'success',
      },
      {
        icon: <IconoInactivo />,
        title: 'Inactivas',
        value: stats.inactivas,
        color: 'error',
      },
      {
        icon: <IconoCategoria />,
        title: 'Tipos',
        value: Object.keys(stats.porTipo).length,
        color: 'warning',
      },
    ],
  };

  return <Stats {...statsData} />;
};

export default EmpresasStats;
