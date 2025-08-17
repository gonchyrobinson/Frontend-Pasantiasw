# Sistema de Caché para Dropdowns

## Descripción

Este sistema centraliza y optimiza la carga de datos para dropdowns (empresas, estudiantes, convenios, pasantías) con un sistema de caché inteligente usando React Query.

## Características

### 🚀 Optimización de Rendimiento

- **Caché de 10 minutos**: Los datos se consideran "frescos" por 10 minutos
- **Memoria de 30 minutos**: Los datos permanecen en memoria por 30 minutos
- **Sin refetch automático**: No recargar al cambiar pestañas o montar componentes
- **Prefetch opcional**: Cargar datos anticipadamente para mejor UX

### 🔄 Invalidación Automática

- **Mutaciones inteligentes**: Se invalida automáticamente cuando se crean/actualizan/eliminan registros
- **Invalidación selectiva**: Solo se actualiza el caché de la entidad modificada
- **Sincronización automática**: Los dropdowns siempre muestran datos actualizados

## Uso Básico

### Hooks Disponibles

```typescript
import {
  useEmpresasDropdown,
  useEstudiantesDropdown,
  useConveniosDropdown,
  usePasantiasDropdown,
  useAllDropdownData,
  useInvalidateDropdowns,
  usePrefetchDropdowns,
} from '@lib/hooks/useDropdownData';
```

### Ejemplos de Uso

#### Hook Individual

```typescript
const MyComponent = () => {
  const { empresasOptions, isLoading, error } = useEmpresasDropdown();

  return (
    <Select
      options={empresasOptions}
      loading={isLoading}
      disabled={isLoading}
    />
  );
};
```

#### Hook Combinado

```typescript
const MyFormComponent = () => {
  const {
    empresas,
    estudiantes,
    convenios,
    pasantias,
    isLoading,
    hasError,
  } = useAllDropdownData();

  if (isLoading) return <LoadingSpinner />;
  if (hasError) return <ErrorMessage />;

  return (
    <Form>
      <Select options={empresas.options} />
      <Select options={estudiantes.options} />
      <Select options={convenios.options} />
      <Select options={pasantias.options} />
    </Form>
  );
};
```

#### Prefetch para Mejor UX

```typescript
const NavigationComponent = () => {
  const { prefetchAll } = usePrefetchDropdowns();

  const handleNavigateToForm = () => {
    // Precargar datos antes de navegar
    prefetchAll();
    navigate('/create-form');
  };

  return (
    <Button onClick={handleNavigateToForm}>
      Crear Nuevo Registro
    </Button>
  );
};
```

#### Provider para Prefetch Automático

```typescript
import { DropdownDataProvider } from '@lib/components/DropdownDataProvider';

const App = () => {
  return (
    <DropdownDataProvider prefetchOnMount={true}>
      <Router>
        <Routes>
          {/* tus rutas */}
        </Routes>
      </Router>
    </DropdownDataProvider>
  );
};
```

## Invalidación Manual

Si necesitas invalidar manualmente el caché (casos especiales):

```typescript
const MyComponent = () => {
  const {
    invalidateEmpresas,
    invalidateEstudiantes,
    invalidateConvenios,
    invalidatePasantias,
    invalidateAll,
  } = useInvalidateDropdowns();

  const handleRefresh = () => {
    invalidateAll(); // Invalida todos los caches
  };

  const handleRefreshEmpresas = () => {
    invalidateEmpresas(); // Solo empresas
  };

  return (
    <div>
      <Button onClick={handleRefresh}>Refrescar Todo</Button>
      <Button onClick={handleRefreshEmpresas}>Refrescar Empresas</Button>
    </div>
  );
};
```

## Migración desde Hooks Anteriores

### ❌ Hooks Deprecados (No usar)

```typescript
// DEPRECADOS - No usar
import { usePasantiasForDropdown } from '@modules/Pagos/hooks/usePagos';
import {
  useEstudiantesForDropdown,
  useConveniosForDropdown,
} from '@modules/Pasantias/hooks/usePasantias';
import { useEmpresasForDropdown } from '@modules/Convenios/hooks/useEmpresasForDropdown';
```

### ✅ Hooks Nuevos (Usar estos)

```typescript
// NUEVOS - Usar estos
import {
  usePasantiasDropdown,
  useEstudiantesDropdown,
  useConveniosDropdown,
  useEmpresasDropdown,
} from '@lib/hooks/useDropdownData';
```

### Cambios en el Código

#### Antes:

```typescript
const { data: empresasOptions, isLoading } = useEmpresasForDropdown();
```

#### Después:

```typescript
const { empresasOptions, isLoading } = useEmpresasDropdown();
```

## Configuración del Caché

Las configuraciones de caché están centralizadas en `useDropdownData.ts`:

```typescript
const DROPDOWN_CACHE_CONFIG = {
  staleTime: 10 * 60 * 1000, // 10 minutos - datos "frescos"
  cacheTime: 30 * 60 * 1000, // 30 minutos - tiempo en memoria
  refetchOnWindowFocus: false, // No refetch al cambiar pestaña
  refetchOnMount: false, // No refetch al montar componente
};
```

## Beneficios

### Rendimiento

- **Carga instantánea**: Dropdowns cargan inmediatamente desde caché
- **Menos requests**: Reduce llamadas al servidor significativamente
- **Mejor UX**: No hay delays en formularios y filtros

### Mantenibilidad

- **Código centralizado**: Un solo lugar para manejar lógica de dropdowns
- **Tipado consistente**: Tipos TypeScript consistentes en toda la app
- **Fácil debugging**: Query keys centralizadas para inspección

### Confiabilidad

- **Datos sincronizados**: Invalidación automática mantiene datos actualizados
- **Manejo de errores**: Error handling consistente
- **Estados de loading**: Estados de carga uniformes

## Troubleshooting

### Datos no se actualizan

```typescript
// Forzar invalidación manual
const { invalidateAll } = useInvalidateDropdowns();
invalidateAll();
```

### Performance issues

```typescript
// Verificar configuración de caché
// Reducir staleTime si los datos cambian muy frecuentemente
// Aumentar staleTime si los datos son muy estáticos
```

### Debugging

```typescript
// Las query keys están disponibles para inspección
import { DROPDOWN_QUERY_KEYS } from '@lib/hooks/useDropdownData';
console.log(DROPDOWN_QUERY_KEYS);
```
