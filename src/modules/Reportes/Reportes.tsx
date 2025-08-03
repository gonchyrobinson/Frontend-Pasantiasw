import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Reportes: React.FC = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Reportes y Estadísticas
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Módulo para generar reportes y visualizar estadísticas.
        </Typography>
      </Box>
    </Container>
  );
};

export default Reportes;
