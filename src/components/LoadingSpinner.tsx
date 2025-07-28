import { Box, CircularProgress, Typography, Paper, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'overlay' | 'inline';
  showBackdrop?: boolean;
}

// Styled components
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: theme.zIndex.modal,
}));

const LoadingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  minWidth: 200,
  boxShadow: theme.shadows[8],
}));

const StyledCircularProgress = styled(CircularProgress)(
  ({ theme: _theme }) => ({
    '& .MuiCircularProgress-circle': {
      strokeLinecap: 'round',
    },
  })
);

const LoadingMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: 200,
}));

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  size = 'medium',
  variant = 'inline',
  showBackdrop = false,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const _getContainerSize = () => {
    switch (size) {
      case 'small':
        return 80;
      case 'large':
        return 120;
      default:
        return 100;
    }
  };

  const loadingContent = (
    <LoadingContainer>
      <StyledCircularProgress size={getSize()} thickness={4} sx={{ mb: 2 }} />
      <LoadingMessage variant='body2'>{message}</LoadingMessage>
    </LoadingContainer>
  );

  if (variant === 'overlay') {
    return (
      <Fade in={true} timeout={300}>
        <LoadingOverlay>
          {showBackdrop ? (
            <LoadingCard elevation={8}>{loadingContent}</LoadingCard>
          ) : (
            loadingContent
          )}
        </LoadingOverlay>
      </Fade>
    );
  }

  return (
    <Fade in={true} timeout={300}>
      <LoadingContainer>
        <StyledCircularProgress size={getSize()} thickness={4} sx={{ mb: 2 }} />
        <LoadingMessage variant='body2'>{message}</LoadingMessage>
      </LoadingContainer>
    </Fade>
  );
};

export default LoadingSpinner;
