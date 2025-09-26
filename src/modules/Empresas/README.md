# Módulo de Empresas

Módulo completo para la gestión de empresas en el sistema de Acuerdos Individuales, implementando el componente genérico `TablaGenerica`.

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
- **Filtros por nombre**: Búsqueda por nombre de empresa
- **Indicador de resultados**: Muestra cantidad filtrada vs total

#### EmpresasStats

Dashboard de estadísticas:

- **Métrica general**: Total de empresas
- **Indicador visual**: Ícono y color por categoría

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
  nombre?: string;
  correoElectronico?: string;
}

// DTO para creación - omite el ID que es generado por el backend
interface CreacionEmpresaDto {
  nombre?: string;
  correoElectronico?: string;
}

// DTO para búsqueda avanzada - compatible con backend
interface EmpresaBusquedaAvanzadaDto {
  nombre?: string;
}
```

## 💡 Uso del TablaGenerica

El módulo aprovecha al máximo las características del `TablaGenerica`:

### Metadata Automática

```typescript
const metadata = [
  { name: 'nombre', label: 'Nombre', type: 'text' },
  { name: 'correoElectronico', label: 'Correo Electrónico', type: 'email' },
];
```

### Formateo Inteligente

- **Emails**: Se detectan automáticamente y se formatean apropiadamente
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

Este módulo demuestra el poder y flexibilidad del componente `TablaGenerica` en un caso de uso real del sistema de Acuerdos Individuales, proporcionando una interfaz limpia y funcional para la gestión de empresas.
