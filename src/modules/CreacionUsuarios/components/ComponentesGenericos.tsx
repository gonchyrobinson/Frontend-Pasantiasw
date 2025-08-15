import React from 'react';
import {
  ContenedorPrincipal as ContenedorBase,
  TarjetaCentral,
  TituloGradiente,
  AlertaError as AlertaErrorBase,
} from '../../../components/ComponentesGenericos';

// Container Components con configuración específica para CreacionUsuarios
export const ContenedorPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ContenedorBase
    background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {children}
  </ContenedorBase>
);

export const TarjetaRegistro = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <TarjetaCentral
    maxWidth={450}
    padding={4}
    borderRadius={2}
    background='rgba(255, 255, 255, 0.95)'
    sx={{
      backdropFilter: 'blur(10px)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    }}
  >
    {children}
  </TarjetaCentral>
);

// Typography Components
export const TituloRegistro = ({ children }: { children: React.ReactNode }) => (
  <TituloGradiente variant='h4' fontWeight={600} sx={{ mb: 3 }}>
    {children}
  </TituloGradiente>
);

// Alert Components
export const AlertaError = AlertaErrorBase;
