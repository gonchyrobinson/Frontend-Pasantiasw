import React from 'react';
import { StatsProps, StatCardProps, DistributionData } from '../types';
import { GridContainer } from '../../components/StyledContainers';
import {
  StatsContainerStyled,
  StatsTitleStyled,
  StatCardStyled,
  StatIconContainerStyled,
  StatValueStyled,
  StatTitleStyled,
  DistributionSectionStyled,
  DistributionTitleStyled,
  DistributionChipsContainerStyled,
  DistributionChipStyled,
} from './StyledComponents';

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  color = 'primary',
}) => (
  <StatCardStyled color={color}>
    <StatIconContainerStyled color={color}>
      <div>{icon}</div>
    </StatIconContainerStyled>
    <StatValueStyled color={color}>{value}</StatValueStyled>
    <StatTitleStyled>{title}</StatTitleStyled>
  </StatCardStyled>
);

const DistributionSection: React.FC<{
  title: string;
  data: DistributionData;
}> = ({ title, data }) => {
  if (Object.keys(data).length === 0) return null;

  return (
    <DistributionSectionStyled>
      <DistributionTitleStyled>{title}:</DistributionTitleStyled>
      <DistributionChipsContainerStyled>
        {Object.entries(data).map(([key, value]) => (
          <DistributionChipStyled
            key={key}
            label={`${key}: ${value}`}
            variant='outlined'
            size='small'
            color='primary'
          />
        ))}
      </DistributionChipsContainerStyled>
    </DistributionSectionStyled>
  );
};

const Stats: React.FC<StatsProps> = ({
  title,
  titleIcon,
  stats,
  distributions = [],
}) => {
  return (
    <StatsContainerStyled>
      <StatsTitleStyled>
        {titleIcon} {title}
      </StatsTitleStyled>

      <GridContainer container spacing={3}>
        {stats.map((stat, index) => (
          <GridContainer item xs={6} sm={3} key={index}>
            <StatCard
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              color={stat.color}
            />
          </GridContainer>
        ))}
      </GridContainer>

      {distributions.map((distribution, index) => (
        <DistributionSection
          key={index}
          title={distribution.title}
          data={distribution.data}
        />
      ))}
    </StatsContainerStyled>
  );
};

export default Stats;
