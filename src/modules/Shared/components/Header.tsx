import {
  Dashboard,
  Business,
  School,
  Payment,
  Assessment,
  Settings,
  Logout,
  Person,
  Domain,
} from '@mui/icons-material';
import { AppBar, Toolbar, Divider } from '@mui/material';
import { FlexContainer } from '../../../lib/components/StyledContainers';
import { CardTitle } from '../../../lib/components/StyledText';
import CustomMenu from './menu/CustomMenu';
import MenuElement from './menu/MenuElement';
import type { MenuItemData } from './menu/MenuElement';
import NotificationButton from './header/NotificationButton';
import UserAvatarButton from './header/UserAvatarButton';
import NavButtonComponent from './header/NavButton';
import { styled } from '@mui/material/styles';
import React, { MouseEvent, useState } from 'react';
import { useNavigation } from '../../../lib/hooks/useNavigation';
import { usePagosPorVencer } from '../../Pagos/hooks/usePagosPorVencer';
import PagosVencerNotifications from './header/PagosVencerNotifications';
import ConveniosVencerNotifications from './header/ConveniosVencerNotifications';
import PasantiasVencerNotifications from './header/PasantiasVencerNotifications';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../helpers/routesHelper';
import { useConveniosPorVencer } from '../../Convenios/hooks/useConveniosPorVencer';
import { usePasantiasPorVencer } from '../../Pasantias/hooks/usePasantiasPorVencer';

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

const UserSection = styled(FlexContainer)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] =
    useState<null | HTMLElement>(null);
  const {
    goToDashboard,
    goToEmpresas,
    goToEstudiantes,
    goToConvenios,
    goToPasantias,
    goToPagos,
    goToReportes,
    goToPerfil,
    goToConfiguracion,
    logout,
  } = useNavigation();

  const goToDetallePago = (pagoId: number) => {
    navigate(`${ROUTES.PAGOS_DETALLE}/${pagoId}`);
  };

  const goToDetalleConvenio = (convenioId: number) => {
    navigate(`${ROUTES.CONVENIOS_DETALLE}/${convenioId}`);
  };

  const goToDetallePasantia = (pasantiaId: number) => {
    navigate(`${ROUTES.PASANTIAS_DETALLE}/${pasantiaId}`);
  };

  // Hook para obtener pagos por vencer para notificaciones
  const { data: pagosPorVencer, isLoading: loadingPagos } = usePagosPorVencer();
  const { data: conveniosPorVencer, isLoading: loadingConvenios } =
    useConveniosPorVencer();
  const { data: pasantiasPorVencer, isLoading: loadingPasantias } =
    usePasantiasPorVencer();

  // Calcular total de notificaciones
  const notificationCount =
    (pagosPorVencer?.length || 0) +
    (conveniosPorVencer?.length || 0) +
    (pasantiasPorVencer?.length || 0);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenu = (event: MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const navItems = [
    { label: 'Inicio', icon: <Dashboard />, onClick: goToDashboard },
    { label: 'Empresas', icon: <Domain />, onClick: goToEmpresas },
    { label: 'Estudiantes', icon: <School />, onClick: goToEstudiantes },
    { label: 'Convenios', icon: <Business />, onClick: goToConvenios },
    { label: 'Pasantías', icon: <School />, onClick: goToPasantias },
    { label: 'Pagos', icon: <Payment />, onClick: goToPagos },
    { label: 'Reportes', icon: <Assessment />, onClick: goToReportes },
  ];

  // Las notificaciones ahora se manejan dinámicamente con pagos por vencer

  const userMenuItems: MenuItemData[] = [
    {
      icon: Person,
      primary: 'Perfil',
      onClick: goToPerfil,
    },
    {
      icon: Settings,
      primary: 'Configuración',
      onClick: goToConfiguracion,
    },
    { isDivider: true },
    {
      icon: Logout,
      primary: 'Cerrar Sesión',
      onClick: logout,
    },
  ];

  return (
    <StyledAppBar position='static'>
      <StyledToolbar>
        <CardTitle component='div' sx={{ flexGrow: 1, fontWeight: 600 }}>
          Sistema de Pasantías
        </CardTitle>

        <FlexContainer sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navItems.map((item, index) => (
            <NavButtonComponent
              key={index}
              label={item.label}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </FlexContainer>

        <UserSection>
          {/* Notifications */}
          <NotificationButton
            count={notificationCount}
            onClick={handleNotificationsMenu}
            disabled={loadingPagos || loadingConvenios || loadingPasantias}
          />

          {/* User Menu */}
          <UserAvatarButton onClick={handleMenu} />

          {/* Notifications Menu */}
          <CustomMenu
            id='notifications-menu'
            anchorEl={notificationsAnchor}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: { minWidth: 400, maxHeight: 600 },
            }}
          >
            {/* Pagos por Vencer */}
            <PagosVencerNotifications
              onClose={handleNotificationsClose}
              onNavigateToPago={goToDetallePago}
            />

            {/* Separador */}
            <Divider sx={{ my: 1 }} />

            {/* Convenios por Vencer */}
            <ConveniosVencerNotifications
              onClose={handleNotificationsClose}
              onNavigateToConvenio={goToDetalleConvenio}
            />

            {/* Separador */}
            <Divider sx={{ my: 1 }} />

            {/* Pasantías por Vencer */}
            <PasantiasVencerNotifications
              onClose={handleNotificationsClose}
              onNavigateToPasantia={goToDetallePasantia}
            />
          </CustomMenu>

          {/* User Menu */}
          <CustomMenu
            id='menu-appbar'
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            {userMenuItems.map((item, index) => (
              <MenuElement key={index} {...item} onClose={handleClose} />
            ))}
          </CustomMenu>
        </UserSection>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
