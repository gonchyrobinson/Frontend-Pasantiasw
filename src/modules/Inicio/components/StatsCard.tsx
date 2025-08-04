import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { CardContent, Skeleton } from '@mui/material';
import React from 'react';
import { StatsCardProps } from '../types';
import {
  TarjetaEstadistica,
  IconoEstadisticaCard,
  TituloEstadistica,
  ValorEstadistica,
  TextoTendencia,
  TextoError,
} from './ComponentesGenericos';
import {
  BoxFlexGapStyled,
  BoxFlexBetweenStatsStyled,
} from './StyledComponents';

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
    <TarjetaEstadistica>
      <CardContent>
        <BoxFlexBetweenStatsStyled>
          <IconoEstadisticaCard bgColor={bgColor} color={color}>
            {icon}
          </IconoEstadisticaCard>
          <BoxFlexGapStyled>
            {trendDirection === 'up' ? (
              <TrendingUp fontSize='small' color='success' />
            ) : (
              <TrendingDown fontSize='small' color='error' />
            )}
            <TextoTendencia direction={trendDirection}>{trend}</TextoTendencia>
          </BoxFlexGapStyled>
        </BoxFlexBetweenStatsStyled>
        <TituloEstadistica>{title}</TituloEstadistica>
        {loading ? (
          <Skeleton variant='text' width='60%' />
        ) : error ? (
          <TextoError>Error al cargar</TextoError>
        ) : (
          <ValorEstadistica>{value}</ValorEstadistica>
        )}
      </CardContent>
    </TarjetaEstadistica>
  );
};

export default StatsCard;
