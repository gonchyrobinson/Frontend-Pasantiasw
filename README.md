# Sistema de Gestión de Acuerdos Individuales

Un sistema moderno de gestión de Acuerdos Individuales desarrollado con React, TypeScript, Material-UI y Vite.

## 🚀 Características

- **Frontend Moderno**: React 18 con TypeScript
- **UI Framework**: Material-UI (MUI) con componentes personalizados
- **Sistema de Formularios**: FormularioGenerico con validaciones avanzadas
- **Autenticación**: Sistema completo de login/registro con JWT
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

### Formularios y Validación

- **React Hook Form 7.48.2** - Gestión de formularios
- **FormularioGenerico** - Sistema de formularios genéricos
- **Validaciones Avanzadas** - Soporte para patrones, rangos y validaciones custom

### UI & Styling

- **Material-UI 5.15.10** - Componentes de UI
- **@emotion/react & @emotion/styled** - CSS-in-JS
- **@mui/icons-material** - Iconos de Material Design

### State Management & Data Fetching

- **@tanstack/react-query 5.17.19** - Gestión de estado del servidor
- **Axios 1.6.7** - Cliente HTTP
- **react-hook-form 7.48.2** - Gestión de formularios

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

## 📝 Sistema de Formularios Genéricos

### Características Principales

- ✅ **Formularios Dinámicos**: Basados en metadata JSON
- ✅ **Componentes Reutilizables**: Para cada tipo de campo
- ✅ **Validaciones Avanzadas**: Integradas con React Hook Form
- ✅ **Dropdowns Dinámicos**: Carga de datos desde API
- ✅ **Diseño Responsive**: Grid system de Material-UI
- ✅ **TypeScript**: Type safety completo
- ✅ **Accesibilidad**: Sin autoFocus y manejo de errores mejorado

### Tipos de Campos Soportados

| Tipo              | Descripción                   | Componente                    |
| ----------------- | ----------------------------- | ----------------------------- |
| `text`            | Campo de texto básico         | `TextField`                   |
| `password`        | Campo de contraseña           | `TextField` (type="password") |
| `email`           | Campo de email con validación | `EmailField`                  |
| `currency`        | Campo numérico para moneda    | `CurrencyField`               |
| `number`          | Campo numérico básico         | `NumberField`                 |
| `date`            | Campo de fecha                | `DateField`                   |
| `checkbox`        | Checkbox                      | `CheckboxField`               |
| `textarea`        | Área de texto multilínea      | `TextField` (multiline)       |
| `dropdown`        | Select con opciones estáticas | `DropdownField`               |
| `dynamicDropdown` | Select con opciones desde API | `DynamicDropdownField`        |

### Ejemplo de Uso

```tsx
import { FormularioGenerico, FormMetadata } from '../../FormularioGenerico';

const loginMetadata: FormMetadata = {
  submitButtonText: 'Iniciar Sesión',
  fields: [
    {
      name: 'username',
      type: 'text',
      label: 'Usuario',
      placeholder: 'Ingrese su usuario',
      validations: {
        required: 'El usuario es requerido',
      },
      gridSize: 12,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Contraseña',
      placeholder: 'Ingrese su contraseña',
      validations: {
        required: 'La contraseña es requerida',
      },
      gridSize: 12,
    },
  ],
};

const Login = () => {
  const handleSubmit = async (data: Record<string, unknown>) => {
    // Lógica de autenticación
  };

  return (
    <FormularioGenerico
      metadata={loginMetadata}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};
```

### Formularios Predefinidos

El sistema incluye formularios predefinidos para entidades principales:

```tsx
import {
  createConvenioFormMetadata,
  createEmpresaFormMetadata,
  createEstudianteFormMetadata,
} from '../../FormularioGenerico';

// Uso directo
<FormularioGenerico
  metadata={createConvenioFormMetadata()}
  onSubmit={handleSubmit}
/>;
```

### Validaciones Avanzadas

```tsx
validations: {
  required: 'Campo requerido',
  minLength: { value: 3, message: 'Mínimo 3 caracteres' },
  maxLength: { value: 50, message: 'Máximo 50 caracteres' },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email inválido'
  },
  min: { value: 0, message: 'Valor mínimo 0' },
  max: { value: 100, message: 'Valor máximo 100' }
}
```

## 🔐 Sistema de Autenticación

### Características

- ✅ **JWT Tokens**: Almacenamiento seguro en sessionStorage
- ✅ **Interceptores Axios**: Inyección automática de tokens
- ✅ **Rutas Protegidas**: Redirección automática a login
- ✅ **Manejo de Errores**: Gestión centralizada de errores 401
- ✅ **Navegación Inteligente**: Redirección después del login
- ✅ **Sin Refresh**: Navegación fluida sin recargas de página

### Componentes de Autenticación

#### Login.tsx

```tsx
// Formulario de login con diseño moderno
// Gradientes y efectos glassmorphism
// Validaciones completas
// Manejo de errores de API
```

#### RegistroUsuarios.tsx

```tsx
// Formulario de registro con validaciones
// Confirmación de contraseña
// Validaciones de email y longitud
```

### Helpers de Autenticación

#### authHelper.ts

```tsx
export const authHelper = {
  getToken: () => sessionStorage.getItem('auth_token'),
  saveToken: (token: string) => sessionStorage.setItem('auth_token', token),
  removeToken: () => sessionStorage.removeItem('auth_token'),
  isAuthenticated: () => !!sessionStorage.getItem('auth_token'),
};
```

#### interceptors.ts

```tsx
// Interceptores de Axios para:
// - Inyección automática de tokens
// - Manejo de errores 401
// - Redirección sin refresh
```

### Rutas Protegidas

```tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (!authHelper.isAuthenticated()) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

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
│   ├── FormularioGenerico/          # Sistema de formularios genéricos
│   │   ├── components/               # Componentes de campos
│   │   │   ├── TextField.tsx         # Campo de texto
│   │   │   ├── EmailField.tsx        # Campo de email
│   │   │   ├── CurrencyField.tsx     # Campo de moneda
│   │   │   ├── NumberField.tsx       # Campo numérico
│   │   │   ├── DateField.tsx         # Campo de fecha
│   │   │   ├── CheckboxField.tsx     # Campo checkbox
│   │   │   ├── DropdownField.tsx     # Select estático
│   │   │   ├── DynamicDropdownField.tsx # Select dinámico
│   │   │   └── FormularioGenerico.tsx # Componente principal
│   │   ├── helpers/                  # Funciones auxiliares
│   │   │   ├── validationHelpers.ts  # Helpers de validación
│   │   │   └── formMetadataHelpers.ts # Helpers de metadata
│   │   ├── types/                    # Tipos TypeScript
│   │   │   └── index.ts              # Definiciones de tipos
│   │   ├── index.ts                  # Exportaciones principales
│   │   └── README.md                 # Documentación del sistema
│   ├── helpers/                      # Funciones auxiliares
│   │   ├── authHelper.ts             # Gestión de autenticación
│   │   ├── interceptors.ts           # Interceptores de Axios
│   │   └── routesHelper.ts           # Constantes de rutas
│   ├── hooks/                        # Custom hooks
│   │   ├── useApi.ts                 # Hook para llamadas API
│   │   ├── useNavigation.ts          # Hook de navegación
│   │   └── useAuthForm.ts            # Hook para formularios de auth
│   ├── modules/                      # Módulos de la aplicación
│   │   ├── Login/                    # Módulo de autenticación
│   │   │   ├── Login.tsx             # Componente de login
│   │   │   ├── components/           # Componentes específicos
│   │   │   ├── helpers/              # Helpers específicos
│   │   │   └── types/                # Tipos específicos
│   │   ├── CreacionUsuarios/         # Módulo de registro
│   │   │   ├── RegistroUsuarios.tsx  # Componente de registro
│   │   │   ├── components/           # Componentes específicos
│   │   │   ├── helpers/              # Helpers específicos
│   │   │   └── types/                # Tipos específicos
│   │   ├── Convenios/                # Módulo de convenios
│   │   ├── Pasantias/                # Módulo de Acuerdos Individuales
│   │   ├── Pagos/                    # Módulo de pagos
│   │   ├── Reportes/                 # Módulo de reportes
│   │   ├── Inicio/                   # Módulo de inicio
│   │   ├── Shared/                   # Componentes compartidos
│   │   ├── SharedForms/              # Formularios compartidos
│   │   └── PaginasError/             # Páginas de error
│   ├── features/                     # Características específicas (vacío)
│   ├── contexts/                     # Contextos de React
│   │   ├── QueryProvider.tsx         # Provider de React Query
│   │   └── ThemeProvider.tsx         # Provider del tema
│   ├── routes/                       # Configuración de rutas
│   │   ├── AppRoutes.tsx             # Configuración de rutas
│   │   └── helpers/                  # Helpers de rutas
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
- Tipos básicos para el sistema de gestión de Acuerdos Individuales

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

### FormularioGenerico

- **Metadata**: Definir formularios usando `FormMetadata`
- **Validaciones**: Usar `ValidationRule` para validaciones complejas
- **Tipos**: Usar `FieldType` para tipos de campos
- **Helpers**: Usar helpers predefinidos para formularios comunes
- **noValidate**: Siempre usar `noValidate` para control total

### ElementCardGenerica

- **Metadata**: Definir cartas usando `FieldMetadata` con auto-detección de tipos
- **Formateo**: Automático para fechas, monedas, emails y booleanos
- **Acciones**: Opcionales (editar, expandir, eliminar) usando callbacks
- **Responsive**: Adaptable con Grid de MUI
- **Exclusión**: Automática de campos como id, fechaCreacion, eliminado

### Organización de Módulos

#### **Cuatro Reglas Esenciales para Estructura de Módulos**

Al trabajar con cualquier módulo (ej: `@Empresas/`, `@Inicio/`, `@Login/`, `@CreacionUsuarios/`), seguir estas **4 reglas obligatorias**:

##### **1. Regla StyledComponents.tsx**

- **Ubicación**: `src/modules/[ModuleName]/components/StyledComponents.tsx`
- **Propósito**: Centralizar todos los componentes styled con propiedades `sx`
- **Contenido**: Todos los componentes MUI que usan prop `sx` para estilos
- **Nomenclatura**: Usar nombres descriptivos terminando con `Styled` (ej: `ContenedorPrincipalStyled`, `TarjetaEstadisticaStyled`)
- **Ejemplo**:
  ```typescript
  export const ContenedorPrincipalStyled = styled(Container)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  }));
  ```

##### **2. Regla ComponentesGenericos.tsx**

- **Ubicación**: `src/modules/[ModuleName]/components/ComponentesGenericos.tsx`
- **Propósito**: Alojar componentes MUI reutilizables con lógica personalizada (NO solo `sx`)
- **Contenido**: Componentes con propiedades como `elevation`, `fullWidth`, `variant`, etc.
- **Nomenclatura**: Usar nombres descriptivos sin sufijo `Styled` (ej: `ContenedorPrincipal`, `TarjetaEstadistica`)
- **Ejemplo**:
  ```typescript
  export const TarjetaEstadistica = ({ children }: { children: React.ReactNode }) => (
    <StyledStatsCard elevation={2}>{children}</StyledStatsCard>
  );
  ```

##### **3. Regla de Organización de Tipos**

- **Ubicación**: `src/modules/[ModuleName]/types/index.ts`
- **Propósito**: Centralizar todas las interfaces y tipos TypeScript del módulo
- **Contenido**: Todas las interfaces, tipos, enums y definiciones de tipos
- **Nomenclatura**: Usar PascalCase para interfaces y tipos (ej: `EmpresaDto`, `LoginCredentials`)
- **Ejemplo**:

  ```typescript
  export interface EmpresaDto {
    idEmpresa: number;
    nombre: string;
    // ... otras propiedades
  }

  export type VigenciaType = 'vigente' | 'no_vigente';
  export const Vigencia = {
    Vigente: 'vigente' as const,
    NoVigente: 'no_vigente' as const,
  } as const;
  ```

##### **4. Regla de Organización de Helpers**

- **Ubicación**: `src/modules/[ModuleName]/helpers/[feature]Helpers.ts`
- **Propósito**: Extraer lógica de negocio y funciones complejas de componentes
- **Contenido**: Funciones puras, procesamiento de datos, lógica de validación, generación de metadata
- **Nomenclatura**: Usar camelCase con nombres descriptivos (ej: `getEmpresaMetadata`, `filterEmpresas`)
- **Ejemplo**:

  ```typescript
  export const getEmpresaMetadata = (): FieldMetadata[] => [
    { name: 'nombre', label: 'Nombre de la Empresa' },
    // ... otros campos
  ];

  export const filterEmpresas = (
    empresas: EmpresaDto[],
    searchText: string
  ): EmpresaDto[] => {
    // ... lógica de filtrado
  };
  ```

#### **Guías de Implementación**

##### **Cuándo Usar Cada Archivo**:

- **StyledComponents.tsx**: Componentes con prop `sx` para estilos
- **ComponentesGenericos.tsx**: Componentes con otras props de MUI (elevation, variant, etc.)
- **types/index.ts**: Todas las interfaces y definiciones de tipos TypeScript
- **helpers/[feature]Helpers.ts**: Lógica de negocio y funciones de procesamiento de datos

##### **Prioridad de Extracción de Componentes**:

1. **Primero**: Extraer componentes con `sx` a `StyledComponents.tsx`
2. **Segundo**: Extraer componentes con otras props de MUI a `ComponentesGenericos.tsx`
3. **Tercero**: Extraer interfaces a `types/index.ts`
4. **Cuarto**: Extraer lógica de negocio a `helpers/[feature]Helpers.ts`

##### **Organización de Imports**:

- Importar componentes styled desde `./StyledComponents`
- Importar componentes genéricos desde `./ComponentesGenericos`
- Importar tipos desde `../types`
- Importar helpers desde `../helpers/[feature]Helpers`

##### **Estándares de Calidad de Código**:

- Mantener componentes simples, cortos y funcionales
- Usar nombres significativos para todas las exportaciones
- Mantener convenciones de nomenclatura consistentes
- Evitar props `sx` inline en archivos de componentes principales
- Extraer lógica compleja a funciones helper
- Usar tipos TypeScript apropiados en todo el código

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
