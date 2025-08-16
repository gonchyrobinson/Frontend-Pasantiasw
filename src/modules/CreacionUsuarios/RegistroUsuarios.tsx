import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../Shared/apis/apiClient';
import { authHelper } from '../../helpers/authHelper';
import { useNavigation } from '../../lib/hooks/useNavigation';
import { FormularioGenerico } from '../../FormularioGenerico';
import { ROUTES } from '../../helpers/routesHelper';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import {
  ContenedorPrincipal,
  TarjetaRegistro,
} from './components/ComponentesGenericos';
import {
  getRegistroMetadata,
  validatePasswords,
  handleRegistrationError,
} from './helpers/registroHelpers';
import { RegisterData } from './types';

const RegistroUsuarios = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { redirectAfterLogin } = useNavigation();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const registerMetadata = getRegistroMetadata();

  const handleSubmit = async (data: Record<string, unknown>) => {
    const passwordError = validatePasswords(data);
    if (passwordError) {
      showError(passwordError);
      return;
    }

    setLoading(true);

    try {
      const registerData = data as unknown as RegisterData;
      const result = await apiClient.post<{ token: string }>(
        '/v1/authn/register',
        {
          username: registerData.username,
          email: registerData.email,
          password: registerData.password,
        }
      );

      authHelper.saveToken(result.token);
      showSuccess('Usuario registrado exitosamente');

      setTimeout(() => {
        redirectAfterLogin();
      }, 2000);
    } catch (error: unknown) {
      const errorMessage = handleRegistrationError(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegresar = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <ContenedorPrincipal>
      <TarjetaRegistro>
        <FormularioGenerico
          metadata={registerMetadata}
          onSubmit={handleSubmit}
          loading={loading}
          onCancel={handleRegresar}
        />
      </TarjetaRegistro>

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </ContenedorPrincipal>
  );
};

export default RegistroUsuarios;
