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
- **Vite 7.0.6** - Build tool y dev server

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

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   # Crear archivo .env
   cp .env.example .env

   # Editar .env con tus valores
   VITE_API_URL=http://localhost:5000/api
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
VITE_API_URL=http://localhost:5000/api
VITE_APP_TITLE=Apex.UI
```

### Producción

```env
VITE_API_URL=https://api.com
VITE_APP_TITLE=pASANTIAS Y pps
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
