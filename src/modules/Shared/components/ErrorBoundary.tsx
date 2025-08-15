import { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { PageTitle, BodyText } from '../../../lib/components/StyledText';
import { Refresh as RefreshIcon } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              maxWidth: 500,
            }}
          >
            <PageTitle component='h1' gutterBottom color='error'>
              Algo salió mal
            </PageTitle>
            <BodyText color='text.secondary' sx={{ mb: 3 }}>
              Ha ocurrido un error inesperado. Por favor, intenta recargar la
              página.
            </BodyText>
            {this.state.error && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <BodyText color='text.secondary'>
                  Error: {this.state.error.message}
                </BodyText>
              </Box>
            )}
            <Button
              variant='contained'
              startIcon={<RefreshIcon />}
              onClick={this.handleReload}
            >
              Recargar Página
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
