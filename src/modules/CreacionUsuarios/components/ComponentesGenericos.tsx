import React from 'react';
import { Alert } from '@mui/material';
import {
  ContenedorPrincipalStyled,
  TarjetaRegistroStyled,
  TituloRegistroStyled,
} from './StyledComponents';

// Container Components
export const ContenedorPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => <ContenedorPrincipalStyled>{children}</ContenedorPrincipalStyled>;

export const TarjetaRegistro = ({
  children,
}: {
  children: React.ReactNode;
}) => <TarjetaRegistroStyled elevation={6}>{children}</TarjetaRegistroStyled>;

// Typography Components
export const TituloRegistro = ({ children }: { children: React.ReactNode }) => (
  <TituloRegistroStyled variant='h4' component='h1' gutterBottom align='center'>
    {children}
  </TituloRegistroStyled>
);

// Alert Components
export const AlertaError = ({ mensaje }: { mensaje: string }) => (
  <Alert severity='error' sx={{ mb: 3, borderRadius: 1 }}>
    {mensaje}
  </Alert>
);
