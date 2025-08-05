import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { ROUTES } from '@/helpers/routesHelper';

const NotFound = () => {
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
          maxWidth: 400,
        }}
      >
        <Typography variant='h1' component='h1' gutterBottom>
          404
        </Typography>
        <Typography variant='h4' component='h2' gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
          La página que buscas no existe o ha sido movida.
        </Typography>
        <Button
          component={Link}
          to={ROUTES.DASHBOARD}
          variant='contained'
          startIcon={<HomeIcon />}
        >
          Volver al inicio
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFound;
