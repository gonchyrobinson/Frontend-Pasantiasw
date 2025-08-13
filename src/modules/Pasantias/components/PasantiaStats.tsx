import React from 'react';
import { Grid } from '@mui/material';
import { StatCard } from '../../../lib/components/StatCard';
import { PasantiaStats as PasantiaStatsType } from '../types';
import { Section } from '../../../lib/components/Section';

interface PasantiaStatsProps {
  stats: PasantiaStatsType;
  loading: boolean;
}

const PasantiaStats: React.FC<PasantiaStatsProps> = ({ stats, loading }) => {
  const statItems = [
    {
      title: 'Total Pasantías',
      value: stats.totalPasantias,
      loading: loading,
    },
    {
      title: 'Activas',
      value: stats.pasantiasActivas,
      color: 'success.main',
      loading: loading,
    },
    {
      title: 'Finalizadas',
      value: stats.pasantiasFinalizadas,
      color: 'info.main',
      loading: loading,
    },
    {
      title: 'Por Vencer',
      value: stats.pasantiasPorVencer,
      color: 'warning.main',
      loading: loading,
    },
  ];

  return (
    <Section>
      <Grid container spacing={2}>
        {statItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title={item.title}
              value={item.value}
              color={item.color}
              loading={item.loading}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default PasantiaStats;
