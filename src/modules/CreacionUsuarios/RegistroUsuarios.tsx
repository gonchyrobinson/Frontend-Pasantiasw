import { useState } from 'react';
import axios from 'axios';
import { authHelper } from '../../helpers/authHelper';
import { useNavigation } from '../../hooks/useNavigation';
import { FormularioGenerico } from '../../FormularioGenerico';
import {
  ContenedorPrincipal,
  TarjetaRegistro,
  TituloRegistro,
  AlertaError,
} from './components/ComponentesGenericos';
import {
  getRegistroMetadata,
  validatePasswords,
  handleRegistrationError,
} from './helpers/registroHelpers';
import { RegisterData } from './types';

const RegistroUsuarios = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { redirectAfterLogin } = useNavigation();

  const registerMetadata = getRegistroMetadata();

  const handleSubmit = async (data: Record<string, unknown>) => {
    const passwordError = validatePasswords(data);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const registerData = data as unknown as RegisterData;
      const response = await axios.post('/api/v1/authn/register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      authHelper.saveToken(response.data.token);
      redirectAfterLogin();
    } catch (error: unknown) {
      setError(handleRegistrationError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContenedorPrincipal>
      <TarjetaRegistro>
        <TituloRegistro>Crear Cuenta</TituloRegistro>

        {error && <AlertaError mensaje={error} />}

        <FormularioGenerico
          metadata={registerMetadata}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </TarjetaRegistro>
    </ContenedorPrincipal>
  );
};

export default RegistroUsuarios;
