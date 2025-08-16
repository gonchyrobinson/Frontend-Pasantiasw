# Sistema de Formularios Genéricos

Este sistema permite crear formularios dinámicos y reutilizables usando React Hook Form y Material-UI.

## Características

- ✅ Formularios completamente genéricos basados en metadata JSON
- ✅ Componentes reutilizables para cada tipo de campo
- ✅ Validaciones integradas con React Hook Form
- ✅ Soporte para dropdowns dinámicos (datos desde API)
- ✅ Diseño responsive con Grid de Material-UI
- ✅ Integración completa con el tema del proyecto
- ✅ TypeScript para type safety

## Tipos de Campos Soportados

| Tipo              | Descripción                   | Componente              |
| ----------------- | ----------------------------- | ----------------------- |
| `text`            | Campo de texto básico         | `TextField`             |
| `email`           | Campo de email con validación | `EmailField`            |
| `currency`        | Campo numérico para moneda    | `CurrencyField`         |
| `number`          | Campo numérico básico         | `NumberField`           |
| `date`            | Campo de fecha                | `DateField`             |
| `checkbox`        | Checkbox                      | `CheckboxField`         |
| `textarea`        | Área de texto multilínea      | `TextField` (multiline) |
| `dropdown`        | Select con opciones estáticas | `DropdownField`         |
| `dynamicDropdown` | Select con opciones desde API | `DynamicDropdownField`  |

## Uso Básico

```tsx
import { FormularioGenerico, FormMetadata } from '../../FormularioGenerico';

const metadata: FormMetadata = {
  title: 'Mi Formulario',
  fields: [
    {
      name: 'nombre',
      type: 'text',
      label: 'Nombre',
      validations: { required: 'Nombre es requerido' },
      gridSize: 6,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      validations: { required: 'Email es requerido' },
      gridSize: 6,
    },
  ],
};

const MiFormulario = () => {
  const handleSubmit = (data: any) => {
    console.log('Datos:', data);
  };

  return <FormularioGenerico metadata={metadata} onSubmit={handleSubmit} />;
};
```

## Formularios Predefinidos

El sistema incluye formularios predefinidos para las entidades principales:

```tsx
import {
  createConvenioFormMetadata,
  createEmpresaFormMetadata,
  createEstudianteFormMetadata,
} from '../../FormularioGenerico';

// Uso directo
<FormularioGenerico
  metadata={createConvenioFormMetadata()}
  onSubmit={handleSubmit}
/>;
```

## Dropdowns Dinámicos

Para dropdowns que cargan datos desde API:

```tsx
const [dynamicOptions, setDynamicOptions] = useState({});

// Cargar opciones desde API
useEffect(() => {
  loadEmpresas().then(empresas => {
    setDynamicOptions({
      empresa: createDropdownOptions(empresas),
    });
  });
}, []);

<FormularioGenerico
  metadata={metadata}
  dynamicDropdownOptions={dynamicOptions}
  onSubmit={handleSubmit}
/>;
```

## Props del FormularioGenerico

| Prop                     | Tipo                     | Requerido | Descripción                       |
| ------------------------ | ------------------------ | --------- | --------------------------------- |
| `metadata`               | `FormMetadata`           | ✅        | Configuración del formulario      |
| `onSubmit`               | `(data: any) => void`    | ✅        | Función ejecutada al enviar       |
| `onCancel`               | `() => void`             | ❌        | Función ejecutada al cancelar     |
| `initialValues`          | `Record<string, any>`    | ❌        | Valores iniciales                 |
| `onChange`               | `(data: any) => void`    | ❌        | Función ejecutada en cada cambio  |
| `dynamicDropdownOptions` | `DynamicDropdownOptions` | ❌        | Opciones para dropdowns dinámicos |
| `loading`                | `boolean`                | ❌        | Estado de carga                   |

## Helpers Disponibles

### Validaciones

```tsx
import {
  createEmailValidation,
  createRequiredValidation,
  createMinLengthValidation,
} from '../../FormularioGenerico';
```

### Creación de Campos

```tsx
import {
  createTextField,
  createEmailField,
  createDateField,
  createDropdownField,
} from '../../FormularioGenerico';

const metadata: FormMetadata = {
  fields: [
    createTextField('nombre', 'Nombre', true, 6),
    createEmailField('email', 'Email', 6),
    createDateField('fecha', 'Fecha', true, 6),
  ],
};
```

## Ejemplo Completo

```tsx
import React, { useState, useEffect } from 'react';
import {
  FormularioGenerico,
  createConvenioFormMetadata,
  createDropdownOptions,
} from '../../FormularioGenerico';

const ConvenioForm = () => {
  const [loading, setLoading] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState({});

  useEffect(() => {
    // Cargar empresas desde API
    loadEmpresas().then(empresas => {
      setDynamicOptions({
        empresa: createDropdownOptions(empresas),
      });
    });
  }, []);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await saveConvenio(data);
      // Éxito
    } catch (error) {
      // Error
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Lógica de cancelación
  };

  return (
    <FormularioGenerico
      metadata={createConvenioFormMetadata()}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      dynamicDropdownOptions={dynamicOptions}
      loading={loading}
    />
  );
};
```

## Personalización

Puedes crear tus propios tipos de campos extendiendo el sistema:

1. Agrega el nuevo tipo a `FieldType`
2. Crea el componente siguiendo el patrón existente
3. Agrega el caso en `FormularioGenerico.renderField()`

## Integración con Backend

Los nombres de los campos en `metadata.fields[].name` deben coincidir exactamente con los nombres esperados por tu API backend para un mapeo automático.
