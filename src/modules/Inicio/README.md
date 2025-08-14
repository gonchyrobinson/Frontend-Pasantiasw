# Módulo Inicio

## Descripción

Módulo principal del dashboard que muestra estadísticas, acciones rápidas y progreso del sistema de gestión de pasantías.

## Componentes

### Inicio.tsx

Componente principal que integra todos los elementos del dashboard:

- Estadísticas en tiempo real
- Acciones rápidas
- Sección de progreso
- Speed dial para acciones

### WelcomeSection

Sección de bienvenida con título, subtítulo y estado del sistema.

### StatsCard

Tarjetas de estadísticas con:

- Iconos representativos
- Valores numéricos
- Indicadores de tendencia
- Estados de carga y error
- Navegación al hacer clic

### ActionCard

Tarjetas de acción rápida para:

- Nuevo Convenio
- Nueva Pasantía
- Registrar Pago

### ProgressSection

Sección que muestra el progreso del sistema con barras de progreso.

### SpeedDialRapido

Botón flotante con acciones rápidas accesibles desde cualquier parte del dashboard.

## Funcionalidades

### Navegación

- Los botones de estadísticas navegan a sus respectivos módulos
- Las tarjetas de acción rápida navegan a formularios de creación
- El speed dial proporciona acceso rápido a acciones comunes

### Estados

- Carga de datos con indicadores visuales
- Manejo de errores con alertas
- Estados de hover y transiciones suaves

### Responsividad

- Grid system adaptativo
- Componentes que se ajustan a diferentes tamaños de pantalla

## Uso

```tsx
import Inicio from './modules/Inicio';

// En tu router o componente principal
<Inicio />;
```

## Dependencias

- Material-UI (MUI)
- React Router DOM
- React Query (TanStack Query)
- Iconos de Material-UI
