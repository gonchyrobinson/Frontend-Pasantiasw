import React from 'react';
import { SpeedDialAction } from '@mui/material';
import {
  SectionTitle,
  CardTitle,
  BodyText,
  StatValue,
  CaptionText,
  PageTitle,
} from '../../../lib/components/StyledText';
import { GridContainer } from '../../../lib/components/StyledContainers';
import {
  StyledActionCard,
  StyledProgressSection,
  StyledStatsCard,
  StyledWelcomeSection,
  ContenedorGridStyled,
  SpeedDialStyled,
  SubtituloBienvenidaStyled,
} from './StyledComponents';
import { AlertaErrorStyled } from '../../../lib/components/StyledComponents';
import { MainContainer } from '../../../lib/components/StyledContainers';

// Componentes para Inicio.tsx
export const ContenedorPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => <MainContainer maxWidth='lg'>{children}</MainContainer>;

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
  <GridContainer item xs={12} sm={6} md={4} {...props}>
    {children}
  </GridContainer>
);

export const TituloSeccion = ({ children }: { children: React.ReactNode }) => (
  <SectionTitle component='h2' gutterBottom sx={{ mt: 4 }}>
    {children}
  </SectionTitle>
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
  <SpeedDialStyled
    ariaLabel='Acciones rápidas'
    icon={icon}
    sx={{
      '& .MuiSpeedDial-fab': {
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
          transform: 'scale(1.1)',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '& .MuiSpeedDialAction-fab': {
        backgroundColor: 'secondary.main',
        '&:hover': {
          backgroundColor: 'secondary.dark',
          transform: 'scale(1.05)',
        },
        transition: 'all 0.2s ease',
      },
    }}
  >
    {actions.map(action => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={action.action}
        sx={{
          '& .MuiSpeedDialAction-staticTooltip': {
            backgroundColor: 'rgba(0, 0, 0, 0.87)',
            color: 'white',
            fontSize: '0.875rem',
          },
        }}
      />
    ))}
  </SpeedDialStyled>
);

// Componentes para ActionCard.tsx
export const ActionCardContainer = ({
  children,
  onClick,
  sx,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sx?: any;
}) => (
  <StyledActionCard onClick={onClick} sx={sx}>
    {children}
  </StyledActionCard>
);

export const IconoEstadistica = ({
  children,
}: {
  children: React.ReactNode;
  color: string;
  bgColor: string;
}) => (
  <div
    style={{
      marginRight: '16px',
      padding: '8px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

export const TituloAccion = ({ children }: { children: React.ReactNode }) => (
  <CardTitle component='h3'>{children}</CardTitle>
);

export const DescripcionAccion = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <BodyText variant='body2' color='text.secondary' sx={{ marginBottom: 2 }}>
    {children}
  </BodyText>
);

export const BotonAccion = ({
  children,
  _icon,
}: {
  children: React.ReactNode;
  _icon: React.ReactNode;
}) => <BodyText sx={{ textTransform: 'none' }}>{children}</BodyText>;

// Componentes para ProgressSection.tsx
export const ContenedorProgreso = ({
  children,
}: {
  children: React.ReactNode;
}) => <StyledProgressSection>{children}</StyledProgressSection>;

export const TituloProgreso = ({ children }: { children: React.ReactNode }) => (
  <CardTitle gutterBottom>{children}</CardTitle>
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
    <BodyText>{label}</BodyText>
    <BodyText color={color}>{value}%</BodyText>
  </React.Fragment>
);

// Componentes para StatsCard.tsx
export const TarjetaEstadistica = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  [key: string]: unknown;
}) => (
  <StyledStatsCard onClick={onClick} {...props}>
    {children}
  </StyledStatsCard>
);

export const IconoEstadisticaCard = ({
  children,
  bgColor,
  color,
}: {
  children: React.ReactNode;
  bgColor: string;
  color: string;
}) => <div style={{ backgroundColor: bgColor, color: color }}>{children}</div>;

export const TituloEstadistica = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <CardTitle component='h2' gutterBottom>
    {children}
  </CardTitle>
);

export const ValorEstadistica = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <StatValue component='p' color='primary' sx={{ fontWeight: 600 }}>
    {children}
  </StatValue>
);

export const TextoTendencia = ({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 'up' | 'down';
}) => (
  <CaptionText color={direction === 'up' ? 'success.main' : 'error.main'}>
    {children}
  </CaptionText>
);

export const TextoError = ({ children }: { children: React.ReactNode }) => (
  <BodyText color='error'>{children}</BodyText>
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
  <PageTitle component='h1' gutterBottom sx={{ fontWeight: 600 }}>
    {children}
  </PageTitle>
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
