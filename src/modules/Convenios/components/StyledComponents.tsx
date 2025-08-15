import { styled } from '@mui/material/styles';
import { Card, CardContent, Chip } from '@mui/material';
import {
  FlexContainer,
  ActionContainer,
  CenteredContainer,
} from '../../../lib/components/StyledContainers';
import { CardTitle, BodyText } from '../../../lib/components/StyledText';

// Tarjeta de convenio
export const TarjetaConvenioStyled = styled(Card)(({ theme }) => ({
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

// Contenido de la tarjeta de convenio
export const ContenidoTarjetaStyled = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

// Título del expediente - específico con color primary
export const TituloExpedienteStyled = styled(CardTitle)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

// Información de la empresa - específico
export const InfoEmpresaStyled = styled(BodyText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

// Fechas del convenio - específico
export const FechasConvenioStyled = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

// Chip de estado - específico
export const ChipEstadoStyled = styled(Chip)(({ theme }) => ({
  alignSelf: 'flex-start',
  marginTop: theme.spacing(1),
}));

// Contenedor de búsqueda - específico para convenios
export const ContenedorBusquedaStyled = styled(FlexContainer)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// Contenedor de acciones - específico con border top
export const ContenedorAccionesStyled = styled(ActionContainer)(
  ({ theme }) => ({
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
  })
);

// Título del formulario - específico con color primary
export const TituloFormularioStyled = styled(CardTitle)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

// Contenedor de botones del formulario - específico con border top
export const ContenedorBotonesFormularioStyled = styled(ActionContainer)(
  ({ theme }) => ({
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  })
);

// Contenedor de confirmación - específico
export const ContenedorConfirmacionStyled = styled(CenteredContainer)(
  ({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(2),
  })
);
