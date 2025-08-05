import {
  Drawer,
  List,
  ListItem,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  Business,
  School,
  Payment,
  Assessment,
  Settings,
  Domain,
  Menu,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../../../hooks/useNavigation';
import { ROUTES } from '../../../helpers/routesHelper';
import { useState } from 'react';
import {
  MobileToggleButton,
  SidebarHeader,
  SidebarMenuItem,
} from './ComponentesGenericos';

const drawerWidth = 240;
const collapsedDrawerWidth = 64;

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(!isMobile);

  const location = useLocation();
  const {
    goToDashboard,
    goToEmpresas,
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
      text: 'Empresas',
      icon: <Domain />,
      onClick: goToEmpresas,
      path: ROUTES.EMPRESAS,
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

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const currentWidth = isCollapsed ? collapsedDrawerWidth : drawerWidth;

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <MobileToggleButton onClick={handleToggleDrawer}>
          <Menu />
        </MobileToggleButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isOpen}
        onClose={isMobile ? handleToggleDrawer : undefined}
        sx={{
          width: isMobile ? drawerWidth : currentWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? drawerWidth : currentWidth,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <SidebarHeader
            isCollapsed={isCollapsed}
            isMobile={isMobile}
            onToggleCollapse={handleToggleCollapse}
          />
          <Divider />
          <List>
            {menuItems.map(item => (
              <ListItem key={item.text} disablePadding>
                <SidebarMenuItem
                  icon={item.icon}
                  text={item.text}
                  isCollapsed={isCollapsed}
                  isSelected={location.pathname === item.path}
                  onClick={() => {
                    item.onClick();
                    if (isMobile) {
                      setIsOpen(false);
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
