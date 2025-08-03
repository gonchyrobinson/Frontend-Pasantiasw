import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authHelper } from '../../helpers/authHelper';
import { ROUTES } from '../../helpers/routesHelper';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!authHelper.isAuthenticated()) {
    // Guarda la URL actual para redirigir después del login
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
