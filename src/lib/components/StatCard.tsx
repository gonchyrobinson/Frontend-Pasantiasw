import React from 'react';
import { CircularProgress, styled } from '@mui/material';
import { CenteredContainer, CardContainer } from './StyledContainers';
import { StatValue, CaptionText } from './StyledText';

interface StatCardProps {
  title: string;
  value: string | number;
  loading?: boolean;
  color?: string;
}

const StyledStatCard = styled(CardContainer)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '100%',
}));

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  loading = false,
  color,
}) => {
  if (loading) {
    return (
      <StyledStatCard variant='outlined'>
        <CenteredContainer
          sx={{
            height: '100%',
          }}
        >
          <CircularProgress size={40} />
        </CenteredContainer>
      </StyledStatCard>
    );
  }

  return (
    <StyledStatCard variant='outlined'>
      <CaptionText sx={{ mb: 1 }}>{title}</CaptionText>
      <StatValue sx={{ color: color || 'primary.main' }}>{value}</StatValue>
    </StyledStatCard>
  );
};
