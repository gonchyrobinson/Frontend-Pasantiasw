# Módulo de Pasantías

Este módulo maneja la gestión completa de pasantías estudiantiles.

## Funcionalidades

### Listado de Pasantías

- Visualización de todas las pasantías con información completa
- Estadísticas en tiempo real (total, activas, finalizadas, por vencer)
- Filtros avanzados por expediente, área de trabajo, estado y fechas
- Acciones rápidas (editar, eliminar, finalizar, activar)

### Creación de Pasantías

- Formulario completo con validaciones
- Integración con estudiantes y convenios existentes
- Campos requeridos y opcionales según especificaciones

### Edición de Pasantías

- Carga automática de datos existentes
- Validación de formularios
- Actualización en tiempo real

### Gestión de Estados

- Marcado de pasantías como finalizadas
- Activación de pasantías suspendidas
- Seguimiento de fechas de inicio y fin

## Estructura del Módulo

```
src/modules/Pasantias/
├── Pasantias.tsx                    # Componente principal
├── components/
│   ├── ComponentesGenericos.tsx     # Componentes reutilizables
│   ├── CrearPasantia.tsx           # Formulario de creación
│   ├── EditarPasantia.tsx          # Formulario de edición
│   ├── PasantiaFilters.tsx         # Filtros de búsqueda
│   ├── PasantiaStats.tsx           # Estadísticas
│   ├── PasantiasTabla.tsx          # Tabla de pasantías
│   └── index.ts                     # Exportaciones de componentes
├── hooks/
│   └── usePasantias.ts             # Hooks personalizados
├── helpers/
│   └── pasantiaHelpers.ts          # Funciones auxiliares
├── types/
│   └── index.ts                    # Tipos TypeScript
├── index.ts                         # Exportaciones principales
└── README.md                        # Documentación
```

## Componentes Principales

### Pasantias.tsx

Componente principal que maneja:

- Listado de pasantías
- Estadísticas
- Filtros
- Acciones CRUD
- Diálogos de confirmación

### PasantiasTabla.tsx

Tabla de pasantías usando `TablaGenericaWrapper`:

- Visualización en formato tabla
- Columnas: expediente, área de trabajo, estado, fechas, asignación, tutores
- Acciones: editar, eliminar, finalizar, activar
- Ordenamiento y paginación

### CrearPasantia.tsx

Formulario de creación con:

- Validaciones completas
- Integración con FormularioGenerico
- Navegación automática

### EditarPasantia.tsx

Formulario de edición con:

- Carga de datos existentes
- Validaciones
- Actualización en tiempo real

## Hooks Personalizados

### usePasantias

Hook principal para operaciones CRUD:

- `usePasantias()` - Obtener todas las pasantías
- `usePasantia(id)` - Obtener pasantía específica
- `useCreatePasantia()` - Crear pasantía
- `useUpdatePasantia()` - Actualizar pasantía
- `useDeletePasantia()` - Eliminar pasantía
- `useFinalizarPasantia()` - Marcar como finalizada
- `useActivarPasantia()` - Activar pasantía

### usePasantiaStats

Hook para estadísticas:

- Cálculo automático de estadísticas
- Estados de loading y error

### usePasantiaFilters

Hook para filtros:

- Filtrado en tiempo real
- Múltiples criterios de búsqueda
- Limpieza de filtros

## Tipos TypeScript

### PasantiaDto

```typescript
interface PasantiaDto {
  idPasantia: number;
  idEstudiante: number;
  idConvenio: number;
  asignacionMensual: number;
  obraSocial: string;
  art: string;
  tutorEmpresa: string;
  tutorFacultad: string;
  expediente: string;
  fechaInicio: string;
  fechaFin: string;
  tipoAcuerdo: string;
  observaciones: string;
  areaTrabajo: string;
  estado: string;
}
```

### PasantiaCreateDto

```typescript
interface PasantiaCreateDto {
  idEstudiante: number;
  idConvenio: number;
  asignacionMensual: number;
  obraSocial: string;
  art: string;
  tutorEmpresa: string;
  tutorFacultad: string;
  expediente: string;
  fechaInicio: string;
  fechaFin: string;
  tipoAcuerdo: string;
  observaciones: string;
  areaTrabajo: string;
  estado: string;
}
```

## Rutas

- `ROUTES.PASANTIAS` - Listado principal
- `ROUTES.PASANTIAS_CREAR` - Crear pasantía
- `ROUTES.PASANTIAS_EDITAR/:id` - Editar pasantía

## Integración con Backend

### Endpoints Utilizados

- `GET /api/Pasantias` - Listar todas las pasantías
- `GET /api/Pasantias/{id}` - Obtener pasantía específica
- `POST /api/Pasantias` - Crear pasantía
- `PUT /api/Pasantias` - Actualizar pasantía
- `DELETE /api/Pasantias/{id}` - Eliminar pasantía

### DTOs del Backend

- `PasantiaDto` - Para operaciones CRUD
- `PasantiaCreateDto` - Para creación
- `PasantiaFilters` - Para filtros de búsqueda
- `PasantiaStats` - Para estadísticas

## Características Técnicas

### Validaciones

- Campos requeridos validados
- Fechas con formato correcto
- Longitudes mínimas y máximas
- Patrones de validación personalizados

### Estados de Loading

- Loading states para todas las operaciones
- Feedback visual durante operaciones
- Manejo de errores con mensajes claros

### Optimizaciones

- React Query para cache y sincronización
- Invalidación automática de queries
- Optimistic updates donde sea apropiado

### Responsive Design

- Grid responsive para pasantías
- Filtros adaptables
- Formularios optimizados para móvil

## Uso

```typescript
import { Pasantias } from '../modules/Pasantias';

// En el router
<Route path="/pasantias" element={<Pasantias />} />
```

## Dependencias

- React Hook Form para formularios
- React Query para estado del servidor
- Material-UI para componentes
- React Router para navegación
- FormularioGenerico para formularios consistentes
- TablaGenerica para visualización de datos

## Notas de Implementación

### TODO Items

- Implementar hooks para obtener opciones de estudiantes en dropdowns
- Implementar hooks para obtener opciones de convenios en dropdowns
- Agregar validaciones de fechas (fecha fin > fecha inicio)
- Implementar búsqueda avanzada con SearchDialog
- Agregar exportación de datos a Excel/PDF

### Características Futuras

- Dashboard de pasantías con gráficos
- Notificaciones de pasantías por vencer
- Sistema de reportes avanzados
- Integración con calendario académico
