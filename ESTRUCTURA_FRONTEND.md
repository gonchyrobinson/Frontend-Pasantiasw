# 📁 Estructura del Frontend

## 🏗️ Arquitectura General

```
frontend/
├── 📁 src/                    # Código fuente principal
├── 📁 public/                 # Archivos estáticos
├── 📄 package.json            # Dependencias y scripts
├── 📄 vite.config.ts          # Configuración de Vite
├── 📄 tsconfig.json           # Configuración TypeScript
└── 📄 index.html              # Template HTML principal
```

## 📂 Estructura Detallada de `src/`

### 🎯 Punto de Entrada

```
src/
├── 📄 index.tsx               # Punto de entrada de la aplicación
├── 📄 App.tsx                 # Componente raíz de la aplicación
├── 📄 App.test.tsx            # Tests del componente App
├── 📄 index.css               # Estilos globales
└── 📄 vite-env.d.ts           # Tipos de Vite
```

### 🧩 Componentes Compartidos (`components/`)

```
src/components/
├── 📄 ErrorBoundary.tsx       # Manejo de errores global
├── 📄 Footer.tsx              # Pie de página
├── 📄 Header.tsx              # Encabezado de la aplicación
├── 📄 Layout.tsx              # Layout principal
├── 📄 LoadingSpinner.tsx      # Componente de carga
└── 📄 Sidebar.tsx             # Barra lateral
```

### 🏠 Páginas (`pages/`)

```
src/pages/
└── 📁 Home/                   # Página principal
    ├── 📄 index.tsx           # Componente principal de la página
    ├── 📄 index.test.tsx      # Tests de la página
    ├── 📁 components/         # Componentes específicos de la página
    │   ├── 📄 ActionCard.tsx      # Tarjeta de acción
    │   ├── 📄 index.ts            # Export de componentes
    │   ├── 📄 ProgressSection.tsx # Sección de progreso
    │   ├── 📄 StatsCard.tsx       # Tarjeta de estadísticas
    │   └── 📄 WelcomeSection.tsx  # Sección de bienvenida
    └── 📁 helpers/            # Funciones auxiliares específicas
        └── 📄 statsHelpers.ts     # Helpers para estadísticas
```

### 🔄 Contextos (`contexts/`)

```
src/contexts/
├── 📄 QueryProvider.tsx       # Proveedor de React Query
└── 📄 ThemeProvider.tsx       # Proveedor del tema MUI
```

### 🎣 Hooks Personalizados (`hooks/`)

```
src/hooks/
└── 📄 useApi.ts              # Hook para llamadas a la API
```

### 🌐 APIs (`apis/`)

```
src/apis/
└── 📄 apiClient.ts            # Cliente HTTP configurado (Axios)
```

### 🛣️ Rutas (`routes/`)

```
src/routes/
└── 📄 AppRoutes.tsx          # Configuración de rutas (React Router)
```

### 📝 Tipos (`types/`)

```
src/types/
└── 📄 index.ts               # Definiciones de tipos TypeScript
```

### 🛠️ Helpers (`helpers/`)

```
src/helpers/
└── 📄 api.ts                 # Funciones auxiliares para API
```

### 🧪 Tests (`test/`)

```
src/test/
└── 📄 setup.ts               # Configuración de tests (Vitest)
```

### 🚀 Features (`features/`)

```
src/features/                 # Características específicas (vacío por ahora)
```

## 📋 Descripción de Archivos Clave

### 🎯 Archivos de Entrada

| Archivo     | Propósito                                           |
| ----------- | --------------------------------------------------- |
| `index.tsx` | Punto de entrada, renderiza la aplicación en el DOM |
| `App.tsx`   | Componente raíz, configura providers y rutas        |
| `index.css` | Estilos globales de la aplicación                   |

### 🧩 Componentes Principales

| Componente           | Función                                           |
| -------------------- | ------------------------------------------------- |
| `ErrorBoundary.tsx`  | Captura errores de React y muestra fallback       |
| `Layout.tsx`         | Estructura principal con Header, Sidebar y Footer |
| `Header.tsx`         | Barra de navegación superior                      |
| `Sidebar.tsx`        | Menú lateral de navegación                        |
| `Footer.tsx`         | Pie de página con información                     |
| `LoadingSpinner.tsx` | Indicador de carga reutilizable                   |

### 🏠 Página Home

| Componente            | Función                          |
| --------------------- | -------------------------------- |
| `WelcomeSection.tsx`  | Sección de bienvenida al usuario |
| `StatsCard.tsx`       | Tarjeta que muestra estadísticas |
| `ActionCard.tsx`      | Tarjeta con acciones rápidas     |
| `ProgressSection.tsx` | Sección que muestra progreso     |

### 🔄 Providers

| Provider            | Función                                      |
| ------------------- | -------------------------------------------- |
| `QueryProvider.tsx` | Configura React Query para gestión de estado |
| `ThemeProvider.tsx` | Configura el tema de Material-UI             |

### 🌐 Configuración de API

| Archivo        | Función                                    |
| -------------- | ------------------------------------------ |
| `apiClient.ts` | Cliente Axios configurado con interceptors |
| `useApi.ts`    | Hook personalizado para llamadas a la API  |
| `api.ts`       | Funciones auxiliares para manejo de API    |

### 🛣️ Enrutamiento

| Archivo         | Función                                 |
| --------------- | --------------------------------------- |
| `AppRoutes.tsx` | Configuración de rutas con React Router |

### 📝 Tipos TypeScript

| Archivo    | Función                                       |
| ---------- | --------------------------------------------- |
| `index.ts` | Definiciones de tipos para toda la aplicación |

## 🏗️ Patrones de Arquitectura

### 📁 Estructura por Páginas

Cada página sigue esta estructura:

```
pages/[PageName]/
├── index.tsx              # Componente principal
├── index.test.tsx         # Tests de la página
├── components/            # Componentes específicos
│   ├── ComponentName.tsx
│   └── index.ts          # Export de componentes
└── helpers/              # Funciones auxiliares
    └── helperName.ts
```

### 🧩 Componentes

- **Compartidos**: En `src/components/`
- **Específicos**: En `pages/[PageName]/components/`
- **Reutilizables**: Preferir componentes compartidos

### 🎣 Hooks

- **Personalizados**: En `src/hooks/`
- **Convención**: Prefijo `use` (ej: `useApi`)

### 🔄 Contextos

- **Globales**: En `src/contexts/`
- **Uso**: Para estado compartido entre componentes

## 📦 Dependencias Principales

### 🎨 UI Framework

- **Material-UI**: Componentes de UI
- **Emotion**: CSS-in-JS para estilos

### 🔄 State Management

- **React Query**: Gestión de estado del servidor
- **React Context**: Estado global

### 🛣️ Routing

- **React Router**: Navegación entre páginas

### 🧪 Testing

- **Vitest**: Framework de testing
- **React Testing Library**: Testing de componentes

### 🛠️ Development

- **Vite**: Build tool y dev server
- **TypeScript**: Tipado estático
- **ESLint + Prettier**: Linting y formateo

## 🎯 Convenciones de Nomenclatura

### 📁 Carpetas

- **Páginas**: PascalCase (`Home/`)
- **Componentes**: PascalCase (`components/`)
- **Hooks**: camelCase (`hooks/`)

### 📄 Archivos

- **Componentes**: PascalCase (`Header.tsx`)
- **Hooks**: camelCase (`useApi.ts`)
- **Tipos**: PascalCase (`ApiResponse`)
- **Tests**: `.test.tsx` o `.spec.tsx`

### 🏷️ Variables y Funciones

- **Componentes**: PascalCase (`UserProfile`)
- **Hooks**: camelCase (`useApi`)
- **Funciones**: camelCase (`fetchData`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🔧 Configuración

### ⚙️ Vite

- **Dev Server**: Puerto 3000
- **Hot Reload**: Habilitado
- **Proxy**: Configurado para `/api/*`

### 📝 TypeScript

- **Target**: ES2020
- **Strict Mode**: Habilitado
- **Path Mapping**: `@/*` → `src/*`

### 🧪 Testing

- **Environment**: jsdom
- **Setup**: `src/test/setup.ts`
- **Coverage**: v8 provider

## 🚀 Flujo de Desarrollo

### 📝 Crear Nueva Página

1. Crear carpeta en `src/pages/[PageName]/`
2. Crear `index.tsx` con el componente principal
3. Crear `index.test.tsx` para tests
4. Agregar ruta en `AppRoutes.tsx`
5. Crear componentes específicos en `components/`
6. Crear helpers en `helpers/` si es necesario

### 🧩 Crear Nuevo Componente

1. Crear archivo en `src/components/` o `pages/[PageName]/components/`
2. Usar PascalCase para el nombre
3. Crear test correspondiente
4. Exportar desde `index.ts` si es en carpeta

### 🎣 Crear Nuevo Hook

1. Crear archivo en `src/hooks/`
2. Usar prefijo `use` y camelCase
3. Crear test correspondiente
4. Documentar parámetros y retorno

---

**Esta estructura sigue las mejores prácticas de React y facilita el mantenimiento y escalabilidad del proyecto.** 🎉
