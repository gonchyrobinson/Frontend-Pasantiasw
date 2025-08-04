import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ROUTES } from '../helpers/routesHelper';

import Layout from '../modules/Shared/components/Layout';
import Inicio from '../modules/Inicio/Inicio';
import Login from '../modules/Login/Login';
import Empresas from '../modules/Empresas/Empresas';
import Convenios from '../modules/Convenios/Convenios';
import Pasantias from '../modules/Pasantias/Pasantias';
import Pagos from '../modules/Pagos/Pagos';
import Reportes from '../modules/Reportes/Reportes';
import RegistroUsuarios from '../modules/CreacionUsuarios/RegistroUsuarios';
import ProtectedRoute from './helpers/ProtectedRoute';
import NotFound from '../modules/PaginasError/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirección por defecto */}
        <Route path='/' element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        {/* Rutas públicas */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<RegistroUsuarios />} />

        {/* Rutas protegidas */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Layout>
                <Inicio />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.EMPRESAS}
          element={
            <ProtectedRoute>
              <Layout>
                <Empresas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CONVENIOS}
          element={
            <ProtectedRoute>
              <Layout>
                <Convenios />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PASANTIAS}
          element={
            <ProtectedRoute>
              <Layout>
                <Pasantias />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PAGOS}
          element={
            <ProtectedRoute>
              <Layout>
                <Pagos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.REPORTES}
          element={
            <ProtectedRoute>
              <Layout>
                <Reportes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/usuarios'
          element={
            <ProtectedRoute>
              <Layout>
                <RegistroUsuarios />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Página 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
