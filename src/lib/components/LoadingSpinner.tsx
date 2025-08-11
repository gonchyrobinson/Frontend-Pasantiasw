import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 4,
      }}
    >
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography variant='body2' color='text.secondary'>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
