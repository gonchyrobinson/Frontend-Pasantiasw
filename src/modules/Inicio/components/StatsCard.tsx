import {
  TrendingUp,
  TrendingDown,
  ArrowForward,
  TouchApp,
} from '@mui/icons-material';
import { CardContent, Skeleton, Tooltip } from '@mui/material';
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
import { FlexContainer } from '../../../lib/components/StyledContainers';

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
  onClick,
}) => {
  const cardContent = (
    <TarjetaEstadistica
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': onClick
          ? {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              '&::before': {
                opacity: 1,
              },
            }
          : {},
        '&::before': onClick
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${color}, ${bgColor})`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }
          : {},
      }}
    >
      <CardContent>
        <FlexContainer
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 2,
          }}
        >
          <IconoEstadisticaCard bgColor={bgColor} color={color}>
            {icon}
          </IconoEstadisticaCard>
          <FlexContainer sx={{ alignItems: 'center', gap: 0.5 }}>
            {trendDirection === 'up' ? (
              <TrendingUp fontSize='small' color='success' />
            ) : (
              <TrendingDown fontSize='small' color='error' />
            )}
            <TextoTendencia direction={trendDirection}>{trend}</TextoTendencia>
          </FlexContainer>
        </FlexContainer>

        <TituloEstadistica>
          {title}
          {onClick && (
            <FlexContainer
              sx={{ display: 'inline-flex', alignItems: 'center', ml: 1 }}
            >
              <TouchApp
                fontSize='small'
                color='action'
                sx={{
                  mr: 0.5,
                  opacity: 0.7,
                  transition: 'opacity 0.2s ease',
                }}
              />
              <ArrowForward
                fontSize='small'
                color='action'
                sx={{
                  opacity: 0.7,
                  transition: 'all 0.2s ease',
                  transform: 'translateX(0)',
                }}
              />
            </FlexContainer>
          )}
        </TituloEstadistica>

        {loading ? (
          <Skeleton variant='text' width='60%' />
        ) : error ? (
          <TextoError>Error al cargar</TextoError>
        ) : (
          <ValorEstadistica>{value}</ValorEstadistica>
        )}

        {onClick && (
          <FlexContainer
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              opacity: 0.3,
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 0.7,
              },
            }}
          >
            <TouchApp fontSize='small' color='action' />
          </FlexContainer>
        )}
      </CardContent>
    </TarjetaEstadistica>
  );

  return onClick ? (
    <Tooltip
      title={`Ver ${title.toLowerCase()}`}
      arrow
      placement='top'
      sx={{
        '& .MuiTooltip-tooltip': {
          fontSize: '0.875rem',
          backgroundColor: 'rgba(0, 0, 0, 0.87)',
        },
      }}
    >
      {cardContent}
    </Tooltip>
  ) : (
    cardContent
  );
};

export default StatsCard;
