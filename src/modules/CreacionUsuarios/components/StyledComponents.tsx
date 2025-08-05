import { styled } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

export const ContenedorPrincipalStyled = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}));

export const TarjetaRegistroStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 450,
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
}));

export const TituloRegistroStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(3),
}));
