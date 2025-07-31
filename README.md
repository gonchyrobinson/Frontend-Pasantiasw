# Apex.UI - Sistema de Gestión de Pasantías

Un sistema moderno de gestión de pasantías desarrollado con React, TypeScript, Material-UI y Vite.

## 🚀 Características

- **Frontend Moderno**: React 18 con TypeScript
- **UI Framework**: Material-UI (MUI) con componentes personalizados
- **Estado Global**: React Query para gestión de estado del servidor
- **Build Tool**: Vite para desarrollo rápido y builds optimizados
- **Testing**: Vitest con React Testing Library
- **Linting**: ESLint + Prettier para código consistente
- **Git Hooks**: Husky + Lint-staged para calidad de código
- **Arquitectura**: Estructura modular por páginas con componentes reutilizables

## 🛠️ Tecnologías

### Core

- **React 18.2.0** - Biblioteca de interfaz de usuario
- **TypeScript 4.9.5** - Tipado estático
- **Vite 5.4.19** - Build tool y dev server

### UI & Styling

- **Material-UI 5.15.10** - Componentes de UI
- **@emotion/react & @emotion/styled** - CSS-in-JS
- **@mui/icons-material** - Iconos de Material Design

### State Management & Data Fetching

- **@tanstack/react-query 5.17.19** - Gestión de estado del servidor
- **Axios 1.6.7** - Cliente HTTP

### Routing

- **react-router-dom 6.21.3** - Enrutamiento

### Testing

- **Vitest 2.1.8** - Framework de testing
- **@testing-library/react 13.4.0** - Testing de componentes
- **@testing-library/jest-dom 5.17.0** - Matchers adicionales
- **jsdom 25.0.1** - Entorno DOM para tests

### Development Tools

- **ESLint 8.57.0** - Linting de código
- **Prettier 3.2.5** - Formateo de código
- **Husky 9.0.11** - Git hooks
- **lint-staged 15.2.2** - Linting de archivos staged

## 📁 Estructura del Proyecto

```
frontend/
├── .cursor/                          # Configuración de Cursor IDE
│   ├── rules/
│   │   ├── react-code-style.mdc     # Reglas de estilo de código
│   │   └── mui-mcp.mdc              # Configuración MUI MCP
├── .husky/                          # Git hooks
│   └── pre-commit                   # Hook pre-commit
├── public/                          # Archivos estáticos
├── src/
│   ├── apis/                        # Cliente API
│   │   └── apiClient.ts             # Cliente Axios configurado
│   ├── components/                   # Componentes compartidos
│   ├── contexts/                     # Contextos de React
│   ├── features/                     # Características específicas
│   ├── helpers/                      # Funciones auxiliares
│   ├── hooks/                        # Custom hooks
│   ├── pages/                        # Páginas de la aplicación
│   ├── routes/                       # Configuración de rutas
│   ├── test/                         # Configuración de tests
│   ├── types/                        # Definiciones de tipos
│   ├── vite-env.d.ts                 # Tipos de Vite
│   ├── App.tsx                       # Componente raíz
│   └── index.tsx                     # Punto de entrada
├── .eslintrc.json                    # Configuración ESLint
├── .gitignore                        # Archivos ignorados por Git
├── .prettierrc                       # Configuración Prettier
├── .prettierignore                   # Archivos ignorados por Prettier
├── index.html                        # Template HTML
├── package.json                      # Dependencias y scripts
├── README.md                         # Documentación
├── tsconfig.json                     # Configuración TypeScript
├── tsconfig.node.json                # Configuración TS para Node
├── vite.config.ts                    # Configuración Vite
└── vitest.config.ts                  # Configuración Vitest
```

## 🔧 Configuración de Entornos

### Estructura de Archivos de Entorno

El proyecto utiliza archivos de entorno separados para diferentes ambientes:

- `.env.development` - Configuración para desarrollo local
- `.env.production` - Configuración para producción
- `.env.example` - Plantilla de ejemplo

### Variables de Entorno

#### Desarrollo (.env.development)

```env
VITE_SERVER_BASE_URL=https://localhost:7001
VITE_API_URL=https://localhost:7001/api
VITE_ENVIRONMENT=development
VITE_VERSION=1.0.0
```

#### Producción (.env.production)

```env
VITE_SERVER_BASE_URL=https://api.tudominio.com
VITE_API_URL=https://api.tudominio.com/api
VITE_ENVIRONMENT=production
VITE_VERSION=1.0.0
```

### Configuración del Backend

#### Desarrollo

- **URL**: `https://localhost:7001`
- **Protocolo**: HTTPS con certificado autofirmado
- **CORS**: Configurado para `http://localhost:3000`

#### Producción

- **URL**: `https://api.tudominio.com`
- **Protocolo**: HTTPS con certificado válido
- **CORS**: Configurado para el dominio de producción

## 🔗 Configuración de Conexión Frontend-Backend

### Configuración Implementada

#### 1. Proxy de Desarrollo

- Configurado en `frontend/vite.config.ts`
- Todas las peticiones a `/api/*` se redirigen a `https://localhost:7001`
- Configuración: `changeOrigin: true, secure: false` (permite certificados autofirmados)

#### 2. Cliente API Simplificado

- Ubicado en `frontend/src/apis/apiClient.ts`
- Configurado para usar la URL base `/api`
- Maneja respuestas directas del backend sin estructura `ApiResponse` envolvente
- Manejo básico de errores implementado

#### 3. Tipos de Datos

- Actualizados en `frontend/src/types/index.ts`
- Mantiene compatibilidad con `ApiResponse<T>` para futuras implementaciones
- Tipos básicos para el sistema de gestión de pasantías

### Instrucciones para Probar

#### 1. Iniciar el Backend

```bash
cd backend/Backend
dotnet run
```

El backend debe estar ejecutándose en `https://localhost:7001`

#### 2. Iniciar el Frontend

```bash
cd frontend
npm run dev
```

El frontend debe estar ejecutándose en `http://localhost:3000`

#### 3. Probar la Conexión

1. Abrir `http://localhost:3000` en el navegador
2. La aplicación debería cargar correctamente sin errores de conexión

### Solución de Problemas

#### Problema: Error de CORS

**Causa**: El navegador bloquea peticiones entre diferentes orígenes.

**Solución**:

- ✅ Proxy configurado en Vite
- ✅ CORS configurado en el backend
- ✅ Configuración HTTPS para desarrollo

#### Problema: Certificados HTTPS

**Causa**: Certificados autofirmados en desarrollo.

**Solución**:

- ✅ `secure: false` en la configuración del proxy
- ✅ Configuración para permitir certificados autofirmados

### Troubleshooting de Entornos

#### Error de Certificado en Desarrollo

Si tienes problemas con certificados autofirmados:

1. El proxy está configurado con `secure: false`
2. Acepta el certificado en el navegador
3. Verifica que el backend esté ejecutándose en HTTPS

#### Error de CORS

- Verificar que el backend tenga CORS configurado correctamente
- Verificar que las URLs coincidan entre frontend y backend

#### Cambio de Ambiente

Para cambiar entre ambientes:

1. Modificar las variables en el archivo correspondiente
2. Reiniciar el servidor de desarrollo
3. Limpiar la caché del navegador si es necesario

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0 (recomendado: 20.x LTS)
- **npm** >= 8.0.0 (recomendado: 10.x)

#### Verificar Versiones Actuales

```bash
node --version
npm --version
```

#### Instalar/Actualizar Node.js

**Windows:**

```bash
# Descargar desde https://nodejs.org/
# O usar Chocolatey:
choco install nodejs

# O usar winget:
winget install OpenJS.NodeJS
```

**macOS:**

```bash
# Usar Homebrew:
brew install node

# O descargar desde https://nodejs.org/
```

**Linux (Ubuntu/Debian):**

```bash
# Usar NodeSource repository:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# O usar nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

**Linux (CentOS/RHEL/Fedora):**

```bash
# Usar NodeSource repository:
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# O usar nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

#### Verificar Instalación

```bash
# Verificar Node.js
node --version  # Debe mostrar v18.x.x o superior

# Verificar npm
npm --version   # Debe mostrar 8.x.x o superior

# Verificar que todo funciona
npm --help
```

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Instalar dependencias**

   **Opción 1: Instalación automática (Recomendada)**

   ```bash
   # Windows
   install.bat

   # Linux/macOS
   ./install.sh
   ```

   **Opción 2: Instalación manual**

   ```bash
   # Limpiar cache y remover archivos existentes
   npm cache clean --force
   rm -rf node_modules package-lock.json

   # Instalar con legacy peer deps
   npm install --legacy-peer-deps
   ```

3. **Configurar variables de entorno**

   ```bash
   # Crear archivo .env.development
   cp .env.example .env.development

   # Editar .env.development con tus valores
   VITE_SERVER_BASE_URL=https://localhost:7001
   VITE_API_URL=https://localhost:7001/api
   ```

### Solución de Problemas

#### Error de Dependencias (ERESOLVE)

Si encuentras errores como:

```
npm error code ERESOLVE
npm error ERESOLVE could not resolve
```

**Solución:**

```bash
# Limpiar cache de npm
npm cache clean --force

# Instalar con legacy peer deps
npm install --legacy-peer-deps

# O usar force
npm install --force
```

#### Versión de Node.js Incompatible

Si ves errores relacionados con versiones de Node.js:

```bash
# Verificar versión actual
node --version

# Si es menor a 18.x, actualizar Node.js
# Ver instrucciones de instalación arriba
```

#### Error de TypeScript

Si hay errores de TypeScript:

```bash
# Limpiar cache de TypeScript
rm -rf node_modules/.cache
npm run type-check
```

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Iniciar servidor de desarrollo
```

### Build

```bash
npm run build        # Build de producción
npm run preview      # Previsualizar build de producción
```

### Testing

```bash
npm test             # Ejecutar tests
npm run test:ui      # Interfaz visual de tests
npm run test:coverage # Tests con cobertura
npm run test:run     # Tests en modo run
```

### Linting y Formateo

```bash
npm run lint         # Verificar linting
npm run lint:fix     # Corregir errores de linting automáticamente
```

### MCP (Model Context Protocol)

```bash
npm run mcp:test     # Probar conexión MUI MCP
```

## 🏗️ Configuración de Build

### Vite

- **Dev Server**: Puerto 3000 con hot reload
- **Build**: Optimizado para producción con code splitting
- **Chunks**: Separación automática de vendor, MUI, router y query
- **Source Maps**: Habilitados para debugging

### TypeScript

- **Target**: ES2020
- **Module**: ESNext
- **Strict**: Habilitado
- **Path Mapping**: `@/*` → `src/*`

## 🧪 Testing

### Configuración

- **Framework**: Vitest
- **Environment**: jsdom
- **Setup**: `src/test/setup.ts`
- **Coverage**: v8 provider

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests con UI
npm run test:ui

# Tests con cobertura
npm run test:coverage

# Tests específicos
npm test -- --run src/pages/Home
```

### Estructura de Tests

- **Test Files**: `*.test.tsx` o `*.spec.tsx`
- **Setup**: Mocks globales en `src/test/setup.ts`
- **Pattern**: Componente + helpers en la misma carpeta

## 📋 Reglas de Código

### Estructura de Páginas

Cada página debe seguir esta estructura:

```
src/pages/[PageName]/
├── components/           # Componentes específicos de la página
│   ├── ComponentName.tsx
│   └── index.ts         # Export de componentes
├── helpers/              # Funciones auxiliares específicas
│   └── helperName.ts
├── index.tsx             # Componente principal de la página
└── index.test.tsx        # Tests de la página
```

### Convenciones de Nomenclatura

- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase (`useApi.ts`)
- **Tipos**: PascalCase (`ApiResponse`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Archivos**: kebab-case para páginas, PascalCase para componentes

### Material-UI

- **Theming**: Usar `createTheme` para personalización
- **Styling**: Preferir `styled` components sobre `sx` prop
- **Components**: Usar componentes MUI como base
- **Icons**: Importar desde `@mui/icons-material`

### TypeScript

- **Strict Mode**: Habilitado
- **No Any**: Evitar `any`, usar tipos específicos
- **Interfaces**: Para objetos complejos
- **Types**: Para unions y primitives

### React Query

- **Queries**: Para datos de solo lectura
- **Mutations**: Para operaciones de escritura
- **Cache**: Configurado con `staleTime` y `gcTime`
- **Error Handling**: Centralizado en interceptors

## 🔧 Configuración de Desarrollo

### ESLint

- **Parser**: `@typescript-eslint/parser`
- **Plugins**: React, TypeScript, Prettier
- **Rules**: Configurado para TypeScript estricto

### Prettier

- **Semi**: true
- **Single Quote**: true
- **Tab Width**: 2
- **Trailing Comma**: es5

### Husky

- **Pre-commit**: Ejecuta lint-staged
- **Lint-staged**: ESLint + Prettier en archivos staged

## 🌐 Variables de Entorno

### Desarrollo

```env
VITE_SERVER_BASE_URL=https://localhost:7001
VITE_API_URL=https://localhost:7001/api
VITE_ENVIRONMENT=development
VITE_VERSION=1.0.0
```

### Producción

```env
VITE_SERVER_BASE_URL=https://api.tudominio.com
VITE_API_URL=https://api.tudominio.com/api
VITE_ENVIRONMENT=production
VITE_VERSION=1.0.0
```

## 📦 Dependencias Principales

### Production

- `react`: ^18.2.0
- `@mui/material`: ^5.15.10
- `@tanstack/react-query`: ^5.17.19
- `axios`: ^1.6.7
- `react-router-dom`: ^6.21.3

### Development

- `vite`: ^7.0.6
- `vitest`: ^2.1.8
- `eslint`: ^8.57.0
- `prettier`: ^3.2.5
- `husky`: ^9.0.11

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

### Servidor Estático

Los archivos generados en `dist/` pueden ser servidos por cualquier servidor web estático.

### Docker (Opcional)

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔍 Debugging

### DevTools

- **React DevTools**: Disponible en desarrollo
- **React Query DevTools**: Configurado para desarrollo
- **Vite DevTools**: Integrado en el navegador

### Logs

- **Console**: Filtrado en tests
- **Network**: Interceptado por Axios
- **Errors**: Capturados por ErrorBoundary

## 📚 Recursos Útiles

### Documentación

- [React Documentation](https://react.dev/)
- [Material-UI Documentation](https://mui.com/)
- [React Query Documentation](https://tanstack.com/query)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)

### Herramientas

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Material-UI Theme Builder](https://mui.com/material-ui/customization/theme-builder/)
- [React Query DevTools](https://tanstack.com/query/latest/docs/react/devtools)

## 🤝 Contribución

### Flujo de Trabajo

1. Crear feature branch desde `main`
2. Desarrollar con TDD
3. Ejecutar tests y linting
4. Crear Pull Request
5. Code review y merge

### Estándares de Código

- Seguir las reglas de ESLint
- Mantener cobertura de tests > 80%
- Documentar componentes complejos
- Usar TypeScript estricto

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

### Problemas Comunes

**Error: Cannot find module**

```bash
npm install
npm run dev
```

**Error: Port already in use**

```bash
# Cambiar puerto en vite.config.ts
server: { port: 3001 }
```

**Error: TypeScript compilation**

```bash
npm run lint:fix
```

### Contacto

- **Issues**: Crear issue en GitHub
- **Documentación**: Ver archivos `.md` en el proyecto
- **Chat**: Canal de desarrollo del equipo

---

**Desarrollado con por Gonzalo Robinson, Ricardo Jorge Robinson, Iván Mir**
