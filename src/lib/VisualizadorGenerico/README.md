# VisualizadorGenerico

Un componente genérico y altamente configurable para mostrar datos de forma estructurada y elegante, similar al `FormularioGenerico` pero para visualización en lugar de edición.

## 🚀 Características

- **Múltiples tipos de campo**: texto, email, teléfono, moneda, fechas, booleanos, badges, links, imágenes, JSON, listas y campos personalizados
- **Secciones colapsables**: Organiza la información en secciones expandibles/contraíbles
- **Responsive**: Se adapta automáticamente a diferentes tamaños de pantalla
- **Acciones integradas**: Botones para editar, copiar datos, imprimir
- **Copia fácil**: Funcionalidad de copiado para emails, teléfonos y datos completos
- **Formato automático**: Formateo inteligente de números, fechas, monedas y teléfonos
- **Estados de carga y error**: Manejo elegante de estados de carga y errores
- **Personalizable**: Renderizado personalizado para casos específicos

## 📁 Estructura del Proyecto

```
src/lib/VisualizadorGenerico/
├── components/
│   ├── VisualizadorGenerico.tsx       # Componente principal
│   └── FieldDisplayComponents.tsx     # Componentes de campo individuales
├── types/
│   └── index.ts                       # Definiciones de tipos TypeScript
├── examples/
│   └── EjemplosUso.tsx               # Ejemplos de uso completos
├── index.ts                          # Exportaciones principales
└── README.md                         # Esta documentación
```

## 🎯 Uso Básico

### Importación

```typescript
import { VisualizadorGenerico, DisplayMetadata } from '@lib/components';
// o
import {
  VisualizadorGenerico,
  DisplayMetadata,
} from '@lib/VisualizadorGenerico';
```

### Ejemplo Simple

```typescript
import React from 'react';
import { VisualizadorGenerico, DisplayMetadata } from '@lib/components';

const datos = {
  nombre: 'Tech Solutions S.A.',
  email: 'contacto@techsolutions.com',
  telefono: '11-4567-8900',
  vigencia: 'vigente',
  fechaCreacion: '2023-01-15T10:30:00'
};

const metadata: DisplayMetadata = {
  title: 'Información de la Empresa',
  subtitle: 'Datos completos registrados',
  showEditButton: true,
  showCopyButton: true,
  sections: [{
    title: 'Datos Principales',
    gridContainer: true,
    fields: [
      { name: 'nombre', label: 'Nombre', type: 'text', gridSize: 12 },
      { name: 'email', label: 'Email', type: 'email', gridSize: 6 },
      { name: 'telefono', label: 'Teléfono', type: 'phone', gridSize: 6 },
      { name: 'vigencia', label: 'Estado', type: 'badge', gridSize: 6 },
      { name: 'fechaCreacion', label: 'Creado', type: 'datetime', gridSize: 6 }
    ]
  }]
};

const MiComponente = () => (
  <VisualizadorGenerico
    metadata={metadata}
    data={datos}
  />
);
```

## 🔧 Tipos de Campo

### Tipos Básicos

#### `text` - Texto simple

```typescript
{
  name: 'descripcion',
  label: 'Descripción',
  type: 'text',
  prefix: '📝 ', // Opcional
  suffix: ' (verificado)', // Opcional
  fallback: 'Sin descripción' // Valor por defecto
}
```

#### `email` - Correo electrónico

```typescript
{
  name: 'email',
  label: 'Email',
  type: 'email' // Incluye ícono, link mailto: y botón copiar automáticamente
}
```

#### `phone` - Número de teléfono

```typescript
{
  name: 'telefono',
  label: 'Teléfono',
  type: 'phone' // Incluye ícono, link tel: y formateo automático
}
```

#### `currency` - Moneda

```typescript
{
  name: 'precio',
  label: 'Precio',
  type: 'currency',
  prefix: '$' // Por defecto es '$'
}
```

#### `number` - Números

```typescript
{
  name: 'cantidad',
  label: 'Cantidad',
  type: 'number',
  suffix: ' unidades'
}
```

#### `date` / `datetime` - Fechas

```typescript
{
  name: 'fechaNacimiento',
  label: 'Fecha de Nacimiento',
  type: 'date', // Para solo fecha
  format: 'long' // 'short' | 'medium' | 'long' | 'full'
},
{
  name: 'fechaCreacion',
  label: 'Creado el',
  type: 'datetime' // Incluye hora automáticamente
}
```

#### `boolean` - Verdadero/Falso

```typescript
{
  name: 'activo',
  label: 'Está Activo',
  type: 'boolean' // Muestra íconos ✓ o ✗ con "Sí"/"No"
}
```

### Tipos Avanzados

#### `badge` - Etiquetas/Chips

```typescript
{
  name: 'estado',
  label: 'Estado',
  type: 'badge',
  badgeConfig: {
    variant: 'filled', // 'filled' | 'outlined'
    color: 'success',  // 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
    size: 'medium'     // 'small' | 'medium'
  }
}
```

#### `link` - Enlaces

```typescript
{
  name: 'sitioWeb',
  label: 'Sitio Web',
  type: 'link',
  linkConfig: {
    href: '{value}', // Usa {value} para el valor del campo
    target: '_blank',
    external: true // Muestra ícono de enlace externo
  }
}
```

#### `image` - Imágenes

```typescript
{
  name: 'avatar',
  label: 'Foto',
  type: 'image' // Muestra un Avatar con la imagen
}
```

#### `json` - Datos JSON

```typescript
{
  name: 'configuracion',
  label: 'Configuración',
  type: 'json' // Muestra JSON formateado y colapsable
}
```

#### `list` - Listas/Arrays

```typescript
{
  name: 'tags',
  label: 'Etiquetas',
  type: 'list' // Muestra cada elemento como un bullet point
}
```

#### `custom` - Renderizado personalizado

```typescript
{
  name: 'empresa',
  label: 'Empresa',
  type: 'custom',
  render: (value, allData) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Business />
      <div>
        <div style={{ fontWeight: 600 }}>{value?.nombre}</div>
        <div style={{ fontSize: '0.875rem', color: '#666' }}>{value?.email}</div>
      </div>
    </div>
  )
}
```

## 📋 Configuración de Metadata

### DisplayMetadata (Configuración Principal)

```typescript
interface DisplayMetadata {
  title?: string; // Título principal
  subtitle?: string; // Subtítulo
  sections: SectionMetadata[]; // Secciones de datos
  showCopyButton?: boolean; // Botón para copiar todos los datos
  showPrintButton?: boolean; // Botón de imprimir
  showEditButton?: boolean; // Botón de editar
  editButtonText?: string; // Texto del botón editar
  onEdit?: () => void; // Función al hacer clic en editar
}
```

### SectionMetadata (Configuración de Sección)

```typescript
interface SectionMetadata {
  title?: string; // Título de la sección
  subtitle?: string; // Subtítulo de la sección
  fields: FieldDisplayMetadata[]; // Campos de la sección
  collapsible?: boolean; // Si la sección es colapsable
  defaultExpanded?: boolean; // Si está expandida por defecto
  gridContainer?: boolean; // Si usa grid responsive (recomendado)
}
```

### FieldDisplayMetadata (Configuración de Campo)

```typescript
interface FieldDisplayMetadata {
  name: string; // Nombre del campo en los datos
  label: string; // Etiqueta a mostrar
  type: FieldDisplayType; // Tipo de campo
  gridSize?: number; // Tamaño en grid (1-12, por defecto 6)
  format?: string; // Formato específico (fechas, etc.)
  prefix?: string; // Prefijo a mostrar
  suffix?: string; // Sufijo a mostrar
  fallback?: string; // Valor si el campo está vacío
  hidden?: boolean; // Si el campo está oculto

  // Configuraciones específicas
  badgeConfig?: BadgeConfig;
  linkConfig?: LinkConfig;

  // Renderizado personalizado
  render?: (value: any, data: Record<string, any>) => React.ReactNode;
}
```

## 🎨 Ejemplos Avanzados

### Ejemplo con Múltiples Secciones

```typescript
const metadataCompleta: DisplayMetadata = {
  title: 'Perfil de Usuario Completo',
  subtitle: 'Información personal, contacto y configuración',
  showEditButton: true,
  showCopyButton: true,
  showPrintButton: true,
  onEdit: () => router.push('/editar'),
  sections: [
    {
      title: 'Información Personal',
      gridContainer: true,
      fields: [
        { name: 'nombre', label: 'Nombre', type: 'text', gridSize: 6 },
        { name: 'apellido', label: 'Apellido', type: 'text', gridSize: 6 },
        {
          name: 'fechaNacimiento',
          label: 'Fecha de Nacimiento',
          type: 'date',
          gridSize: 6,
        },
        {
          name: 'activo',
          label: 'Usuario Activo',
          type: 'boolean',
          gridSize: 6,
        },
      ],
    },
    {
      title: 'Información de Contacto',
      gridContainer: true,
      fields: [
        { name: 'email', label: 'Email', type: 'email', gridSize: 6 },
        { name: 'telefono', label: 'Teléfono', type: 'phone', gridSize: 6 },
        { name: 'sitioWeb', label: 'Sitio Web', type: 'link', gridSize: 6 },
      ],
    },
    {
      title: 'Configuración Avanzada',
      collapsible: true,
      defaultExpanded: false,
      fields: [
        { name: 'configuracion', label: 'Configuración JSON', type: 'json' },
        { name: 'permisos', label: 'Permisos', type: 'list' },
      ],
    },
  ],
};
```

### Ejemplo con Renderizado Personalizado

```typescript
const metadataPersonalizada: DisplayMetadata = {
  title: 'Dashboard de Ventas',
  sections: [{
    title: 'Métricas',
    gridContainer: true,
    fields: [
      {
        name: 'totalVentas',
        label: 'Total de Ventas',
        type: 'custom',
        gridSize: 6,
        render: (value) => (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              ${value?.toLocaleString()}
            </Typography>
            <Typography variant="caption">
              Este mes
            </Typography>
          </Box>
        )
      },
      {
        name: 'tendencia',
        label: 'Tendencia',
        type: 'custom',
        gridSize: 6,
        render: (value) => (
          <Chip
            icon={value > 0 ? <TrendingUp /> : <TrendingDown />}
            label={`${value > 0 ? '+' : ''}${value}%`}
            color={value > 0 ? 'success' : 'error'}
          />
        )
      }
    ]
  }]
};
```

## 🔌 Integración con Backend

### Con React Query

```typescript
import { useApiQuery } from '@hooks/useApi';

const DetalleEmpresa = ({ id }: { id: number }) => {
  const { data, isLoading, error, refetch } = useApiQuery<EmpresaDto>(`/empresas/${id}`);

  return (
    <VisualizadorGenerico
      metadata={empresaMetadata}
      data={data}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
    />
  );
};
```

### Helper para Generar Metadata

```typescript
import { generarMetadataBasica } from '@lib/VisualizadorGenerico/examples/EjemplosUso';

// Genera metadata básica rápidamente
const metadata = generarMetadataBasica('Mi Entidad', [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'fechaCreacion', label: 'Creado', type: 'date' },
]);
```

## 🎭 Estados del Componente

### Estado de Carga

```typescript
<VisualizadorGenerico
  metadata={metadata}
  data={data}
  loading={true} // Muestra spinner de carga
/>
```

### Estado de Error

```typescript
<VisualizadorGenerico
  metadata={metadata}
  data={data}
  error="Error al cargar los datos"
  onRetry={() => refetch()} // Botón para reintentar
/>
```

### Sin Datos

```typescript
<VisualizadorGenerico
  metadata={metadata}
  data={{}} // Objeto vacío o undefined - muestra mensaje de "sin datos"
/>
```

## 🔧 Personalización de Estilos

El componente utiliza los componentes styled del proyecto (`StyledText`, `StyledContainers`, `StyledButtons`) y sigue el tema de Material-UI configurado.

### Colores de Badge por Estado

```typescript
// Estados comunes y sus colores recomendados
const badgeColors = {
  activo: 'success',
  vigente: 'success',
  pendiente: 'warning',
  inactivo: 'error',
  cancelado: 'error',
  procesando: 'info',
};
```

## 📱 Responsive Design

El componente es completamente responsive:

- En pantallas grandes: usa el `gridSize` especificado
- En pantallas medianas: ajusta automáticamente
- En pantallas pequeñas: campos apilados verticalmente

## 🚀 Ejemplos de Uso en el Proyecto

Consulta los ejemplos completos en `examples/EjemplosUso.tsx`:

- **EjemploEmpresa**: Muestra datos de empresa con todas las características
- **EjemploEstudiante**: Perfil de estudiante con información académica
- **EjemploConvenio**: Detalles de convenio con empresa asociada

## 🛠️ Casos de Uso Recomendados

1. **Páginas de detalle**: Mostrar información completa de una entidad
2. **Dashboards**: Métricas y estadísticas con renderizado personalizado
3. **Perfiles de usuario**: Información personal y configuración
4. **Reportes**: Datos estructurados para visualización e impresión
5. **Confirmaciones**: Mostrar datos antes de operaciones importantes

## 🔍 Troubleshooting

### El campo no se muestra

- Verifica que `field.name` coincida con la propiedad en `data`
- Revisa que `field.hidden` no esté en `true`
- Comprueba que el valor no sea `undefined` y tengas un `fallback`

### Error en renderizado personalizado

- Asegúrate de que `field.render` retorne JSX válido
- Maneja casos donde `value` pueda ser `null` o `undefined`
- Revisa la consola para errores específicos

### Formato de fecha incorrecto

- Verifica que el valor sea una fecha válida
- Usa el tipo `datetime` para incluir hora
- Ajusta `format` según necesites (`short`, `medium`, `long`, `full`)

Este componente está diseñado para ser la contraparte de visualización del `FormularioGenerico`, manteniendo la misma filosofía de configuración mediante metadata JSON y máxima flexibilidad.
