import { styled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import {
  CardContainer,
  CenteredContainer,
  FlexContainer,
} from '../../../lib/components/StyledContainers';
import { SectionTitle } from '../../../lib/components/StyledText';

// Solo mantener componentes específicos de Empresas
export const TituloPrincipalStyled = styled(SectionTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ContenedorIconoStyled = styled(CenteredContainer)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const ContenedorChipsStyled = styled(FlexContainer)(() => ({
  flexWrap: 'wrap',
}));

export const ContenedorFiltrosInfoStyled = styled(FlexContainer)(
  ({ theme }) => ({
    alignItems: 'center',
    gap: theme.spacing(2),
  })
);

// Botón específico de empresas
export const BotonNuevaEmpresaStyled = styled(Button)(() => ({
  marginLeft: 'auto',
}));

// COMMON EMPTY STATE
export const EmptyStateStyled = styled(CenteredContainer)(() => ({
  minHeight: '200px',
}));

export const TarjetaEstadisticaStyled = styled(CardContainer)<{
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

export const CampoBusquedaStyled = styled(TextField)(({ theme }) => ({
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.default,
  },
}));

export const ContenedorHeaderStyled = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

// COMMON LOADING CONTAINER
export const ContenedorLoadingStyled = styled(CenteredContainer)(() => ({
  minHeight: 400,
}));
