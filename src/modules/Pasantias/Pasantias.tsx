import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Pasantias: React.FC = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Gestión de Pasantías
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Módulo para gestionar pasantías estudiantiles.
        </Typography>
      </Box>
    </Container>
  );
};

export default Pasantias;
