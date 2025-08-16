import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Subtitle } from '../../../lib/components/StyledText';
import {
  ContenedorPrincipal as ContenedorBase,
  ElementoDecorativo,
  TarjetaCentral,
  HeaderFormulario,
  TituloGradiente,
  AlertaError,
  FooterFormulario,
} from '../../../lib/components/ComponentesGenericos';
import { BodyText } from '../../../lib/components/StyledText';
import { ROUTES } from '../../../helpers/routesHelper';

// Componentes para Login.tsx con configuración específica
export const ContenedorLogin = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ContenedorBase
    background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    sx={{
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </ContenedorBase>
);

export const DecoracionFondo1 = () => <ElementoDecorativo variant={1} />;

export const DecoracionFondo2 = () => <ElementoDecorativo variant={2} />;

export const TarjetaPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <TarjetaCentral
    maxWidth={420}
    borderRadius={3}
    background='rgba(255, 255, 255, 0.95)'
    sx={{
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    }}
  >
    {children}
  </TarjetaCentral>
);

export const HeaderLogin = ({ children }: { children: React.ReactNode }) => (
  <HeaderFormulario>{children}</HeaderFormulario>
);

export const TituloLogin = ({ children }: { children: React.ReactNode }) => (
  <TituloGradiente component='h1' fontWeight={700}>
    {children}
  </TituloGradiente>
);

export const SubtituloLogin = ({ children }: { children: React.ReactNode }) => (
  <Subtitle sx={{ opacity: 0.8 }}>{children}</Subtitle>
);

export const AlertaErrorLogin = ({ mensaje }: { mensaje: string }) => (
  <AlertaError
    mensaje={mensaje}
    sx={{
      mb: 3,
      borderRadius: 2,
      '& .MuiAlert-icon': {
        color: 'error.main',
      },
    }}
  />
);

export const FooterLogin = ({ children }: { children: React.ReactNode }) => (
  <FooterFormulario>{children}</FooterFormulario>
);

export { TextoFooter } from '../../../lib/components/ComponentesGenericos';

export const EnlaceRegistroLogin = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  return (
    <BodyText
      sx={{
        color: 'primary.main',
        cursor: 'pointer',
        fontWeight: 600,
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
      onClick={() => navigate(ROUTES.REGISTRAR_USUARIO)}
    >
      {children}
    </BodyText>
  );
};
