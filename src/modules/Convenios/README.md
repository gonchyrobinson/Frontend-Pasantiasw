# Módulo de Convenios

Este módulo maneja la gestión completa de convenios con empresas e instituciones.

## Funcionalidades

### Listado de Convenios

- Visualización de todos los convenios con información de empresa
- Estadísticas en tiempo real (total, vigentes, caducados, por vencer)
- Filtros avanzados por expediente, empresa y fechas
- Acciones rápidas (editar, eliminar, caducar, asignar empresa)

### Creación de Convenios

- Formulario completo con validaciones
- Integración con empresas existentes
- Campos requeridos y opcionales según especificaciones

### Edición de Convenios

- Carga automática de datos existentes
- Validación de formularios
- Actualización en tiempo real

### Gestión de Estados

- Marcado de convenios como caducados
- Asignación de empresas a convenios
- Seguimiento de fechas de firma y caducidad

## Estructura del Módulo

```
src/modules/Convenios/
├── Convenios.tsx                    # Componente principal
├── components/
│   ├── StyledComponents.tsx         # Componentes con sx
│   ├── ComponentesGenericos.tsx     # Componentes reutilizables
│   ├── CrearConvenio.tsx           # Formulario de creación
│   └── EditarConvenio.tsx          # Formulario de edición
├── hooks/
│   └── useConvenios.ts             # Hooks personalizados
├── helpers/
│   └── convenioHelpers.ts          # Funciones auxiliares
├── types/
│   └── index.ts                    # Tipos TypeScript
└── index.ts                        # Exportaciones
```

## Componentes Principales

### Convenios.tsx

Componente principal que maneja:

- Listado de convenios
- Estadísticas
- Filtros
- Acciones CRUD
- Diálogos de confirmación

### CrearConvenio.tsx

Formulario de creación con:

- Validaciones completas
- Integración con FormularioGenerico
- Navegación automática

### EditarConvenio.tsx

Formulario de edición con:

- Carga de datos existentes
- Validaciones
- Actualización en tiempo real

## Hooks Personalizados

### useConvenios

Hook principal para operaciones CRUD:

- `useConvenios()` - Obtener todos los convenios
- `useConvenio(id)` - Obtener convenio específico
- `useCreateConvenio()` - Crear convenio
- `useUpdateConvenio()` - Actualizar convenio
- `useDeleteConvenio()` - Eliminar convenio
- `useCaducarConvenio()` - Marcar como caducado
- `useAsignarEmpresa()` - Asignar empresa

### useConvenioStats

Hook para estadísticas:

- Cálculo automático de estadísticas
- Estados de loading y error

- Limpieza de filtros

### useConveniosConFiltros

Hook para búsqueda con filtros:

- Búsqueda en tiempo real
- Múltiples criterios de búsqueda
- Dropdown de empresas con convenios vigentes

## Tipos TypeScript

### ConvenioDto

```typescript
interface ConvenioDto {
  idConvenio: number;
  idEmpresa?: number;
  representanteEmpresa?: string;
  nroAcuerdoMarco?: number;
  domicilioLegal?: string;
  numeroConvenio: string; // Computed property from backend
  docRepresentanteEmpresa?: string;
  nombreDecano?: string;
  documentoDecano?: string;
  fechaInicio?: string;
  fechaCaducidad?: string;
  tipoAcuerdo?: string;
  expedienteSudocu?: string;
}
```

### ConvenioEmpresaDto

```typescript
interface ConvenioEmpresaDto {
  idConvenio: number;
  numeroConvenio: string; // Computed property from backend
  fechaInicio?: string;
  fechaCaducidad?: string;
  idEmpresa?: number;
  nombreEmpresa?: string;
  representanteEmpresa?: string;
  nroAcuerdoMarco?: number;
  domicilioLegal?: string;
  documentoDecano?: string;
  tipoAcuerdo?: string;
  expedienteSudocu?: string;
}
```

## Rutas

- `ROUTES.CONVENIOS` - Listado principal
- `ROUTES.CONVENIOS_CREAR` - Crear convenio
- `ROUTES.CONVENIOS_EDITAR/:id` - Editar convenio

## Integración con Backend

### Endpoints Utilizados

- `GET /api/convenios/con-empresa` - Listar convenios con empresa
- `GET /api/convenios/{id}` - Obtener convenio específico
- `POST /api/convenios` - Crear convenio
- `PUT /api/convenios` - Actualizar convenio
- `DELETE /api/convenios/{id}` - Eliminar convenio
- `POST /api/convenios/caducar/{id}` - Caducar convenio

### DTOs del Backend

- `ConvenioDto` - Para operaciones CRUD
- `ConvenioCreateDto` - Para creación
- `ConvenioEmpresaDto` - Para listado con empresa
- `AsignarEmpresaDto` - Para asignar empresa
- `CaducarConvenioDto` - Para caducar convenio
- `EmpresaConvenioDropdownDto` - Para dropdown de empresas con convenio vigente

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

- Grid responsive para convenios
- Filtros adaptables
- Formularios optimizados para móvil

## Hooks Disponibles

### Hooks Principales

- `useConvenios()` - Obtener todos los convenios con empresa
- `useConvenio(id)` - Obtener un convenio específico
- `useConveniosConFiltros(filtros)` - Buscar convenios con filtros
- `useConveniosPorVencer(dias)` - Convenios que caducan en X días

### Hooks de Operaciones

- `useCreateConvenio()` - Crear nuevo convenio
- `useUpdateConvenio()` - Actualizar convenio
- `useDeleteConvenio()` - Eliminar convenio
- `useCaducarConvenio()` - Caducar convenio
- `useAsignarEmpresa()` - Asignar empresa a convenio

### Hooks de Datos Auxiliares

- `useEmpresasConConvenioVigente()` - Empresas con convenio vigente (dropdowns)
- `useConvenioStats()` - Estadísticas de convenios

## Uso

```typescript
import { Convenios } from '../modules/Convenios';

// En el router
<Route path="/convenios" element={<Convenios />} />
```

## Dependencias

- React Hook Form para formularios
- React Query para estado del servidor
- Material-UI para componentes
- React Router para navegación
- FormularioGenerico para formularios consistentes
