import React from 'react';
import { Grid } from '@mui/material';
import { StatCard } from '../../../lib/components/StatCard';
import { PagosStats as PagosStatsType } from '../types';
import { Section } from '../../../lib/components/Section';

interface PagosStatsProps {
  stats: PagosStatsType;
  loading: boolean;
}

const PagosStats: React.FC<PagosStatsProps> = ({ stats, loading }) => {
  const statItems = [
    {
      title: 'Total Pagos',
      value: stats.totalPagos,
      loading: loading,
    },
    {
      title: 'Vigentes',
      value: stats.pagosVigentes,
      color: 'success.main',
      loading: loading,
    },
    {
      title: 'Vencidos',
      value: stats.pagosVencidos,
      color: 'error.main',
      loading: loading,
    },
    {
      title: 'Monto Total',
      value: `$${stats.montoTotal.toLocaleString()}`,
      color: 'primary.main',
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

export default PagosStats;
