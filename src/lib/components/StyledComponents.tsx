import { styled } from '@mui/material/styles';
import { Card, TextField, Fab, IconButton, Alert } from '@mui/material';
import {
  SectionContainer,
  CardContainer,
  CenteredContainer,
  FlexContainer,
} from './StyledContainers';

// COMMON EMPTY STATE
export const EmptyStateStyled = styled(CenteredContainer)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  color: theme.palette.text.secondary,
  minHeight: '200px',
}));

// COMMON LOADING CONTAINER
export const ContenedorLoadingStyled = styled(CenteredContainer)(() => ({
  minHeight: 400,
}));

// COMMON STATS CARD
export const TarjetaEstadisticaStyled = styled(Card)<{
  color?: string;
}>(({ theme, color = 'primary' }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid`,
  borderColor:
    color === 'primary'
      ? theme.palette.primary.light
      : color === 'success'
        ? theme.palette.success.light
        : color === 'error'
          ? theme.palette.error.light
          : color === 'warning'
            ? theme.palette.warning.light
            : theme.palette.primary.light,
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

// COMMON SEARCH FIELD
export const CampoBusquedaStyled = styled(TextField)(({ theme }) => ({
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.default,
  },
}));

// COMMON FAB
export const FabStyled = styled(Fab)(() => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
}));

// COMMON HEADER CONTAINER
export const ContenedorHeaderStyled = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

// COMMON STATS CONTAINER
export const ContenedorEstadisticasStyled = styled(SectionContainer)(
  ({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  })
);

// COMMON GRID CONTAINER
export const ContenedorGridStyled = styled(SectionContainer)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(2),
}));

// COMMON FILTERS CONTAINER
export const ContenedorFiltrosStyled = styled(CardContainer)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

// COMMON ALERT ERROR
export const AlertaErrorStyled = styled(Alert)(() => ({
  marginTop: 24,
}));

// COMMON ACTION BUTTON
export const BotonAccionStyled = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Existing component
export const ItemDetailsBoxStyled = styled(SectionContainer)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[300]}`,
}));
