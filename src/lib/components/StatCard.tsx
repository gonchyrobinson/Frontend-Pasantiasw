import React from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Box,
  styled,
} from '@mui/material';

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

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

const StatTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
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
      <StatTitle>{title}</StatTitle>
      <StatValue sx={{ color }}>{value}</StatValue>
    </StyledStatCard>
  );
};
