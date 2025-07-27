# Sistema de Gestión de Pasantías

Sistema web para la gestión de pasantías de la Secretaría de Bienestar Estudiantil, desarrollado con React, TypeScript y Material-UI.

## 🚀 Características

- **Interfaz Moderna**: Diseño responsive con Material-UI
- **Gestión de Estado**: React Query para estado del servidor
- **TypeScript**: Tipado estático para mayor seguridad
- **Accesibilidad**: Componentes con ARIA attributes
- **Manejo de Errores**: Error boundaries y estados de carga
- **Testing**: Tests unitarios con React Testing Library

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Material-UI (MUI)** para componentes UI
- **React Query** para gestión de estado del servidor
- **Axios** para llamadas HTTP
- **React Router** para navegación
- **React Testing Library** para testing

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes compartidos
├── hooks/         # Custom hooks
├── contexts/      # React contexts
├── apis/          # Integración con APIs
├── types/         # Tipos TypeScript
├── helpers/       # Funciones utilitarias
└── [feature]/     # Código específico de features
    ├── components/
    ├── hooks/
    └── types/
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

## 🔧 Configuración de MUI MCP

Este proyecto está configurado para usar el **Material-UI Model Context Protocol (MCP)** que proporciona acceso directo a la documentación oficial de MUI.

### Configuración en Cursor

1. **Abrir configuración de MCP** en Cursor ("Settings" -> "MCP" -> "Add Server")

2. **Agregar el servidor MUI MCP**:

```json
{
  "mcp": {
    "servers": {
      "mui-mcp": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@mui/mcp@latest"]
      }
    }
  }
}
```

3. **Probar la conexión**:

```bash
npm run mcp:test
```

### Beneficios del MUI MCP

- ✅ **Documentación oficial**: Acceso directo a la documentación de MUI
- ✅ **Ejemplos de código**: Código real y verificable
- ✅ **Sin alucinaciones**: Respuestas basadas en documentación real
- ✅ **Enlaces verificables**: URLs que funcionan y llevan a la documentación correcta

### Uso del MCP

El MCP se activa automáticamente cuando haces preguntas sobre Material-UI. El asistente:

1. Busca en la documentación oficial de MUI
2. Obtiene ejemplos de código reales
3. Proporciona enlaces directos a la documentación
4. Da respuestas precisas y actualizadas

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch
```

## 📦 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta los tests
- `npm run mcp:test` - Prueba la conexión del MUI MCP

## 🎨 Guías de Estilo

### Componentes
- Usar componentes funcionales con TypeScript
- Definir interfaces para props
- Seguir el patrón: `ComponentName.tsx`

### Estado
- React Query para estado del servidor
- React Context para estado global de UI
- Estado local cuando sea posible

### Styling
- Material-UI como librería principal
- Sistema de theming de MUI
- `clsx` para clases condicionales

## 🔗 Enlaces Útiles

- [Documentación de Material-UI](https://mui.com/material-ui/getting-started/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📝 Licencia

Este proyecto está bajo la licencia MIT.
