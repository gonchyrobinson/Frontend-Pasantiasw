import { useState } from 'react';
import { Box, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';
import { authHelper } from '../../helpers/authHelper';
import { LoginCredentials } from '../../types';
import { useNavigation } from '../../hooks/useNavigation';
import { FormularioGenerico, FormMetadata } from '../../FormularioGenerico';

const Login = () => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const { redirectAfterLogin } = useNavigation();

  const loginMetadata: FormMetadata = {
    submitButtonText: 'Iniciar Sesión',
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Usuario',
        placeholder: 'Ingrese su usuario',
        validations: {
          required: 'El usuario es requerido',
        },
        gridSize: 12,
      },
      {
        name: 'password',
        type: 'password',
        label: 'Contraseña',
        placeholder: 'Ingrese su contraseña',
        validations: {
          required: 'La contraseña es requerida',
        },
        gridSize: 12,
      },
    ],
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const loginData = data as unknown as LoginCredentials;

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/v1/authn/login', loginData);
      authHelper.saveToken(response.data.token);
      redirectAfterLogin();
    } catch (error: unknown) {
      // Manejo específico para errores de Axios
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message || 'Error de autenticación'
        );
      } else {
        setError('Error de autenticación');
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Elementos decorativos de fondo */}
      <Box
        sx={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          right: '-30%',
          width: '160%',
          height: '160%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
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
        }}
      >
        {/* Header del formulario */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
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
            Bienvenido
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ opacity: 0.8 }}
          >
            Ingresa tus credenciales para continuar
          </Typography>
        </Box>

        {error && (
          <Alert
            severity='error'
            sx={{
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-icon': {
                color: 'error.main',
              },
            }}
          >
            {error}
          </Alert>
        )}

        <FormularioGenerico
          metadata={loginMetadata}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* Footer del formulario */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 3,
            pt: 2,
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant='caption' color='text.secondary'>
            ¿No tienes cuenta?{' '}
            <Box
              component='span'
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Regístrate aquí
            </Box>
          </Typography>
        </Box>
      </Paper>

      {/* Estilos CSS para animaciones */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default Login;
