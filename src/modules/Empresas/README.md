# Módulo de Empresas

Módulo completo para la gestión de empresas en el sistema de pasantías, implementando el componente genérico `ElementCard`.

## 📁 Estructura

```
Empresas/
├── components/
│   ├── EmpresasGrid.tsx      # Grid de cartas de empresas
│   ├── EmpresasFilters.tsx   # Filtros y búsqueda
│   └── EmpresasStats.tsx     # Estadísticas y métricas
├── helpers/
│   └── empresaHelpers.ts     # Funciones auxiliares
├── types/
│   └── index.ts              # Tipos TypeScript
├── Empresas.tsx              # Componente principal
├── index.ts                  # Exportaciones
└── README.md                 # Esta documentación
```

## 🎯 Características

### ✨ Funcionalidades Principales

- **Visualización en cartas**: Uso del componente `ElementCard` para mostrar empresas
- **Filtros inteligentes**: Búsqueda por texto, vigencia y tipo de contrato
- **Estadísticas en tiempo real**: Métricas de empresas activas/inactivas y distribución por tipo
- **Acciones por carta**: Ver, editar, eliminar y expandir (ver convenios asociados)
- **Responsive**: Adaptable a todos los tamaños de pantalla

### 🛠️ Componentes

#### EmpresasGrid

Grid responsivo que muestra las empresas como cartas usando `ElementCard`:

- **Metadata automática**: Configuración predefinida de campos para mostrar
- **Formateo inteligente**: Fechas, emails y estados se muestran con formato apropiado
- **Acciones dinámicas**: Botones condicionales según los handlers proporcionados

#### EmpresasFilters

Sistema de filtros avanzado:

- **Búsqueda de texto**: Busca en nombre, representante, email, tipo y vigencia
- **Filtro por vigencia**: Activo/Inactivo
- **Filtro por tipo**: Pasantía/PPS/Otro
- **Indicador de resultados**: Muestra cantidad filtrada vs total
- **Limpiar filtros**: Botón para resetear todos los filtros

#### EmpresasStats

Dashboard de estadísticas:

- **Métricas generales**: Total, activas, inactivas, tipos
- **Distribución por tipo**: Chips con cantidad por tipo de contrato
- **Indicadores visuales**: Íconos y colores por categoría

## 🔌 API Integration

### Endpoint

```
GET /api/empresas
Headers: Authorization: Bearer {token}
Response: Array<EmpresaDto>
```

### Modelo EmpresaDto

```typescript
interface EmpresaDto {
  idEmpresa: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  representante: string;
  vigencia: 'Activo' | 'Inactivo';
  tipoContrato: 'Pasantia' | 'PPS' | 'otro';
  fechaInicio: string; // ISO: YYYY-MM-DD
  fechaFin: string; // ISO: YYYY-MM-DD
  observaciones?: string;
}
```

## 💡 Uso del ElementCard

El módulo aprovecha al máximo las características del `ElementCard`:

### Metadata Automática

```typescript
const metadata = [
  { name: 'nombre', label: 'Nombre de la Empresa' },
  { name: 'direccion', label: 'Dirección' },
  { name: 'telefono', label: 'Teléfono' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'representante', label: 'Representante' },
  { name: 'vigencia', label: 'Vigencia' },
  { name: 'tipoContrato', label: 'Tipo de Contrato' },
  { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date' },
  { name: 'fechaFin', label: 'Fecha de Fin', type: 'date' },
  { name: 'observaciones', label: 'Observaciones' },
];
```

### Formateo Inteligente

- **Fechas**: Se muestran en formato DD/MM/YYYY
- **Emails**: Se detectan automáticamente y se formatean como enlaces
- **Estados**: La vigencia se muestra con formato apropiado
- **Campos excluidos**: `idEmpresa` se excluye automáticamente

### Acciones Dinámicas

```typescript
<ElementCard
  metadata={metadata}
  data={empresa}
  title={empresa.nombre}
  subtitle={`${empresa.tipoContrato} - ${empresa.vigencia}`}
  onClick={() => handleViewDetails(empresa)}
  onClickEdit={() => handleEdit(empresa)}
  onClickEliminar={() => handleDelete(empresa)}
  onClickExpandir={() => handleViewConvenios(empresa)}
/>
```

## 🎨 Beneficios del Diseño

1. **Reutilización**: Aprovecha el componente genérico `ElementCard`
2. **Consistencia**: Misma apariencia que otros módulos del sistema
3. **Mantenibilidad**: Código organizado y helpers reutilizables
4. **Escalabilidad**: Fácil agregar nuevos filtros o acciones
5. **Performance**: Filtros en memoria con useMemo
6. **UX**: Interfaz intuitiva con estadísticas y feedback visual

## 🔗 Integración con el Sistema

El módulo está completamente integrado:

- ✅ **Rutas**: `/empresas` agregada al sistema de routing
- ✅ **Navegación**: Enlaces en header y sidebar
- ✅ **Layout**: Usa el layout compartido del sistema
- ✅ **Tema**: Respeta el tema global de Material-UI
- ✅ **Autenticación**: Protegido con `ProtectedRoute`

## 🚀 Próximos Pasos

Para completar el módulo se pueden implementar:

1. **Formularios**: Crear/editar empresas usando `FormularioGenerico`
2. **Detalles**: Vista detallada de empresa individual
3. **Convenios asociados**: Módulo de convenios por empresa
4. **Exportación**: Funcionalidad para exportar datos
5. **Paginación**: Para manejar grandes cantidades de empresas

Este módulo demuestra el poder y flexibilidad del componente `ElementCard` en un caso de uso real del sistema de pasantías.
