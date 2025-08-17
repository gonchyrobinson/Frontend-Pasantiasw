import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab,
  Tooltip,
  Alert,
  Box,
  Chip,
} from '@mui/material';
import { Add, Clear } from '@mui/icons-material';
import { BodyText, PageTitle, CaptionText, CardTitle } from './StyledText';
import { CenteredContainer } from './StyledContainers';

// ===== DIALOG COMPONENTS =====

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  severity?: 'warning' | 'error' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  severity = 'warning',
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth='sm' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <BodyText>{message}</BodyText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button
          onClick={onConfirm}
          color={
            severity === 'error'
              ? 'error'
              : severity === 'warning'
                ? 'warning'
                : 'primary'
          }
          variant='contained'
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// ===== FLOATING ACTION BUTTON =====

interface FloatingActionButtonProps {
  onClick: () => void;
  tooltip?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  'aria-label'?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  tooltip = 'Crear nuevo',
  icon = <Add />,
  color = 'primary',
  'aria-label': ariaLabel = 'add',
}) => {
  return (
    <Tooltip title={tooltip}>
      <Fab
        color={color}
        aria-label={ariaLabel}
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        {icon}
      </Fab>
    </Tooltip>
  );
};

// ===== ALERT COMPONENTS =====

interface AlertaErrorProps {
  mensaje: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  sx?: Record<string, unknown>;
}

export const AlertaError: React.FC<AlertaErrorProps> = ({
  mensaje,
  severity = 'error',
  sx = {},
}) => (
  <Alert severity={severity} sx={{ mb: 3, borderRadius: 1, ...sx }}>
    {mensaje}
  </Alert>
);

// ===== CONTAINER COMPONENTS =====

interface ContenedorPrincipalProps {
  children: React.ReactNode;
  background?: string;
  minHeight?: string;
  sx?: Record<string, unknown>;
}

export const ContenedorPrincipal: React.FC<ContenedorPrincipalProps> = ({
  children,
  background,
  minHeight = '100vh',
  sx = {},
}) => (
  <CenteredContainer
    sx={{
      minHeight,
      background: background || 'transparent',
      ...sx,
    }}
  >
    {children}
  </CenteredContainer>
);

// ===== TYPOGRAPHY COMPONENTS =====

interface TituloGradienteProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  component?: React.ElementType;
  align?: 'left' | 'center' | 'right';
  sx?: Record<string, unknown>;
  fontWeight?: number;
  gradientColors?: string;
}

export const TituloGradiente: React.FC<TituloGradienteProps> = ({
  children,
  variant = 'h4',
  component = 'h1',
  align = 'center',
  fontWeight = 700,
  gradientColors = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  sx = {},
}) => (
  <PageTitle
    variant={variant}
    component={component}
    align={align}
    gutterBottom
    sx={{
      fontWeight,
      background: gradientColors,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: 1,
      ...sx,
    }}
  >
    {children}
  </PageTitle>
);

interface TextoFooterProps {
  children: React.ReactNode;
  color?: string;
  sx?: Record<string, unknown>;
}

export const TextoFooter: React.FC<TextoFooterProps> = ({
  children,
  color = 'text.secondary',
  sx = {},
}) => (
  <CaptionText color={color} sx={sx}>
    {children}
  </CaptionText>
);

// ===== DECORATIVE COMPONENTS =====

interface ElementoDecorativoProps {
  variant?: 1 | 2;
  sx?: Record<string, unknown>;
}

export const ElementoDecorativo: React.FC<ElementoDecorativoProps> = ({
  variant = 1,
  sx = {},
}) => (
  <Box
    sx={{
      position: 'absolute',
      ...(variant === 1
        ? {
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
          }
        : {
            bottom: '-30%',
            right: '-30%',
            width: '160%',
            height: '160%',
            background:
              'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite reverse',
          }),
      ...sx,
    }}
  />
);

// ===== LAYOUT COMPONENTS =====

interface TarjetaCentralProps {
  children: React.ReactNode;
  elevation?: number;
  maxWidth?: string | number;
  padding?: number;
  background?: string;
  borderRadius?: number;
  sx?: Record<string, unknown>;
}

export const TarjetaCentral: React.FC<TarjetaCentralProps> = ({
  children,
  elevation = 6,
  maxWidth = 420,
  padding = 3,
  background = 'rgba(255, 255, 255, 0.95)',
  borderRadius = 3,
  sx = {},
}) => (
  <Box
    component='div'
    sx={{
      width: '100%',
      maxWidth,
      padding,
      borderRadius,
      background,
      backdropFilter: 'blur(10px)',
      boxShadow: `0 ${elevation * 2}px ${elevation * 4}px rgba(0,0,0,0.1)`,
      position: 'relative',
      zIndex: 1,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 ${elevation * 3}px ${elevation * 6}px rgba(0,0,0,0.15)`,
      },
      ...sx,
    }}
  >
    {children}
  </Box>
);

// ===== FORM COMPONENTS =====

interface HeaderFormularioProps {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  marginBottom?: number;
}

export const HeaderFormulario: React.FC<HeaderFormularioProps> = ({
  children,
  textAlign = 'center',
  marginBottom = 3,
}) => <Box sx={{ textAlign, mb: marginBottom }}>{children}</Box>;

interface FooterFormularioProps {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  marginTop?: number;
  paddingTop?: number;
  borderTop?: boolean;
}

export const FooterFormulario: React.FC<FooterFormularioProps> = ({
  children,
  textAlign = 'center',
  marginTop = 3,
  paddingTop = 2,
  borderTop = true,
}) => (
  <Box
    sx={{
      textAlign,
      mt: marginTop,
      pt: paddingTop,
      ...(borderTop && {
        borderTop: '1px solid rgba(0,0,0,0.1)',
      }),
    }}
  >
    {children}
  </Box>
);

// ===== COMMON MODULE COMPONENTS =====

// Typography Components
export const TituloPrincipal = ({
  children,
  variant = 'h6',
}: {
  children: React.ReactNode;
  variant?: 'h4' | 'h5' | 'h6';
}) => (
  <PageTitle variant={variant} gutterBottom>
    {children}
  </PageTitle>
);

export const TituloSecundario = ({
  children,
}: {
  children: React.ReactNode;
}) => <CardTitle gutterBottom>{children}</CardTitle>;

export const Subtitulo = ({ children }: { children: React.ReactNode }) => (
  <BodyText color='text.secondary' gutterBottom>
    {children}
  </BodyText>
);

export const TextoPrincipal = ({ children }: { children: React.ReactNode }) => (
  <BodyText>{children}</BodyText>
);

export const TextoSecundario = ({
  children,
}: {
  children: React.ReactNode;
}) => <BodyText color='text.secondary'>{children}</BodyText>;

export const ValorEstadistica = ({
  children,
  color = 'primary',
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <BodyText component='div' sx={{ color: `${color}.main`, fontWeight: 'bold' }}>
    {children}
  </BodyText>
);

// Common Chip Components
export const ChipEstadistica = ({ label }: { label: string }) => (
  <Chip label={label} variant='outlined' size='small' color='primary' />
);

export const ChipLimpiarFiltros = ({ onDelete }: { onDelete: () => void }) => (
  <Chip
    label='Limpiar filtros'
    size='small'
    variant='outlined'
    deleteIcon={<Clear />}
    onDelete={onDelete}
    onClick={onDelete}
  />
);

export const TituloSeccion = ({ children }: { children: React.ReactNode }) => (
  <PageTitle
    variant='h5'
    component='h2'
    sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}
  >
    {children}
  </PageTitle>
);

// ===== KEYFRAMES FOR ANIMATIONS =====
// Agregar al final del archivo para las animaciones
const globalStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

// Inyectar estilos globales
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = globalStyles;
  document.head.appendChild(style);
}
