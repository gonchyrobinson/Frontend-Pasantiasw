import { styled } from '@mui/material/styles';
import {
  Card,
  Box,
  Container,
  Grid,
  Alert,
  SpeedDial,
  CardContent,
  Chip,
} from '@mui/material';
import {
  SectionTitle,
  BodyText,
  StatValue,
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
}));

// Styled components para Inicio
export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

// Styled components para ComponentesGenericos.tsx
export const ContenedorGridStyled = styled(Grid)(() => ({
  marginBottom: 32, // mb: 4
}));

export const TituloSeccionStyled = styled(SectionTitle)(() => ({
  marginTop: 32, // mt: 4
}));

export const AlertaErrorStyled = styled(Alert)(() => ({
  marginTop: 24, // mt: 3
}));

export const SpeedDialStyled = styled(SpeedDial)(() => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
}));

export const IconoEstadisticaStyled = styled(StatIcon)(() => ({
  marginRight: 16,
  // mr: 2
}));

export const DescripcionAccionStyled = styled(BodyText)(() => ({
  marginBottom: 16, // mb: 2
}));

export const BotonAccionStyled = styled(BodyText)(() => ({
  textTransform: 'none',
}));

export const IconoEstadisticaCardStyled = styled(StatIcon)(() => ({}));

export const ValorEstadisticaStyled = styled(StatValue)(() => ({
  fontWeight: 600,
}));

export const TituloBienvenidaStyled = styled(PageTitle)(() => ({
  fontWeight: 600,
}));

export const SubtituloBienvenidaStyled = styled(Subtitle)(() => ({
  opacity: 0.9,
}));

export const ChipStyled = styled(Chip)(() => ({
  marginTop: 16, // mt: 2
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
