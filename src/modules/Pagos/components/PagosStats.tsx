import React from 'react';
import { StatCard } from '../../../lib/components/StatCard';
import { PagosStats as PagosStatsType } from '../types';
import { Section } from '../../../lib/components/Section';
import { GridContainer } from '../../../lib/components/StyledContainers';

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
      <GridContainer container spacing={2}>
        {statItems.map((item, index) => (
          <GridContainer item xs={12} sm={6} md={3} key={index}>
            <StatCard
              title={item.title}
              value={item.value}
              color={item.color}
              loading={item.loading}
            />
          </GridContainer>
        ))}
      </GridContainer>
    </Section>
  );
};

export default PagosStats;
