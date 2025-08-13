import axios from 'axios';
import { API_BASE } from '../lib/api';

// Base única: API_BASE (dev: '/api', prod: VITE_API_URL)
axios.defaults.baseURL = API_BASE;
axios.defaults.headers.common['Content-Type'] = 'application/json';
// eslint-disable-next-line no-console
console.log('[axios] baseURL:', axios.defaults.baseURL, 'API_BASE=', API_BASE);

import { authHelper } from './authHelper';

// Función para redirección sin refresh
const goToLogin = () => {
  // Verificar si estamos en una página de login para evitar loops
  if (window.location.pathname !== '/login') {
    // Usar history.pushState para evitar refresh
    window.history.pushState({}, '', '/login');
    // Disparar evento para que React Router detecte el cambio
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
};

// Añadir token
axios.interceptors.request.use(config => {
  const token = authHelper.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejar errores 401
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      authHelper.removeToken();
      goToLogin();
    }
    return Promise.reject(error);
  }
);
