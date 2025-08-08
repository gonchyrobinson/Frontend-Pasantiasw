import React from 'react';
import { CircularProgress } from '@mui/material';
import {
  ContenedorEstadisticasStyled,
  TarjetaEstadisticaStyled,
  TituloEstadisticaStyled,
  ValorEstadisticaStyled,
} from '../StyledComponents';
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
        <TituloEstadisticaStyled>Total Convenios</TituloEstadisticaStyled>
        <ValorEstadisticaStyled>{stats.totalConvenios}</ValorEstadisticaStyled>
      </TarjetaEstadisticaStyled>

      <TarjetaEstadisticaStyled>
        <TituloEstadisticaStyled>Vigentes</TituloEstadisticaStyled>
        <ValorEstadisticaStyled color='success.main'>
          {stats.conveniosVigentes}
        </ValorEstadisticaStyled>
      </TarjetaEstadisticaStyled>

      <TarjetaEstadisticaStyled>
        <TituloEstadisticaStyled>Caducados</TituloEstadisticaStyled>
        <ValorEstadisticaStyled color='error.main'>
          {stats.conveniosCaducados}
        </ValorEstadisticaStyled>
      </TarjetaEstadisticaStyled>

      <TarjetaEstadisticaStyled>
        <TituloEstadisticaStyled>Por Vencer</TituloEstadisticaStyled>
        <ValorEstadisticaStyled color='warning.main'>
          {stats.conveniosPorVencer}
        </ValorEstadisticaStyled>
      </TarjetaEstadisticaStyled>
    </ContenedorEstadisticasStyled>
  );
};

export default ConvenioStats;
