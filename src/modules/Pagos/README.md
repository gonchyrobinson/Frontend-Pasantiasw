# Módulo de Pagos

Este módulo maneja la gestión completa de pagos asociados a las pasantías de los estudiantes.

## Funcionalidades

### Listado de Pagos

- Visualización de todos los pagos del sistema
- Estadísticas en tiempo real (total, vigentes, vencidos, monto total)
- Búsqueda por ID de pasantía
- Tabla con información detallada de cada pago
- Acciones rápidas (editar, eliminar)

### Gestión de Pagos

- Formulario completo con validaciones
- Campos requeridos y opcionales según especificaciones
- Integración con pasantías existentes
- Creación de nuevos pagos
- Edición de pagos existentes

## Estructura del Módulo

```
src/modules/Pagos/
├── Pagos.tsx                    # Componente principal
├── components/
│   ├── PagosStats.tsx          # Estadísticas de pagos
│   ├── PagosTabla.tsx          # Tabla de pagos
│   ├── PagosFilters.tsx        # Filtros y búsqueda avanzada
│   ├── CrearPago.tsx           # Formulario de creación
│   └── EditarPago.tsx          # Formulario de edición
├── hooks/
│   └── usePagos.ts             # Hooks personalizados
├── helpers/
│   ├── pagosHelpers.ts         # Funciones auxiliares
│   └── pagosSearchHelpers.ts   # Helpers para búsqueda avanzada
├── types/
│   └── index.ts                # Tipos TypeScript
└── index.ts                     # Exportaciones
```

## Componentes Principales

### Pagos.tsx

Componente principal que maneja:

- Listado de pagos
- Estadísticas
- Acciones CRUD
- Diálogos de confirmación

### PagosStats.tsx

Componente de estadísticas que muestra:

- Total de pagos
- Pagos vigentes
- Pagos vencidos
- Monto total

### PagosTabla.tsx

Tabla de pagos que incluye:

- ID del pago
- ID de la pasantía
- Fecha de pago
- Fecha de vencimiento
- Monto
- Observaciones
- Acciones (editar, eliminar)

### PagosFilters.tsx

Componente de filtros que incluye:

- Búsqueda por pasantía usando dropdown
- Dropdown con expediente como label e ID como valor
- Validación de campo requerido
- Integración con SearchDialog
- Uso del endpoint `/api/Pagos/by-pasantia/{idPasantia}`

### CrearPago.tsx

Formulario de creación que incluye:

- Formulario genérico con validaciones
- Campo de pasantía como dropdown dinámico
- Campos de fecha, monto y observaciones
- Integración con FormularioGenerico
- Navegación automática al listado

### EditarPago.tsx

Formulario de edición que incluye:

- Carga automática de datos existentes
- Formulario genérico con validaciones
- Campo de pasantía como dropdown dinámico
- Actualización en tiempo real
- Navegación automática al listado

## Hooks Personalizados

### usePagos

Hook principal para operaciones CRUD:

- `usePagos()` - Obtener todos los pagos
- `usePago(id)` - Obtener pago específico
- `useCreatePago()` - Crear pago
- `useUpdatePago()` - Actualizar pago
- `useDeletePago()` - Eliminar pago

## Helpers

### pagosHelpers.ts

Funciones auxiliares para:

- Metadata de formularios
- Cálculo de estadísticas
- Filtrado de pagos
- Valores por defecto

### pagosSearchHelpers.ts

Funciones para búsqueda por pasantía:

- Metadata de búsqueda con dropdown dinámico
- Formateo de filtros
- Configuración del campo de selección de pasantía

### usePagosStats

Hook para estadísticas:

- Cálculo automático de estadísticas
- Estados de loading y error

## Tipos TypeScript

### PagosDto

```typescript
interface PagosDto {
  idPago: number;
  idPasantia?: number;
  fechaPago?: string;
  fechaVencimiento?: string;
  monto?: number;
  observaciones?: string;
}
```

### CreatePagosDto

```typescript
interface CreatePagosDto {
  idPasantia?: number;
  fechaPago?: string;
  fechaVencimiento?: string;
  monto?: number;
  observaciones?: string;
}
```

## Rutas

- `ROUTES.PAGOS` - Listado principal
- `ROUTES.PAGOS_CREAR` - Crear pago
- `ROUTES.PAGOS_EDITAR/:id` - Editar pago

## Integración con Backend

### Endpoints Utilizados

- `GET /api/pagos` - Listar todos los pagos
- `GET /api/pagos/{id}` - Obtener pago específico
- `POST /api/pagos` - Crear pago
- `PUT /api/pagos` - Actualizar pago
- `DELETE /api/pagos/{id}` - Eliminar pago
- `GET /api/pagos/by-pasantia/{idPasantia}` - Obtener pago por pasantía

### DTOs del Backend

- `PagosDto` - Para operaciones CRUD
- `CreatePagosDto` - Para creación

## Características Técnicas

### Validaciones

- Campos requeridos validados
- Fechas con formato correcto
- Validación de fecha de vencimiento posterior a fecha de pago
- Validación de fecha de pago no futura
- Montos con validación de rango
- Observaciones con límite de caracteres
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

- Tabla responsive para pagos
- Estadísticas adaptables
- Formularios optimizados para móvil

## Uso

```typescript
import { Pagos } from '../modules/Pagos';

// En el router
<Route path="/pagos" element={<Pagos />} />
```

## Dependencias

- React Query para estado del servidor
- Material-UI para componentes
- React Router para navegación
- TablaGenerica para tablas consistentes
- FormularioGenerico para formularios consistentes
