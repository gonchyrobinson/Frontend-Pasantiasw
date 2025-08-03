import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Business,
  School,
  Payment,
  Assessment,
  Settings,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../../../hooks/useNavigation';
import { ROUTES } from '../../../helpers/routesHelper';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const {
    goToDashboard,
    goToConvenios,
    goToPasantias,
    goToPagos,
    goToReportes,
    goToConfiguracion,
  } = useNavigation();

  const menuItems = [
    {
      text: 'Inicio',
      icon: <Dashboard />,
      onClick: goToDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      text: 'Convenios',
      icon: <Business />,
      onClick: goToConvenios,
      path: ROUTES.CONVENIOS,
    },
    {
      text: 'Pasantías',
      icon: <School />,
      onClick: goToPasantias,
      path: ROUTES.PASANTIAS,
    },
    {
      text: 'Pagos',
      icon: <Payment />,
      onClick: goToPagos,
      path: ROUTES.PAGOS,
    },
    {
      text: 'Reportes',
      icon: <Assessment />,
      onClick: goToReportes,
      path: ROUTES.REPORTES,
    },
    {
      text: 'Configuración',
      icon: <Settings />,
      onClick: goToConfiguracion,
      path: ROUTES.CONFIGURACION,
    },
  ];

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant='h6' component='div'>
            Sistema de Pasantías
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map(item => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={item.onClick}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
