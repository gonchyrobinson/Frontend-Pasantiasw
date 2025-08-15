import React from 'react';
import { CircularProgress } from '@mui/material';
import { CenteredContainer } from './StyledContainers';
import { CaptionText } from './StyledText';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando...',
  size = 60,
  color = 'primary',
}) => {
  return (
    <CenteredContainer
      sx={{
        flexDirection: 'column',
        gap: 2,
        py: 4,
      }}
    >
      <CircularProgress size={size} color={color} />
      {message && <CaptionText>{message}</CaptionText>}
    </CenteredContainer>
  );
};

export default LoadingSpinner;
