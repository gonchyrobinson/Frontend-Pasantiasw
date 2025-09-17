import React from 'react';
import { Stats, StatsProps } from '../../../lib/ElementCardGenerica';
import { EmpresaDto } from '../types';
import { IconoEmpresa } from './ComponentesPersonalizados';

interface EmpresasStatsProps {
  empresas: EmpresaDto[];
}

const EmpresasStats: React.FC<EmpresasStatsProps> = ({ empresas }) => {
  const statsData: StatsProps = {
    title: 'Estadísticas de Empresas',
    titleIcon: <IconoEmpresa />,
    stats: [
      {
        icon: <IconoEmpresa />,
        title: 'Total',
        value: empresas.length,
        color: 'primary',
      },
    ],
  };

  return <Stats {...statsData} />;
};

export default EmpresasStats;
