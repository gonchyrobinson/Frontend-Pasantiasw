import React from 'react';
import { Typography, Grid, SpeedDialAction } from '@mui/material';
import {
  StyledContainer,
  StyledActionCard,
  StyledProgressSection,
  StyledStatsCard,
  StyledWelcomeSection,
  ContenedorGridStyled,
  AlertaErrorStyled,
  SpeedDialStyled,
  IconoEstadisticaStyled,
  DescripcionAccionStyled,
  IconoEstadisticaCardStyled,
  SubtituloBienvenidaStyled,
} from './StyledComponents';

// Componentes para Inicio.tsx
export const ContenedorPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => <StyledContainer maxWidth='lg'>{children}</StyledContainer>;

export const ContenedorGrid = ({ children }: { children: React.ReactNode }) => (
  <ContenedorGridStyled container spacing={3}>
    {children}
  </ContenedorGridStyled>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ItemGrid = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) => (
  <Grid item xs={12} sm={6} md={4} {...props}>
    {children}
  </Grid>
);

export const TituloSeccion = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='h5' component='h2' gutterBottom sx={{ mt: 4 }}>
    {children}
  </Typography>
);

export const AlertaError = ({ mensaje }: { mensaje: string }) => (
  <AlertaErrorStyled severity='error'>{mensaje}</AlertaErrorStyled>
);

export const SpeedDialRapido = ({
  actions,
  icon,
}: {
  actions: Array<{ icon: React.ReactNode; name: string; action: () => void }>;
  icon: React.ReactNode;
}) => (
  <SpeedDialStyled ariaLabel='Acciones rápidas' icon={icon}>
    {actions.map(action => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={action.action}
      />
    ))}
  </SpeedDialStyled>
);

// Componentes para ActionCard.tsx
export const ActionCardContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => <StyledActionCard onClick={onClick}>{children}</StyledActionCard>;

export const IconoEstadistica = ({
  children,
  color,
  bgColor,
}: {
  children: React.ReactNode;
  color: string;
  bgColor: string;
}) => (
  <IconoEstadisticaStyled
    sx={{
      backgroundColor: `${bgColor}.light`,
      color: `${color}.main`,
    }}
  >
    {children}
  </IconoEstadisticaStyled>
);

export const TituloAccion = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='h6' component='h3'>
    {children}
  </Typography>
);

export const DescripcionAccion = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <DescripcionAccionStyled variant='body2' color='text.secondary'>
    {children}
  </DescripcionAccionStyled>
);

export const BotonAccion = ({
  children,
  _icon,
}: {
  children: React.ReactNode;
  _icon: React.ReactNode;
}) => (
  <Typography variant='body1' sx={{ textTransform: 'none' }}>
    {children}
  </Typography>
);

// Componentes para ProgressSection.tsx
export const ContenedorProgreso = ({
  children,
}: {
  children: React.ReactNode;
}) => <StyledProgressSection>{children}</StyledProgressSection>;

export const TituloProgreso = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='h6' gutterBottom>
    {children}
  </Typography>
);

export const ItemProgreso = ({
  label,
  value,
  color = 'primary',
}: {
  label: string;
  value: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}) => (
  <React.Fragment>
    <Typography variant='body2'>{label}</Typography>
    <Typography variant='body2' color={color}>
      {value}%
    </Typography>
  </React.Fragment>
);

// Componentes para StatsCard.tsx
export const TarjetaEstadistica = ({
  children,
}: {
  children: React.ReactNode;
}) => <StyledStatsCard>{children}</StyledStatsCard>;

export const IconoEstadisticaCard = ({
  children,
  bgColor,
  color,
}: {
  children: React.ReactNode;
  bgColor: string;
  color: string;
}) => (
  <IconoEstadisticaCardStyled sx={{ backgroundColor: bgColor, color: color }}>
    {children}
  </IconoEstadisticaCardStyled>
);

export const TituloEstadistica = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Typography variant='h6' component='h2' gutterBottom>
    {children}
  </Typography>
);

export const ValorEstadistica = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Typography
    variant='h4'
    component='p'
    color='primary'
    sx={{ fontWeight: 600 }}
  >
    {children}
  </Typography>
);

export const TextoTendencia = ({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 'up' | 'down';
}) => (
  <Typography
    variant='caption'
    color={direction === 'up' ? 'success.main' : 'error.main'}
  >
    {children}
  </Typography>
);

export const TextoError = ({ children }: { children: React.ReactNode }) => (
  <Typography color='error' variant='body2'>
    {children}
  </Typography>
);

// Componentes para WelcomeSection.tsx
export const ContenedorBienvenida = ({
  children,
}: {
  children: React.ReactNode;
}) => <StyledWelcomeSection>{children}</StyledWelcomeSection>;

export const TituloBienvenida = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Typography variant='h4' component='h1' gutterBottom sx={{ fontWeight: 600 }}>
    {children}
  </Typography>
);

export const SubtituloBienvenida = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <SubtituloBienvenidaStyled variant='subtitle1'>
    {children}
  </SubtituloBienvenidaStyled>
);
