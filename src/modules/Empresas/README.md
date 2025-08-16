# Módulo de Empresas

Módulo completo para la gestión de empresas en el sistema de pasantías, implementando el componente genérico `TablaGenerica`.

## 📁 Estructura

```
Empresas/
├── components/
│   ├── EmpresasFilters.tsx   # Filtros y búsqueda
│   ├── EmpresasStats.tsx     # Estadísticas y métricas
│   └── EmpresasTabla.tsx     # Tabla principal de empresas
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

- **Visualización en tabla**: Uso del componente `TablaGenerica` para mostrar empresas
- **Filtros inteligentes**: Búsqueda avanzada por múltiples criterios
- **Estadísticas en tiempo real**: Métricas de empresas activas/inactivas y distribución por tipo
- **Acciones por fila**: Ver, editar, eliminar y botones personalizados
- **Responsive**: Adaptable a todos los tamaños de pantalla
- **Ordenamiento y filtrado**: Funcionalidades avanzadas de tabla

### 🛠️ Componentes

#### EmpresasTabla

Tabla principal que muestra las empresas usando `TablaGenerica`:

- **Metadata automática**: Configuración predefinida de campos para mostrar
- **Formateo inteligente**: Fechas, emails y estados se muestran con formato apropiado
- **Acciones dinámicas**: Botones condicionales según los handlers proporcionados
- **Ordenamiento**: Por defecto ordenado por nombre
- **Paginación**: Configurada para 15 elementos por página

#### EmpresasFilters

Sistema de filtros avanzado:

- **Búsqueda avanzada**: Múltiples criterios de búsqueda
- **Filtros por fecha**: Rango de fechas de inicio y fin
- **Filtros por estado**: Vigente/No vigente
- **Filtros por tipo**: Tipo de contrato
- **Indicador de resultados**: Muestra cantidad filtrada vs total

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
// DTO unificado - camelCase (ASP.NET Core hace model binding automático)
interface EmpresaDto {
  idEmpresa: number;
  nombre: string;
  vigencia: 'vigente' | 'no_vigente';
  fechaInicio: string; // ISO: YYYY-MM-DD
  fechaFin: string; // ISO: YYYY-MM-DD
  tipoContrato: 'indefinido' | 'temporal' | 'otro';
  encargado: string;
  celular: string;
  correoElectronico: string;
  sudocu: string; // Text field
}

// Mismo DTO para requests - ASP.NET Core acepta camelCase
interface CreacionEmpresaDto {
  nombre: string;
  vigencia: 'vigente' | 'no_vigente';
  fechaInicio: string; // ISO: YYYY-MM-DD
  fechaFin: string; // ISO: YYYY-MM-DD
  tipoContrato: 'indefinido' | 'temporal' | 'otro';
  encargado: string;
  celular: string;
  correoElectronico: string;
  sudocu: string; // Text field
}
```

## 💡 Uso del TablaGenerica

El módulo aprovecha al máximo las características del `TablaGenerica`:

### Metadata Automática

```typescript
const metadata = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'vigencia', label: 'Vigencia', type: 'text' },
  { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date' },
  { name: 'fechaFin', label: 'Fecha de Fin', type: 'date' },
  { name: 'tipoContrato', label: 'Tipo de Contrato', type: 'text' },
  { name: 'encargado', label: 'Encargado', type: 'text' },
  { name: 'celular', label: 'Celular', type: 'text' },
  { name: 'correoElectronico', label: 'Correo Electrónico', type: 'email' },
  { name: 'sudocu', label: 'SUDOCU', type: 'text' },
];
```

### Formateo Inteligente

- **Fechas**: Se muestran en formato local
- **Emails**: Se detectan automáticamente y se formatean apropiadamente
- **Estados**: La vigencia se muestra con formato apropiado
- **Campos excluidos**: `idEmpresa` se excluye automáticamente

### Acciones Dinámicas

```typescript
<EmpresasTabla
  empresas={empresas}
  onRowEdit={handleEdit}
  onRowDelete={handleDelete}
  extraButtons={[
    {
      label: "Ver Detalles",
      onClick: (empresa) => handleVerDetalles(empresa),
      color: "info",
      icon: <VisibilityIcon />,
    }
  ]}
/>
```

## 🎨 Beneficios del Diseño

1. **Simplicidad**: Solo un componente de visualización (TablaGenerica)
2. **Consistencia**: Misma apariencia que otros módulos del sistema
3. **Mantenibilidad**: Código organizado y helpers reutilizables
4. **Escalabilidad**: Fácil agregar nuevos campos o acciones
5. **Performance**: Tabla optimizada con ordenamiento y filtrado
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
5. **Filtros adicionales**: Más criterios de búsqueda

Este módulo demuestra el poder y flexibilidad del componente `TablaGenerica` en un caso de uso real del sistema de pasantías, proporcionando una interfaz limpia y funcional para la gestión de empresas.
