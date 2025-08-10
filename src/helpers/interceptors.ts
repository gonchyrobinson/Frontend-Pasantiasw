import axios from 'axios';
// Base única: VITE_API_URL (prod) o '/api' (dev)
const envApiUrl =
  (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';
axios.defaults.baseURL = envApiUrl.replace(/\/$/, '');
axios.defaults.headers.common['Content-Type'] = 'application/json';
// eslint-disable-next-line no-console
console.log(
  '[axios] baseURL:',
  axios.defaults.baseURL,
  'VITE_API_URL=',
  import.meta.env.VITE_API_URL
);

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
