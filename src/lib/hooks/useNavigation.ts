import { useNavigate, useLocation } from 'react-router-dom';
import { authHelper } from '../../helpers/authHelper';
import { ROUTES } from '../../helpers/routesHelper';

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToLogin = () => {
    navigate(ROUTES.LOGIN, { state: { from: location }, replace: true });
  };

  const goToDashboard = () => {
    navigate(ROUTES.DASHBOARD, { replace: true });
  };

  const redirectAfterLogin = () => {
    const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
    navigate(from, { replace: true });
  };

  const logout = () => {
    authHelper.removeToken();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  // Navigation methods for menu items
  const goToEmpresas = () => {
    navigate(ROUTES.EMPRESAS);
  };

  const goToEstudiantes = () => {
    navigate(ROUTES.ESTUDIANTES);
  };

  const goToConvenios = () => {
    navigate(ROUTES.CONVENIOS);
  };

  const goToPasantias = () => {
    navigate(ROUTES.PASANTIAS);
  };

  const goToPagos = () => {
    navigate(ROUTES.PAGOS);
  };

  const goToReportes = () => {
    navigate(ROUTES.REPORTES);
  };

  const goToAuditoria = () => {
    navigate(ROUTES.AUDITORIA);
  };

  const goToPerfil = () => {
    navigate(ROUTES.PERFIL);
  };

  const goToConfiguracion = () => {
    navigate(ROUTES.CONFIGURACION);
  };

  return {
    navigate,
    location,
    goToLogin,
    goToDashboard,
    redirectAfterLogin,
    logout,
    goToEmpresas,
    goToEstudiantes,
    goToConvenios,
    goToPasantias,
    goToPagos,
    goToReportes,
    goToAuditoria,
    goToPerfil,
    goToConfiguracion,
  };
};
