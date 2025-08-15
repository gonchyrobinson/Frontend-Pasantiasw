import React from 'react';
import { CircularProgress } from '@mui/material';
import {
  ContenedorEstadisticasStyled,
  TarjetaEstadisticaStyled,
} from '../../../../lib/components/StyledComponents';
import { CaptionText, StatValue } from '../../../../lib/components/StyledText';
import { ConvenioStats as ConvenioStatsType } from '../../types';

interface ConvenioStatsProps {
  stats: ConvenioStatsType;
  loading: boolean;
}

const ConvenioStats: React.FC<ConvenioStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <ContenedorEstadisticasStyled>
        {[1, 2, 3, 4].map(i => (
          <TarjetaEstadisticaStyled key={i}>
            <CircularProgress size={40} />
          </TarjetaEstadisticaStyled>
        ))}
      </ContenedorEstadisticasStyled>
    );
  }

  return (
    <ContenedorEstadisticasStyled>
      <TarjetaEstadisticaStyled>
        <CaptionText>Total Convenios</CaptionText>
        <StatValue>{stats.totalConvenios}</StatValue>
      </TarjetaEstadisticaStyled>

      <TarjetaEstadisticaStyled>
        <CaptionText>Vigentes</CaptionText>
        <StatValue sx={{ color: 'success.main' }}>
          {stats.conveniosVigentes}
        </StatValue>
      </TarjetaEstadisticaStyled>

      <TarjetaEstadisticaStyled>
        <CaptionText>Caducados</CaptionText>
        <StatValue sx={{ color: 'error.main' }}>
          {stats.conveniosCaducados}
        </StatValue>
      </TarjetaEstadisticaStyled>

      <TarjetaEstadisticaStyled>
        <CaptionText>Por Vencer</CaptionText>
        <StatValue sx={{ color: 'warning.main' }}>
          {stats.conveniosPorVencer}
        </StatValue>
      </TarjetaEstadisticaStyled>
    </ContenedorEstadisticasStyled>
  );
};

export default ConvenioStats;
