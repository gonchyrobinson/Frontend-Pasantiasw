# Tabla Genérica

Componente genérico para mostrar datos en formato de tabla usando MUI Data Grid.

## Instalación

Este componente requiere las siguientes dependencias:

```bash
npm install @mui/x-data-grid @mui/material @emotion/react @emotion/styled
```

## Características

- ✅ Tabla completamente genérica basada en metadata JSON
- ✅ Ordenamiento automático de columnas
- ✅ Filtrado integrado
- ✅ Paginación configurable
- ✅ Selección de filas opcional
- ✅ Acciones por fila (editar, eliminar, personalizadas)
- ✅ Formateo automático de datos
- ✅ Diseño responsive
- ✅ Integración con el tema del proyecto
- ✅ **Compatibilidad con ElementCardGenerica** - usa el mismo formato de metadata
- ✅ **Headers inteligentes** - diferentes variantes según el contexto
- ✅ **Acciones de página** - botones de refresh y acciones principales

## Uso Básico

### Con metadata (recomendado para compatibilidad con ElementCardGenerica)

```tsx
import { TablaGenericaWrapper } from '@/TablaGenerica';

const metadata = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date' },
  { name: 'monto', label: 'Monto', type: 'currency' },
  { name: 'activo', label: 'Activo', type: 'boolean' },
];

const data = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    fechaInicio: '2024-01-15',
    monto: 50000,
    activo: true,
  },
  // ... más datos
];

<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  title='Lista de Usuarios'
  subtitle='Gestión de usuarios del sistema'
  onRowClick={row => console.log('Fila clickeada:', row)}
  onRowEdit={row => console.log('Editar:', row)}
  onRowDelete={row => console.log('Eliminar:', row)}
/>;
```

### Con columns (más flexible)

```tsx
import { TablaGenerica } from '@/TablaGenerica';

const columns = [
  { name: 'nombre', label: 'Nombre', type: 'text', width: 200 },
  { name: 'email', label: 'Email', type: 'email', width: 250 },
  { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date', width: 150 },
  { name: 'monto', label: 'Monto', type: 'currency', width: 150 },
];

<TablaGenerica
  columns={columns}
  data={data}
  title='Lista de Usuarios'
  subtitle='Gestión de usuarios del sistema'
  onRowClick={row => console.log('Fila clickeada:', row)}
  onRowEdit={row => console.log('Editar:', row)}
  onRowDelete={row => console.log('Eliminar:', row)}
/>;
```

## Headers Inteligentes

El componente incluye diferentes variantes de header según el contexto:

### Variante Default

```tsx
<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  title='Mi Tabla'
  subtitle='Descripción de la tabla'
  headerVariant='default' // Opcional, es el valor por defecto
/>
```

### Variante Compact

```tsx
<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  title='Tabla Compacta'
  subtitle='Para espacios reducidos'
  headerVariant='compact'
/>
```

### Variante Detailed

```tsx
<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  title='Tabla Detallada'
  subtitle='Para vistas principales'
  headerVariant='detailed'
/>
```

### Variante Page (con acciones)

```tsx
<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  title='Gestión de Usuarios'
  subtitle='Administra los usuarios del sistema'
  headerVariant='page'
  onRefresh={handleRefresh}
  isRefreshing={isRefreshing}
  onPageAction={handleNuevoUsuario}
  pageActionText='Nuevo Usuario'
/>
```

## Props

### `metadata` (recomendado)

Array de objetos con la estructura de campos a mostrar (compatible con ElementCardGenerica):

- `name`: nombre del campo en el objeto data
- `label`: etiqueta a mostrar en el header
- `type`: tipo de dato para formateo automático

### `columns` (alternativo)

Array de objetos con la estructura de columnas:

- `name`: nombre del campo en el objeto data
- `label`: etiqueta a mostrar en el header
- `type`: tipo de dato para formateo automático
- `width`: ancho de la columna (opcional)
- `sortable`: si la columna es ordenable (opcional, default: true)
- `filterable`: si la columna es filtrable (opcional, default: true)
- `renderCell`: función personalizada para renderizar la celda (opcional)

### `data` (requerido)

Array de objetos con los datos a mostrar

### Funciones opcionales

- `onRowClick`: función al hacer clic en una fila
- `onRowEdit`: función al editar una fila
- `onRowDelete`: función al eliminar una fila
- `extraActions`: array de acciones personalizadas por fila

### Configuración

- `pageSize`: número de filas por página (default: 10)
- `pageSizeOptions`: opciones de tamaño de página
- `disableSelection`: deshabilitar selección de filas
- `disableSorting`: deshabilitar ordenamiento
- `disableFiltering`: deshabilitar filtrado
- `initialSortModel`: ordenamiento inicial
- `initialFilterModel`: filtros iniciales

### Header y Acciones de Página

- `headerVariant`: variante del header ('default' | 'compact' | 'detailed' | 'page')
- `onRefresh`: función para refrescar datos
- `isRefreshing`: estado de carga del refresh
- `onPageAction`: función para acción principal de página
- `pageActionText`: texto del botón de acción principal

## Tipos de Datos Soportados

| Tipo       | Descripción  | Formateo Automático |
| ---------- | ------------ | ------------------- |
| `text`     | Texto básico | Sin formateo        |
| `email`    | Email        | Validación visual   |
| `date`     | Fecha        | Formato local       |
| `currency` | Moneda       | Formato de moneda   |
| `number`   | Número       | Separadores locales |
| `boolean`  | Booleano     | Chip Sí/No          |

## Acciones Personalizadas

```tsx
const extraActions = [
  {
    label: 'Ver Detalles',
    onClick: row => console.log('Ver:', row),
    color: 'info',
    icon: <VisibilityIcon />,
  },
  {
    label: 'Descargar',
    onClick: row => console.log('Descargar:', row),
    color: 'success',
    icon: <DownloadIcon />,
  },
];

<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  extraActions={extraActions}
/>;
```

## Formateo Personalizado

```tsx
const columns = [
  {
    name: 'estado',
    label: 'Estado',
    type: 'text',
    renderCell: value => (
      <Chip
        label={value}
        color={value === 'activo' ? 'success' : 'error'}
        size='small'
      />
    ),
  },
];
```

## Ordenamiento y Filtrado

El componente incluye ordenamiento y filtrado automático:

```tsx
<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  // Ordenamiento inicial
  initialSortModel={[{ field: 'nombre', sort: 'asc' }]}
  // Filtros iniciales
  initialFilterModel={{
    items: [{ field: 'activo', operator: 'equals', value: true }],
  }}
/>
```

## Ejemplo Completo con Header Inteligente

```tsx
import React, { useState } from 'react';
import { TablaGenericaWrapper } from '@/TablaGenerica';
import { useSnackbar } from '@/hooks/useSnackbar';

const EmpresasTable = () => {
  const { showSuccess, showError } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const metadata = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'cuit', label: 'CUIT', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'telefono', label: 'Teléfono', type: 'text' },
    { name: 'fechaCreacion', label: 'Fecha Creación', type: 'date' },
    { name: 'activa', label: 'Activa', type: 'boolean' },
  ];

  const handleEdit = row => {
    showSuccess('Editando empresa: ' + row.nombre);
  };

  const handleDelete = row => {
    showError('Eliminando empresa: ' + row.nombre);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Lógica de refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleNuevaEmpresa = () => {
    // Lógica para crear nueva empresa
    showSuccess('Creando nueva empresa');
  };

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={empresas}
      title='Empresas'
      subtitle='Gestión de empresas registradas en el sistema'
      loading={loading}
      onRowEdit={handleEdit}
      onRowDelete={handleDelete}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      // Header inteligente con acciones
      headerVariant='page'
      onRefresh={handleRefresh}
      isRefreshing={isRefreshing}
      onPageAction={handleNuevaEmpresa}
      pageActionText='Nueva Empresa'
    />
  );
};
```

## Migración desde ElementCardGenerica

Si ya tienes metadata definida para ElementCardGenerica, puedes usarla directamente:

```tsx
// Metadata existente para ElementCardGenerica
const metadata = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  // ... más campos
];

// Usar en tabla
<TablaGenericaWrapper
  metadata={metadata}
  data={data}
  title="Mi Tabla"
/>

// Usar en cards
<Grids
  items={data}
  metadata={metadata}
  // ... más props
/>
```

## Integración con Backend

Los nombres de los campos en `metadata[].name` deben coincidir exactamente con los nombres de los campos en tu API para un mapeo automático correcto.

## Características Avanzadas

- **Ordenamiento múltiple**: Mantén Ctrl/Cmd presionado para ordenar por múltiples columnas
- **Filtros avanzados**: Filtros por tipo de dato con operadores específicos
- **Paginación del lado del cliente**: Manejo eficiente de grandes conjuntos de datos
- **Accesibilidad**: Soporte completo para navegación por teclado y lectores de pantalla
- **Tema personalizable**: Se adapta automáticamente al tema del proyecto
- **Headers inteligentes**: Diferentes variantes según el contexto de uso
- **Acciones de página**: Botones de refresh y acciones principales integrados

## Diferencias con ElementCardGenerica

| Aspecto                | ElementCardGenerica | TablaGenerica       |
| ---------------------- | ------------------- | ------------------- |
| **Formato**            | Cards/Grid          | Tabla               |
| **Datos**              | Array de items      | Array de items      |
| **Metadata**           | ✅ Compatible       | ✅ Compatible       |
| **Ordenamiento**       | ❌ No               | ✅ Sí               |
| **Filtrado**           | ❌ No               | ✅ Sí               |
| **Paginación**         | ❌ No               | ✅ Sí               |
| **Acciones**           | Botones en cards    | Botones en filas    |
| **Headers**            | ❌ No               | ✅ Sí (4 variantes) |
| **Acciones de página** | ❌ No               | ✅ Sí               |
| **Uso**                | Vista general       | Datos detallados    |

## Mejores Prácticas

1. **Usa metadata cuando sea posible**: Mantiene consistencia con ElementCardGenerica
2. **Define tipos de datos correctos**: Permite formateo automático apropiado
3. **Configura ordenamiento inicial**: Mejora la experiencia del usuario
4. **Usa filtros iniciales**: Para mostrar solo datos relevantes por defecto
5. **Personaliza acciones**: Agrega botones específicos para tu caso de uso
6. **Mantén consistencia**: Usa el mismo formato de metadata en toda la aplicación
7. **Elige la variante de header apropiada**: Según el contexto y funcionalidades necesarias
8. **Implementa acciones de página**: Para funcionalidades principales como refresh y crear
