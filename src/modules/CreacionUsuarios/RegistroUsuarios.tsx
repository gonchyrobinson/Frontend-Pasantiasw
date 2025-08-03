import { useState } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';
import { authHelper } from '../../helpers/authHelper';
import { useNavigation } from '../../hooks/useNavigation';
import { FormularioGenerico, FormMetadata } from '../../FormularioGenerico';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistroUsuarios = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { redirectAfterLogin } = useNavigation();

  const registerMetadata: FormMetadata = {
    submitButtonText: 'Registrarse',
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Usuario',
        placeholder: 'Ingrese su usuario',
        validations: {
          required: 'Usuario es requerido',
          minLength: {
            value: 3,
            message: 'Usuario debe tener al menos 3 caracteres',
          },
        },
        gridSize: 12,
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Ingrese su email',
        validations: {
          required: 'Email es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido',
          },
        },
        gridSize: 12,
      },
      {
        name: 'password',
        type: 'password',
        label: 'Contraseña',
        placeholder: 'Ingrese su contraseña',
        validations: {
          required: 'Contraseña es requerida',
          minLength: {
            value: 6,
            message: 'Contraseña debe tener al menos 6 caracteres',
          },
        },
        gridSize: 12,
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirmar Contraseña',
        placeholder: 'Confirme su contraseña',
        validations: {
          required: 'Confirmar contraseña es requerido',
        },
        gridSize: 12,
      },
    ],
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const registerData = data as unknown as RegisterData;

    if (registerData.password !== registerData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/v1/authn/register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      authHelper.saveToken(response.data.token);
      redirectAfterLogin();
    } catch (error: unknown) {
      // Manejo específico para errores de Axios
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message || 'Error de registro');
      } else {
        setError('Error de registro');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 450,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        }}
      >
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          align='center'
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 3,
          }}
        >
          Crear Cuenta
        </Typography>

        {error && (
          <Alert severity='error' sx={{ mb: 3, borderRadius: 1 }}>
            {error}
          </Alert>
        )}

        <FormularioGenerico
          metadata={registerMetadata}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Paper>
    </Box>
  );
};

export default RegistroUsuarios;
