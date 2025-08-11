import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // 👈 carga todo el .env.*, no filtra por prefijo
  // Única fuente de verdad - Forzando URL de Azure
  const apiUrl =
    env.VITE_API_URL ||
    'https://gestion-pasantias-facet-g9ascqg9ckd5eggd.centralus-01.azurewebsites.net/api';
  const targetOrigin = apiUrl.replace(/\/api\/?$/, '');

  // Logs de build para verificar valores
  // eslint-disable-next-line no-console
  console.log(
    '[vite] mode=',
    mode,
    'VITE_API_URL=',
    apiUrl,
    'proxy target=',
    targetOrigin
  );

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': resolve(__dirname, './src') },
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        '/api': {
          target: targetOrigin,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            mui: [
              '@mui/material',
              '@mui/icons-material',
              '@emotion/react',
              '@emotion/styled',
            ],
            router: ['react-router-dom'],
            query: ['@tanstack/react-query'],
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
    },
    define: { global: 'globalThis' },
    envPrefix: ['VITE_'],
  };
});
