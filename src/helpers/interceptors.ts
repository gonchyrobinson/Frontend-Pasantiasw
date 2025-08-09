import axios from 'axios';
// Configure base URL (dev uses Vite proxy '/api'; prod should use VITE_SERVER_BASE_URL)
const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
axios.defaults.baseURL = serverBaseUrl
  ? `${serverBaseUrl.replace(/\/$/, '')}/api`
  : '/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

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

// Reescribir URL absoluta '/api/..' hacia el backend en prod y añadir token
axios.interceptors.request.use(config => {
  if (serverBaseUrl && config.url && config.url.startsWith('/api/')) {
    // Forzar URL absoluta al backend cuando se usa "/api/..."
    const trimmedBase = serverBaseUrl.replace(/\/$/, '');
    config.baseURL = undefined;
    config.url = `${trimmedBase}${config.url}`;
  }
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
