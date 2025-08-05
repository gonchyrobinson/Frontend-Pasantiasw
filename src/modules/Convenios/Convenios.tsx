import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Convenios: React.FC = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Gestión de Convenios
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Módulo para gestionar convenios con empresas e instituciones.
        </Typography>
      </Box>
    </Container>
  );
};

export default Convenios;
