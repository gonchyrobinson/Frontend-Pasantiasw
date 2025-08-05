import React from 'react';
import { Grid } from '@mui/material';
import { getEmpresasStats } from '../helpers/empresaHelpers';
import { EmpresaDto } from '../types';
import {
  TituloPrincipal,
  ContenedorPrincipal,
  ContenedorEstadisticas,
  ContenedorIcono,
  ContenedorChips,
  TarjetaEstadistica,
  ValorEstadistica,
  TextoSecundario,
  Subtitulo,
  ChipEstadistica,
  IconoEmpresa,
  IconoActivo,
  IconoInactivo,
  IconoCategoria,
} from './ComponentesPersonalizados';

interface EmpresasStatsProps {
  empresas: EmpresaDto[];
}

const EmpresasStats: React.FC<EmpresasStatsProps> = ({ empresas }) => {
  const stats = getEmpresasStats(empresas);

  const StatCard = ({
    icon,
    title,
    value,
    color = 'primary',
  }: {
    icon: React.ReactNode;
    title: string;
    value: number | string;
    color?: 'primary' | 'success' | 'error' | 'warning';
  }) => (
    <TarjetaEstadistica color={color}>
      <ContenedorIcono color={color}>{icon}</ContenedorIcono>
      <ValorEstadistica color={color}>{value}</ValorEstadistica>
      <TextoSecundario>{title}</TextoSecundario>
    </TarjetaEstadistica>
  );

  return (
    <ContenedorPrincipal>
      <TituloPrincipal>
        <IconoEmpresa /> Estadísticas de Empresas
      </TituloPrincipal>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<IconoEmpresa />}
            title='Total'
            value={stats.total}
            color='primary'
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<IconoActivo />}
            title='Activas'
            value={stats.activas}
            color='success'
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<IconoInactivo />}
            title='Inactivas'
            value={stats.inactivas}
            color='error'
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatCard
            icon={<IconoCategoria />}
            title='Tipos'
            value={Object.keys(stats.porTipo).length}
            color='warning'
          />
        </Grid>
      </Grid>

      {Object.keys(stats.porTipo).length > 0 && (
        <ContenedorEstadisticas>
          <Subtitulo>Distribución por tipo de contrato:</Subtitulo>
          <ContenedorChips>
            {Object.entries(stats.porTipo).map(([tipo, cantidad]) => (
              <ChipEstadistica key={tipo} label={`${tipo}: ${cantidad}`} />
            ))}
          </ContenedorChips>
        </ContenedorEstadisticas>
      )}
    </ContenedorPrincipal>
  );
};

export default EmpresasStats;
