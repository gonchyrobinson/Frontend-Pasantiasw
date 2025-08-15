import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import {
  CenteredContainer,
  CardContainer,
} from '../../lib/components/StyledContainers';
import {
  PageTitle,
  SectionTitle,
  BodyText,
} from '../../lib/components/StyledText';
import { Home as HomeIcon } from '@mui/icons-material';
import { ROUTES } from '@/helpers/routesHelper';

const NotFound = () => {
  return (
    <CenteredContainer
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <CardContainer
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        <PageTitle component='h1' gutterBottom>
          404
        </PageTitle>
        <SectionTitle component='h2' gutterBottom>
          Página no encontrada
        </SectionTitle>
        <BodyText color='text.secondary' sx={{ mb: 3 }}>
          La página que buscas no existe o ha sido movida.
        </BodyText>
        <Button
          component={Link}
          to={ROUTES.DASHBOARD}
          variant='contained'
          startIcon={<HomeIcon />}
        >
          Volver al inicio
        </Button>
      </CardContainer>
    </CenteredContainer>
  );
};

export default NotFound;
