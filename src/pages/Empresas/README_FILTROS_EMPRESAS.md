# Documentación de Cambios: Filtros de Búsqueda de Empresas

---

## Resumen

Se refactorizó y mejoró el módulo de búsqueda y filtrado de empresas en el frontend para alinearlo con los nuevos requerimientos del backend y las mejores prácticas de UX/UI y accesibilidad. Los cambios incluyen la consolidación de filtros, soporte para rangos de fechas, mejoras visuales y de accesibilidad, y la externalización de estilos.

---

## Cambios Principales

### 1. Refactorización de Filtros de Búsqueda

- Se eliminó la lógica de filtros individuales y se consolidó en un solo helper `buscarEmpresasAvanzado`, que acepta todos los filtros como parámetros.
- Ahora se pueden combinar múltiples filtros a la vez (nombre, vigencia, tipo de contrato, rango de fechas de inicio y fin).
- El frontend se adapta automáticamente a los cambios de los endpoints del backend.

### 2. Soporte para Rangos de Fechas

- Se agregaron campos para filtrar por rango de fechas de inicio (`fechaInicioDesde`, `fechaInicioHasta`) y rango de fechas de fin (`fechaFinDesde`, `fechaFinHasta`).
- Los valores de estos campos se envían como query params al backend.

### 3. Mejora de la Experiencia de Usuario

- Se agregaron labels descriptivos para los rangos de fechas, agrupando visualmente los campos relacionados.
- Se permite limpiar todos los filtros con un solo botón.

### 4. Accesibilidad

- Los labels de los rangos de fechas están correctamente asociados a los inputs mediante `htmlFor` e `id`.
- Se agregaron atributos `aria-label` a los inputs de fechas para mejorar la navegación con lectores de pantalla.

### 5. Externalización de Estilos

- Todos los estilos de los filtros y campos de fechas se movieron a un archivo CSS dedicado: `empresas-filtros.css`.
- Se crearon clases reutilizables para inputs, grupos de fechas, labels y separadores.

---

## Archivos Modificados

- `src/pages/Empresas/index.tsx`
  - Refactorización de la lógica de filtros.
  - Integración de los nuevos campos de fechas.
  - Uso de clases CSS en vez de estilos inline.
  - Mejora de la accesibilidad de los formularios.

- `src/pages/Empresas/helpers/api.ts`
  - Actualización del helper `buscarEmpresasAvanzado` para aceptar los nuevos parámetros de rango de fechas.

- `src/pages/Empresas/empresas-filtros.css`
  - Nuevo archivo con todas las clases de estilos para los filtros y campos de fechas.

---

## Ejemplo de Uso de los Filtros

- Filtrar por nombre, vigencia y un rango de fechas de inicio:
  - Completar los campos correspondientes y presionar "Buscar".
- Limpiar todos los filtros:
  - Presionar el botón "Limpiar".

---

## Espacio para Gráficos y Capturas de Pantalla

_Agregar aquí diagramas, capturas de pantalla o flujos visuales del formulario de filtros y su interacción._

---

## Consideraciones para el Equipo

- Si el backend cambia los nombres de los parámetros de los filtros, solo es necesario actualizar el helper `buscarEmpresasAvanzado`.
- Para agregar nuevos filtros, basta con añadir el campo en el estado `filtro`, el input en el formulario y el parámetro en la llamada al helper.
- Los estilos pueden ser modificados fácilmente en `empresas-filtros.css` para adaptarse a la identidad visual del proyecto.

---

## Buenas Prácticas Aplicadas

- Código desacoplado y fácil de mantener.
- Accesibilidad mejorada para todos los usuarios.
- Estilos centralizados y reutilizables.
- Documentación clara para futuras referencias.

---
