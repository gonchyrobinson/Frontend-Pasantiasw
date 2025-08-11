# ElementCard Genérico

Componente genérico para mostrar datos en formato de carta (card) usando Material-UI.

## Uso

```tsx
import { ElementCard } from '@/ElementCardGenerica';

const metadata = [
  { name: 'nombre', label: 'Nombre' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'fechaInicio', label: 'Fecha de Inicio', type: 'date' },
  { name: 'monto', label: 'Monto', type: 'currency' },
];

const data = {
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
  fechaInicio: '2024-01-15',
  monto: 50000,
};

<ElementCard
  metadata={metadata}
  data={data}
  onClick={() => console.log('Card clicked')}
  onClickEdit={() => console.log('Edit clicked')}
  title='Ejemplo de Carta'
/>;
```

## Props

### `metadata` (requerido)

Array de objetos con la estructura de campos a mostrar:

- `name`: nombre del campo en el objeto data
- `label`: etiqueta a mostrar
- `type`: tipo de dato (opcional) - 'string' | 'number' | 'date' | 'currency' | 'boolean' | 'email'

### `data` (requerido)

Objeto con los datos a mostrar

### Funciones opcionales

- `onClick`: función al hacer clic en la carta
- `onClickEdit`: si está presente, muestra botón "Editar"
- `onClickExpandir`: si está presente, muestra botón "Expandir"
- `onClickEliminar`: si está presente, muestra botón "Eliminar"

### Otros props opcionales

- `title`: título de la carta
- `subtitle`: subtítulo de la carta

## Características

- **Auto-detección de tipos**: Si no se especifica el tipo, se detecta automáticamente
- **Formateo automático**: Fechas, monedas, números y emails se formatean apropiadamente
- **Campos excluidos**: Automáticamente excluye campos como id, fechaCreacion, eliminado, etc.
- **Responsive**: Se adapta a diferentes tamaños de pantalla
- **Accesible**: Sigue las mejores prácticas de accesibilidad
- **Tema consistente**: Utiliza el tema global del proyecto

## Funciones Helper

También puedes importar las funciones de formateo directamente:

```tsx
import {
  formatValue,
  detectType,
  formatDate,
  formatCurrency,
} from '@/ElementCardGenerica';

// Formatear un valor usando metadata
const formattedValue = formatValue(data.email, {
  name: 'email',
  label: 'Email',
  type: 'email',
});

// Detectar tipo automáticamente
const type = detectType('2024-01-15'); // 'date'

// Formatear fechas
const formattedDate = formatDate('2024-01-15'); // '15/1/2024'

// Formatear moneda
const formattedCurrency = formatCurrency(50000); // '$50.000,00'
```
