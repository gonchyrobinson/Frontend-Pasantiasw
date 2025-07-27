import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Dashboard,
  Business,
  School,
  Payment,
  Assessment,
  Notifications,
  Settings,
  Logout,
  Person,
} from '@mui/icons-material';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[2],
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: 64,
  [theme.breakpoints.down('md')]: {
    minHeight: 56,
  },
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => !['component', 'to'].includes(prop as string),
})<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const UserSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const navItems = [
    { label: 'Inicio', path: '/', icon: <Dashboard /> },
    { label: 'Convenios', path: '/convenios', icon: <Business /> },
    { label: 'Pasantías', path: '/pasantias', icon: <School /> },
    { label: 'Pagos', path: '/pagos', icon: <Payment /> },
    { label: 'Reportes', path: '/reportes', icon: <Assessment /> },
  ];

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Sistema de Pasantías
        </Typography>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navItems.map((item) => (
            <Tooltip key={item.path} title={item.label} arrow>
              <NavButton
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
              >
                {item.label}
              </NavButton>
            </Tooltip>
          ))}
        </Box>

        <UserSection>
          {/* Notifications */}
          <Tooltip title="Notificaciones" arrow>
            <IconButton
              color="inherit"
              onClick={handleNotificationsMenu}
              aria-label="notifications"
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <Tooltip title="Menú de usuario" arrow>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.light' }}>
                <Person />
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* Notifications Menu */}
          <Menu
            id="notifications-menu"
            anchorEl={notificationsAnchor}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(notificationsAnchor)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: { minWidth: 300, maxHeight: 400 },
            }}
          >
            <MenuItem onClick={handleNotificationsClose}>
              <ListItemIcon>
                <Business fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Nuevo convenio aprobado"
                secondary="Convenio con Empresa ABC ha sido aprobado"
              />
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              <ListItemIcon>
                <School fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Pasantía iniciada"
                secondary="Juan Pérez ha iniciado su pasantía"
              />
            </MenuItem>
            <MenuItem onClick={handleNotificationsClose}>
              <ListItemIcon>
                <Payment fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary="Pago registrado"
                secondary="Pago de pasantía registrado exitosamente"
              />
            </MenuItem>
          </Menu>

          {/* User Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: { minWidth: 200 },
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Configuración" />
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </MenuItem>
          </Menu>
        </UserSection>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header; 