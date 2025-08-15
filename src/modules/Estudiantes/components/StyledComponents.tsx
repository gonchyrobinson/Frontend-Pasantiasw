import { styled } from '@mui/material/styles';
import { TextField, Button, Fab } from '@mui/material';
import {
  SectionContainer,
  CardContainer,
  FlexContainer,
  CenteredContainer,
} from '../../../lib/components/StyledContainers';
import { SectionTitle } from '../../../lib/components/StyledText';

export const EmptyStateStyled = styled(CenteredContainer)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  color: theme.palette.text.secondary,
}));

export const TituloPrincipalStyled = styled(SectionTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ContenedorPrincipalStyled = styled(SectionContainer)(
  ({ theme }) => ({
    marginBottom: theme.spacing(4),
  })
);

export const ContenedorFiltrosStyled = styled(SectionContainer)(
  ({ theme }) => ({
    marginBottom: theme.spacing(3),
  })
);

export const ContenedorEstadisticasStyled = styled(SectionContainer)(
  ({ theme }) => ({
    marginTop: theme.spacing(2),
  })
);

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

export const TarjetaEstadisticaStyled = styled(CardContainer)<{
  color?: string;
}>(({ theme, color = 'primary' }) => ({
  textAlign: 'center',
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
}));

export const ContenedorLoadingStyled = styled(CenteredContainer)(() => ({
  minHeight: 400,
}));

export const ContenedorHeaderStyled = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

export const BotonNuevoEstudianteStyled = styled(Button)(() => ({
  marginLeft: 'auto',
}));

export const FabStyled = styled(Fab)(() => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
}));

export const ContenedorLoading = styled(CenteredContainer)(() => ({
  minHeight: 400,
}));
