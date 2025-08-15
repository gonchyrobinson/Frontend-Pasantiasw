import { styled } from '@mui/material/styles';
import {
  Container,
  Card,
  CardContent,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import {
  CardTitle,
  BodyText,
  CaptionText,
  StatValue,
} from '../../../lib/components/StyledText';

// Contenedor principal del módulo
export const ContenedorPrincipalStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

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

// Título del expediente
export const TituloExpedienteStyled = styled(CardTitle)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

// Información de la empresa
export const InfoEmpresaStyled = styled(BodyText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

// Fechas del convenio
export const FechasConvenioStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

// Fecha individual
export const FechaStyled = styled(CaptionText)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

// Chip de estado
export const ChipEstadoStyled = styled(Chip)(({ theme }) => ({
  alignSelf: 'flex-start',
  marginTop: theme.spacing(1),
}));

// Contenedor de acciones
export const ContenedorAccionesStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// Botón de acción
export const BotonAccionStyled = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Contenedor de estadísticas
export const ContenedorEstadisticasStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

// Tarjeta de estadística
export const TarjetaEstadisticaStyled = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

// Título de estadística
export const TituloEstadisticaStyled = styled(CaptionText)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// Valor de estadística
export const ValorEstadisticaStyled = styled(StatValue)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
}));

// Contenedor de filtros
export const ContenedorFiltrosStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
}));

// Contenedor de búsqueda
export const ContenedorBusquedaStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

// Contenedor de grid
export const ContenedorGridStyled = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(2),
}));

// Contenedor de formulario
export const ContenedorFormularioStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

// Título del formulario
export const TituloFormularioStyled = styled(CardTitle)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  fontWeight: 600,
}));

// Contenedor de botones del formulario
export const ContenedorBotonesFormularioStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// Contenedor de diálogo
export const ContenedorDialogoStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minWidth: '400px',
}));

// Contenedor de confirmación
export const ContenedorConfirmacionStyled = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

// Mensaje de confirmación
export const MensajeConfirmacionStyled = styled(BodyText)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
}));

// Contenedor de acciones de confirmación
export const ContenedorAccionesConfirmacionStyled = styled(Box)(
  ({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
  })
);
