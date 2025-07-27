import React from 'react';
import { Card, CardContent, Box, Typography, Skeleton } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledStatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  marginBottom: theme.spacing(1),
}));

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  loading?: boolean;
  error?: boolean;
  trend: string;
  trendDirection: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  bgColor,
  loading = false,
  error = false,
  trend,
  trendDirection,
}) => {
  return (
    <StyledStatsCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <StatIcon sx={{ backgroundColor: bgColor, color: color }}>
            {icon}
          </StatIcon>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trendDirection === 'up' ? (
              <TrendingUp fontSize="small" color="success" />
            ) : (
              <TrendingDown fontSize="small" color="error" />
            )}
            <Typography variant="caption" color={trendDirection === 'up' ? 'success.main' : 'error.main'}>
              {trend}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <Skeleton variant="text" width="60%" />
        ) : error ? (
          <Typography color="error" variant="body2">
            Error al cargar
          </Typography>
        ) : (
          <Typography variant="h4" component="p" color="primary" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
        )}
      </CardContent>
    </StyledStatsCard>
  );
};

export default StatsCard; 