import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper, Stack, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Refresh, BugReport, Home, ArrowBack } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Styled components
const ErrorContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const ErrorCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 600,
  width: '100%',
  boxShadow: theme.shadows[8],
  borderRadius: theme.spacing(2),
}));

const ErrorIcon = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

const ErrorActions = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(3),
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const ErrorDetails = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  textAlign: 'left',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  maxHeight: 200,
  overflow: 'auto',
}));

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer maxWidth="md">
          <ErrorCard elevation={8}>
            <ErrorIcon>
              <BugReport fontSize="inherit" />
            </ErrorIcon>
            
            <Typography variant="h4" component="h1" gutterBottom color="error">
              Algo salió mal
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y estamos trabajando para solucionarlo.
            </Typography>

            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
              <Chip 
                label="Error de aplicación" 
                color="error" 
                variant="outlined" 
                size="small"
              />
              <Chip 
                label="Notificado automáticamente" 
                color="info" 
                variant="outlined" 
                size="small"
              />
            </Stack>

            <ErrorActions direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleRetry}
                sx={{ textTransform: 'none' }}
              >
                Reintentar
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={this.handleGoBack}
                sx={{ textTransform: 'none' }}
              >
                Volver
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={this.handleGoHome}
                sx={{ textTransform: 'none' }}
              >
                Ir al Inicio
              </Button>
            </ErrorActions>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <ErrorDetails>
                <Typography variant="subtitle2" gutterBottom>
                  Detalles del error (solo en desarrollo):
                </Typography>
                <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                  {this.state.error.toString()}
                </Typography>
                {this.state.errorInfo && (
                  <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                    {this.state.errorInfo.componentStack}
                  </Typography>
                )}
              </ErrorDetails>
            )}
          </ErrorCard>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 