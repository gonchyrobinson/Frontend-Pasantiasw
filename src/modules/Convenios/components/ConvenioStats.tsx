import React from 'react';
import { StatCard } from '../../../lib/components/StatCard';
import { ConvenioStats as ConvenioStatsType } from '../types';
import { Section } from '../../../lib/components/Section';
import { GridContainer } from '../../../lib/components/StyledContainers';

interface ConvenioStatsProps {
  stats: ConvenioStatsType;
  loading: boolean;
}

const ConvenioStats: React.FC<ConvenioStatsProps> = ({ stats, loading }) => {
  const statItems = [
    {
      title: 'Total Convenios',
      value: stats.totalConvenios,
      loading: loading,
    },
    {
      title: 'Vigentes',
      value: stats.conveniosVigentes,
      color: 'success.main',
      loading: loading,
    },
    {
      title: 'Caducados',
      value: stats.conveniosCaducados,
      color: 'error.main',
      loading: loading,
    },
    {
      title: 'Por Vencer',
      value: stats.conveniosPorVencer,
      color: 'warning.main',
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

export default ConvenioStats;
