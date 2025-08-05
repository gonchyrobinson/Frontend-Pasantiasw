import React from 'react';
import { Typography } from '@mui/material';
import {
  ContenedorPrincipal,
  ElementoDecorativo1,
  ElementoDecorativo2,
  TarjetaLogin,
  HeaderFormulario,
  SubtituloBienvenida,
  AlertaError,
  FooterFormulario,
  EnlaceRegistro,
} from './StyledComponents';
import { ROUTES } from '@/helpers/routesHelper';
import { useNavigate } from 'react-router-dom';

// Componentes para Login.tsx
export const ContenedorLogin = ({
  children,
}: {
  children: React.ReactNode;
}) => <ContenedorPrincipal>{children}</ContenedorPrincipal>;

export const DecoracionFondo1 = () => <ElementoDecorativo1 />;

export const DecoracionFondo2 = () => <ElementoDecorativo2 />;

export const TarjetaPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => <TarjetaLogin elevation={8}>{children}</TarjetaLogin>;

export const HeaderLogin = ({ children }: { children: React.ReactNode }) => (
  <HeaderFormulario>{children}</HeaderFormulario>
);

export const TituloLogin = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant='h4'
    component='h1'
    sx={{
      fontWeight: 700,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      mb: 1,
    }}
  >
    {children}
  </Typography>
);

export const SubtituloLogin = ({ children }: { children: React.ReactNode }) => (
  <SubtituloBienvenida variant='body2' color='text.secondary'>
    {children}
  </SubtituloBienvenida>
);

export const AlertaErrorLogin = ({ mensaje }: { mensaje: string }) => (
  <AlertaError severity='error'>{mensaje}</AlertaError>
);

export const FooterLogin = ({ children }: { children: React.ReactNode }) => (
  <FooterFormulario>{children}</FooterFormulario>
);

export const TextoFooter = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='caption' color='text.secondary'>
    {children}
  </Typography>
);

export const EnlaceRegistroLogin = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  return (
    <EnlaceRegistro
      variant='body2'
      onClick={() => navigate(ROUTES.REGISTRAR_USUARIO)}
    >
      {children}
    </EnlaceRegistro>
  );
};
