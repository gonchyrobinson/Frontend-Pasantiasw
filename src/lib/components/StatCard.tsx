import React from 'react';
import { Paper, CircularProgress, Box, styled } from '@mui/material';
import { StatValue, CaptionText } from './StyledText';

interface StatCardProps {
  title: string;
  value: string | number;
  loading?: boolean;
  color?: string;
}

const StyledStatCard = styled(Paper)(({ theme }) => ({
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <CircularProgress size={40} />
        </Box>
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
