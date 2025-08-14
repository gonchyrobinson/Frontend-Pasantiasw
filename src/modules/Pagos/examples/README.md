# Ejemplos de Uso del Módulo de Pagos

## Uso Básico

```typescript
import { Pagos } from '../modules/Pagos';

// En tu componente
const MiComponente = () => {
  return <Pagos />;
};
```

## Uso con Rutas

```typescript
import { Routes, Route } from 'react-router-dom';
import { Pagos } from '../modules/Pagos';
import { ROUTES } from '../helpers/routesHelper';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.PAGOS} element={<Pagos />} />
    </Routes>
  );
};
```

## Uso de Hooks

```typescript
import { usePagos, usePagosStats } from '../modules/Pagos';

const MiComponente = () => {
  const { data: pagosResponse, isLoading, error } = usePagos();
  const { stats, isLoading: statsLoading } = usePagosStats();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const pagos = pagosResponse?.data || [];

  return (
    <div>
      <h2>Total de Pagos: {stats.totalPagos}</h2>
      <ul>
        {pagos.map(pago => (
          <li key={pago.idPago}>
            Pago #{pago.idPago} - ${pago.monto}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Uso de Helpers

```typescript
import { calculatePagosStats, filterPagos } from '../modules/Pagos';

const MiComponente = () => {
  const pagos = [/* array de pagos */];

  // Calcular estadísticas
  const stats = calculatePagosStats(pagos);

  // Filtrar pagos
  const pagosFiltrados = filterPagos(pagos, {
    fechaPagoDesde: '2024-01-01',
    montoMin: 1000
  });

  return (
    <div>
      <p>Total: {stats.totalPagos}</p>
      <p>Filtrados: {pagosFiltrados.length}</p>
    </div>
  );
};
```

## Personalización de la Tabla

```typescript
import { PagosTabla } from '../modules/Pagos/components/PagosTabla';

const MiComponente = () => {
  const pagos = [/* array de pagos */];

  const handleEdit = (pago) => {
    console.log('Editar pago:', pago);
  };

  const handleDelete = (pago) => {
    console.log('Eliminar pago:', pago);
  };

  return (
    <PagosTabla
      pagos={pagos}
      loading={false}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};
```

## Personalización de Filtros

```typescript
import { PagosFilters } from '../modules/Pagos/components/PagosFilters';

const MiComponente = () => {
  const handleSearchResults = (pagos) => {
    console.log('Resultados de búsqueda por pasantía:', pagos);
  };

  const handleClearResults = () => {
    console.log('Limpiar resultados');
  };

  return (
    <PagosFilters
      onSearchResults={handleSearchResults}
      onClearResults={handleClearResults}
      hasResults={false}
    />
  );
};
```

**Nota:** El componente PagosFilters automáticamente carga las pasantías disponibles y las muestra en un dropdown con el expediente como etiqueta visible.

## Creación de Pagos

```typescript
import { CrearPago } from '../modules/Pagos/components/CrearPago';

const MiComponente = () => {
  return <CrearPago />;
};
```

## Edición de Pagos

```typescript
import { EditarPago } from '../modules/Pagos/components/EditarPago';

const MiComponente = () => {
  return <EditarPago />;
};
```

**Nota:** Los componentes CrearPago y EditarPago automáticamente cargan las pasantías disponibles para el dropdown y manejan la navegación.

## Navegación Programática

```typescript
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../helpers/routesHelper';

const MiComponente = () => {
  const navigate = useNavigate();

  const handleEditPago = (idPago: number) => {
    navigate(`${ROUTES.PAGOS_EDITAR}/${idPago}`);
  };

  const handleCreatePago = () => {
    navigate(ROUTES.PAGOS_CREAR);
  };

  return (
    <div>
      <button onClick={() => handleCreatePago()}>Crear Pago</button>
      <button onClick={() => handleEditPago(123)}>Editar Pago #123</button>
    </div>
  );
};
```

````

## Personalización de Estadísticas

```typescript
import { PagosStats } from '../modules/Pagos/components/PagosStats';

const MiComponente = () => {
  const stats = {
    totalPagos: 10,
    pagosVigentes: 7,
    pagosVencidos: 3,
    montoTotal: 50000
  };

  return (
    <PagosStats
      stats={stats}
      loading={false}
    />
  );
};
````
