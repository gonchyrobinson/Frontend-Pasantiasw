import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Pagos: React.FC = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Gestión de Pagos
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Módulo para gestionar pagos de pasantías.
        </Typography>
      </Box>
    </Container>
  );
};

export default Pagos;
