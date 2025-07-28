import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/convenios' element={<div>Página de Convenios</div>} />
          <Route path='/pasantias' element={<div>Página de Pasantías</div>} />
          <Route path='/pagos' element={<div>Página de Pagos</div>} />
          <Route path='/busqueda' element={<div>Página de Búsqueda</div>} />
          <Route path='/reportes' element={<div>Página de Reportes</div>} />
          <Route
            path='/configuracion'
            element={<div>Página de Configuración</div>}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
