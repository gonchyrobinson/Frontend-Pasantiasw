import { styled } from '@mui/material/styles';
import { Card, Box, Grid, SpeedDial, CardContent, Chip } from '@mui/material';
import {
  SectionTitle,
  PageTitle,
  Subtitle,
} from '../../../lib/components/StyledText';

// Styled components para ActionCard
export const StyledActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const StatIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  marginBottom: theme.spacing(1),
}));

// Styled components para ProgressSection
export const StyledProgressSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  width: '100%',
}));

// Styled components para StatsCard
export const StyledStatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

// Styled components para WelcomeSection
export const StyledWelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
}));

// Solo mantener componentes específicos de Inicio

// Componentes específicos para el dashboard
export const ContenedorGridStyled = styled(Grid)(() => ({
  marginBottom: 32,
}));

export const TituloSeccionStyled = styled(SectionTitle)(() => ({
  marginTop: 32,
}));

export const SpeedDialStyled = styled(SpeedDial)(() => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
}));

// Componentes específicos del Welcome section
export const TituloBienvenidaStyled = styled(PageTitle)(() => ({
  fontWeight: 600,
}));

export const SubtituloBienvenidaStyled = styled(Subtitle)(() => ({
  opacity: 0.9,
}));

export const ChipStyled = styled(Chip)(() => ({
  marginTop: 16,
}));

// Styled components para ActionCard.tsx
export const CardContentStyled = styled(CardContent)(() => ({
  flexGrow: 1,
}));

export const BoxFlexStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16, // mb: 2
}));

// Styled components para StatsCard.tsx
export const BoxFlexGapStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4, // gap: 0.5
}));

export const BoxFlexBetweenStatsStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16, // mb: 2
}));

// Styled components para ProgressSection.tsx
export const BoxFlexBetweenStyled = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 16, // mb: 1
}));
