# Componentes de la Biblioteca

## VencimientosNotifications

Componente genérico para mostrar notificaciones de elementos por vencer (pagos, convenios, pasantías, etc.).

### Características

- **Genérico**: Puede ser configurado para cualquier tipo de elemento con fecha de vencimiento
- **Configurable**: Cada implementación define su propia configuración (título, icono, mensajes)
- **Responsive**: Se adapta al contenido y muestra un máximo configurable de elementos
- **Interactivo**: Permite hacer clic en cada elemento para navegar a sus detalles
- **Estados**: Maneja estados de carga, error y vacío

### Uso

```tsx
import VencimientosNotifications, {
  VencimientoItem,
  VencimientoConfig,
} from '@lib/components/VencimientosNotifications';

// Configuración específica para el tipo de elemento
const config: VencimientoConfig = {
  title: 'Mi Título',
  icon: <MyIcon />,
  emptyMessage: 'No hay elementos',
  emptySubtitle: 'Descripción del estado vacío',
  getItemTitle: (item: VencimientoItem) => item.nombre,
  getItemSubtitle: (item: VencimientoItem) => item.descripcion,
  onItemClick: (item: VencimientoItem) => handleClick(item),
};

// Uso del componente
<VencimientosNotifications
  items={items}
  isLoading={isLoading}
  error={error}
  config={config}
  onClose={handleClose}
  maxItems={5}
/>;
```

### Configuración

#### VencimientoConfig

- `title`: Título de la sección de notificaciones
- `icon`: Icono representativo del tipo de elemento
- `emptyMessage`: Mensaje cuando no hay elementos
- `emptySubtitle`: Subtítulo cuando no hay elementos
- `getItemTitle`: Función para obtener el título de cada elemento
- `getItemSubtitle`: Función para obtener el subtítulo de cada elemento
- `onItemClick`: Función llamada al hacer clic en un elemento
- `getDiasRestantes`: Función opcional para calcular días restantes (por defecto usa la implementación estándar)

#### VencimientoItem

- `id`: Identificador único del elemento
- `fechaVencimiento`: Fecha de vencimiento (opcional)
- `[key: string]: any`: Propiedades adicionales específicas de cada tipo

### Implementaciones Existentes

1. **PagosVencerNotifications**: Para pagos por vencer
2. **ConveniosVencerNotifications**: Para convenios por vencer
3. **PasantiasVencerNotifications**: Para pasantías por vencer

### Personalización

El componente es altamente personalizable a través de la configuración:

- **Estilos**: Los colores de los chips se calculan automáticamente según la urgencia
- **Contenido**: Cada implementación define qué información mostrar
- **Comportamiento**: Navegación personalizada para cada tipo de elemento
- **Límites**: Número máximo de elementos mostrados configurable
