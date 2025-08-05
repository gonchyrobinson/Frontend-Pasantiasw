import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Alert } from '@mui/material';

// Styled components para Login.tsx
export const ContenedorPrincipal = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
  overflow: 'hidden',
}));

export const ElementoDecorativo1 = styled(Box)(() => ({
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  width: '200%',
  height: '200%',
  background:
    'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
  animation: 'float 6s ease-in-out infinite',
}));

export const ElementoDecorativo2 = styled(Box)(() => ({
  position: 'absolute',
  bottom: '-30%',
  right: '-30%',
  width: '160%',
  height: '160%',
  background:
    'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
  animation: 'float 8s ease-in-out infinite reverse',
}));

export const TarjetaLogin = styled(Paper)(() => ({
  padding: 32, // p: 4
  width: '100%',
  maxWidth: 420,
  borderRadius: 24, // borderRadius: 3
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  zIndex: 1,
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
  },
}));

export const HeaderFormulario = styled(Box)(() => ({
  textAlign: 'center',
  marginBottom: 24, // mb: 3
}));

export const TituloBienvenida = styled(Typography)(() => ({
  fontWeight: 700,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: 8, // mb: 1
}));

export const SubtituloBienvenida = styled(Typography)(() => ({
  opacity: 0.8,
}));

export const AlertaError = styled(Alert)(() => ({
  marginBottom: 24, // mb: 3
  borderRadius: 16, // borderRadius: 2
  '& .MuiAlert-icon': {
    color: 'error.main',
  },
}));

export const FooterFormulario = styled(Box)(() => ({
  textAlign: 'center',
  marginTop: 24, // mt: 3
  paddingTop: 16, // pt: 2
  borderTop: '1px solid rgba(0,0,0,0.1)',
}));

export const EnlaceRegistro = styled(Typography)(() => ({
  color: 'primary.main',
  cursor: 'pointer',
  fontWeight: 600,
  '&:hover': {
    textDecoration: 'underline',
  },
}));
