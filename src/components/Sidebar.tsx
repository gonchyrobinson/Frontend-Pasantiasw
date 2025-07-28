import {
  Dashboard,
  Business,
  School,
  Payment,
  Settings,
  Assessment,
  Group,
  Notifications,
  People,
  BusinessCenter,
  Help,
} from '@mui/icons-material';
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
  Chip,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 280;

// Styled components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const SidebarContent = styled(Box)(({ theme: _theme }) => ({
  overflow: 'auto',
  marginTop: 64, // Adjust for header height
  height: 'calc(100vh - 64px)',
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: prop => !['component', 'to'].includes(prop as string),
})<{ component?: React.ElementType; to?: string }>(({ theme: _theme }) => ({
  margin: _theme.spacing(0.5, 1),
  borderRadius: _theme.spacing(1),
  '&.Mui-selected': {
    backgroundColor: _theme.palette.primary.light,
    color: _theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: _theme.palette.primary.main,
    },
  },
  '&:hover': {
    backgroundColor: _theme.palette.action.hover,
  },
}));

const MenuSection = styled(Box)(({ theme: _theme }) => ({
  marginBottom: _theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme: _theme }) => ({
  padding: _theme.spacing(1, 2),
  color: _theme.palette.text.secondary,
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const location = useLocation();

  const mainMenuItems: MenuItem[] = [
    { label: 'Dashboard', path: '/', icon: <Dashboard /> },
    { label: 'Convenios', path: '/convenios', icon: <Business /> },
    { label: 'Pasantías', path: '/pasantias', icon: <School /> },
    { label: 'Pagos', path: '/pagos', icon: <Payment /> },
    { label: 'Estudiantes', path: '/estudiantes', icon: <People /> },
    { label: 'Empresas', path: '/empresas', icon: <BusinessCenter /> },
  ];

  const secondaryMenuItems: MenuItem[] = [
    { label: 'Configuración', path: '/configuracion', icon: <Settings /> },
    { label: 'Reportes', path: '/reportes', icon: <Assessment /> },
    { label: 'Ayuda', path: '/ayuda', icon: <Help /> },
  ];

  const analyticsItems: MenuItem[] = [
    { label: 'Usuarios Activos', path: '/analytics/usuarios', icon: <Group /> },
    {
      label: 'Notificaciones',
      path: '/notificaciones',
      icon: <Notifications />,
    },
  ];

  const renderMenuItem = (item: MenuItem, _index: number) => {
    const isActive = location.pathname === item.path;
    return (
      <ListItem key={item.path} disablePadding>
        <StyledListItemButton
          component={Link}
          to={item.path}
          selected={isActive}
        >
          <ListItemIcon
            sx={{
              color: isActive ? 'primary.contrastText' : 'inherit',
              minWidth: 40,
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: isActive ? 600 : 400,
            }}
          />
          {isActive && (
            <Chip
              label='Activo'
              size='small'
              color='primary'
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          )}
        </StyledListItemButton>
      </ListItem>
    );
  };

  return (
    <StyledDrawer variant='permanent'>
      <SidebarHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.light', mr: 1 }}>
            <School />
          </Avatar>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            Sistema de Pasantías
          </Typography>
        </Box>
        <Typography variant='caption' sx={{ opacity: 0.8 }}>
          Secretaría de Bienestar Estudiantil
        </Typography>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <MenuSection>
          <SectionTitle>Navegación Principal</SectionTitle>
          <List>
            {mainMenuItems.map((item, index) => renderMenuItem(item, index))}
          </List>
        </MenuSection>

        <Divider />

        {/* Analytics Section */}
        <MenuSection>
          <SectionTitle>Analytics</SectionTitle>
          <List>
            {analyticsItems.map((item, index) => renderMenuItem(item, index))}
          </List>
        </MenuSection>

        <Divider />

        {/* Secondary Navigation */}
        <MenuSection>
          <SectionTitle>Herramientas</SectionTitle>
          <List>
            {secondaryMenuItems.map((item, index) =>
              renderMenuItem(item, index)
            )}
          </List>
        </MenuSection>

        {/* Quick Stats */}
        <Box sx={{ p: 2, mt: 'auto' }}>
          <Typography variant='caption' color='text.secondary' gutterBottom>
            Estadísticas Rápidas
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
            <Chip
              label='12 Convenios'
              size='small'
              color='primary'
              variant='outlined'
            />
            <Chip
              label='45 Pasantías'
              size='small'
              color='secondary'
              variant='outlined'
            />
            <Chip
              label='8 Pendientes'
              size='small'
              color='warning'
              variant='outlined'
            />
          </Box>
        </Box>
      </SidebarContent>
    </StyledDrawer>
  );
};

export default Sidebar;
