import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, TextField, Button, Fab } from '@mui/material';

export const EmptyStateStyled = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  color: theme.palette.text.secondary,
}));

export const TituloPrincipalStyled = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ContenedorPrincipalStyled = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ContenedorFiltrosStyled = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const ContenedorEstadisticasStyled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ContenedorIconoStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
}));

export const ContenedorChipsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

export const ContenedorFiltrosInfoStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const TarjetaEstadisticaStyled = styled(Paper)<{ color?: string }>(
  ({ theme, color = 'primary' }) => ({
    padding: theme.spacing(2),
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
  })
);

export const CampoBusquedaStyled = styled(TextField)(({ theme }) => ({
  '& .MuiInputAdornment-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export const ContenedorLoadingStyled = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
}));

export const ContenedorHeaderStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
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

export const ContenedorLoading = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 400,
}));
