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
import CreacionEmpresas from '../modules/Empresas/CreacionEmpresas';
import EditarEmpresa from '../modules/Empresas/EditarEmpresa';
import Estudiantes from '../modules/Estudiantes/Estudiantes';
import CreacionEstudiantes from '../modules/Estudiantes/CreacionEstudiantes';
import EditarEstudiante from '../modules/Estudiantes/EditarEstudiante';
import DetalleEstudiante from '../modules/Estudiantes/DetalleEstudiante';
import Convenios from '../modules/Convenios/Convenios';
import CrearConvenio from '../modules/Convenios/components/CrearConvenio';
import EditarConvenio from '../modules/Convenios/components/EditarConvenio';
import Pasantias from '../modules/Pasantias/Pasantias';
import CrearPasantia from '../modules/Pasantias/components/CrearPasantia';
import EditarPasantia from '../modules/Pasantias/components/EditarPasantia';
import Pagos from '../modules/Pagos/Pagos';
import CrearPago from '../modules/Pagos/components/CrearPago';
import EditarPago from '../modules/Pagos/components/EditarPago';
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
        <Route path={ROUTES.REGISTRAR_USUARIO} element={<RegistroUsuarios />} />

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
          path={ROUTES.EMPRESAS_CREAR}
          element={
            <ProtectedRoute>
              <Layout>
                <CreacionEmpresas />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.EMPRESAS_EDITAR}/:id`}
          element={
            <ProtectedRoute>
              <Layout>
                <EditarEmpresa />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ESTUDIANTES}
          element={
            <ProtectedRoute>
              <Layout>
                <Estudiantes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ESTUDIANTES_CREAR}
          element={
            <ProtectedRoute>
              <Layout>
                <CreacionEstudiantes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.ESTUDIANTES_EDITAR}/:id`}
          element={
            <ProtectedRoute>
              <Layout>
                <EditarEstudiante />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.ESTUDIANTES_DETALLE}/:id`}
          element={
            <ProtectedRoute>
              <Layout>
                <DetalleEstudiante />
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
          path={ROUTES.CONVENIOS_CREAR}
          element={
            <ProtectedRoute>
              <Layout>
                <CrearConvenio />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.CONVENIOS_EDITAR}/:id`}
          element={
            <ProtectedRoute>
              <Layout>
                <EditarConvenio />
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
          path={ROUTES.PASANTIAS_CREAR}
          element={
            <ProtectedRoute>
              <Layout>
                <CrearPasantia />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.PASANTIAS_EDITAR}/:id`}
          element={
            <ProtectedRoute>
              <Layout>
                <EditarPasantia />
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
          path={ROUTES.PAGOS_CREAR}
          element={
            <ProtectedRoute>
              <Layout>
                <CrearPago />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${ROUTES.PAGOS_EDITAR}/:id`}
          element={
            <ProtectedRoute>
              <Layout>
                <EditarPago />
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
