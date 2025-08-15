import React from 'react';
import { Container, Box } from '@mui/material';
import { PageTitle, Subtitle } from '../../lib/components/StyledText';

const Reportes: React.FC = () => {
  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <Box>
        <PageTitle component='h1' gutterBottom>
          Reportes y Estadísticas
        </PageTitle>
        <Subtitle>
          Módulo para generar reportes y visualizar estadísticas.
        </Subtitle>
      </Box>
    </Container>
  );
};

export default Reportes;
