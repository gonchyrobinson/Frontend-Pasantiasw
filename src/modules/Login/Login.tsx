import { useState } from 'react';
import { apiClient } from '../Shared/apis/apiClient';
import { authHelper } from '../../helpers/authHelper';
import { useNavigation } from '../../lib/hooks/useNavigation';
import { FormularioGenerico } from '../../lib/FormularioGenerico';

import {
  getLoginMetadata,
  handleLoginError,
  validateLoginData,
} from './helpers/loginHelpers';
import {
  ContenedorLogin,
  DecoracionFondo1,
  DecoracionFondo2,
  TarjetaPrincipal,
  HeaderLogin,
  TituloLogin,
  SubtituloLogin,
  AlertaErrorLogin,
  FooterLogin,
  TextoFooter,
  EnlaceRegistroLogin,
} from './components/ComponentesGenericos';

const Login = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { redirectAfterLogin } = useNavigation();

  const loginMetadata = getLoginMetadata();

  const handleSubmit = async (data: Record<string, unknown>) => {
    const loginData = validateLoginData(data);

    setLoading(true);
    setError('');

    try {
      const result = await apiClient.post<{ token: string }>(
        '/v1/authn/login',
        loginData
      );
      authHelper.saveToken(result.token);
      redirectAfterLogin();
    } catch (error: unknown) {
      setError(handleLoginError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContenedorLogin>
      {/* Elementos decorativos de fondo */}
      <DecoracionFondo1 />
      <DecoracionFondo2 />

      <TarjetaPrincipal>
        {/* Header del formulario */}
        <HeaderLogin>
          <TituloLogin>Bienvenido</TituloLogin>
          <SubtituloLogin>
            Ingresa tus credenciales para continuar
          </SubtituloLogin>
        </HeaderLogin>

        {error && <AlertaErrorLogin mensaje={error} />}

        <FormularioGenerico
          metadata={loginMetadata}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* Footer del formulario */}
        <FooterLogin>
          <TextoFooter>
            ¿No tienes cuenta?{' '}
            <EnlaceRegistroLogin>Regístrate aquí</EnlaceRegistroLogin>
          </TextoFooter>
        </FooterLogin>
      </TarjetaPrincipal>

      {/* Estilos CSS para animaciones */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>
    </ContenedorLogin>
  );
};

export default Login;
