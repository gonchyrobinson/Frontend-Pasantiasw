import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import { GenericFormProps, FieldMetadata } from '../types';
import TextField from './TextField';
import EmailField from './EmailField';
import CurrencyField from './CurrencyField';
import DateField from './DateField';
import CheckboxField from './CheckboxField';
import DropdownField from './DropdownField';
import DynamicDropdownField from './DynamicDropdownField';
import NumberField from './NumberField';

const FormularioGenerico: React.FC<GenericFormProps> = ({
  metadata,
  onSubmit,
  onCancel,
  onClear,
  initialValues = {},
  onChange,
  dynamicDropdownOptions = {},
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: initialValues,
  });

  const watchedFields = watch();

  useEffect(() => {
    if (onChange) {
      onChange(watchedFields);
    }
  }, [watchedFields, onChange]);

  // Update form values when initialValues change (for edit mode)
  useEffect(() => {
    if (initialValues && Object.keys(initialValues).length > 0) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const renderField = (field: FieldMetadata) => {
    const error = errors[field.name]?.message as string;
    const commonProps = {
      register: register(field.name, field.validations),
      label: field.label,
      error,
      placeholder: field.placeholder,
      readonly: field.readonly,
    };

    switch (field.type) {
      case 'text':
        return <TextField {...commonProps} />;

      case 'password':
        return <TextField {...commonProps} type='password' />;

      case 'email':
        return <EmailField {...commonProps} />;

      case 'currency':
        return <CurrencyField {...commonProps} />;

      case 'number':
        return <NumberField {...commonProps} />;

      case 'date':
        return <DateField {...commonProps} />;

      case 'checkbox':
        return <CheckboxField {...commonProps} />;

      case 'textarea':
        return <TextField {...commonProps} multiline rows={4} />;

      case 'dropdown':
        return (
          <DropdownField
            {...commonProps}
            options={field.options || []}
            value={watchedFields[field.name] as string}
          />
        );

      case 'dynamicDropdown':
        return (
          <DynamicDropdownField
            {...commonProps}
            options={dynamicDropdownOptions[field.name] || []}
            loading={!dynamicDropdownOptions[field.name]}
            value={watchedFields[field.name] as string}
          />
        );

      default:
        return <TextField {...commonProps} />;
    }
  };

  const handleCancel = () => {
    reset(initialValues);
    if (onCancel) {
      onCancel();
    }
  };

  const handleClear = () => {
    // Crear un objeto vacío para todos los campos
    const emptyValues = metadata.fields.reduce(
      (acc, field) => {
        acc[field.name] = '';
        return acc;
      },
      {} as Record<string, unknown>
    );

    reset(emptyValues);
    if (onClear) {
      onClear();
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {metadata.title && (
        <Typography variant='h5' component='h2' gutterBottom>
          {metadata.title}
        </Typography>
      )}

      <Box
        component='form'
        onSubmit={handleSubmit((data: Record<string, unknown>) => {
          // Transform empty strings to null
          const transformedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              value === '' || value === undefined ? null : value,
            ])
          );
          onSubmit(transformedData);
        })}
        noValidate
      >
        <Grid container spacing={2}>
          {metadata.fields.map(field => (
            <Grid item xs={12} md={field.gridSize || 6} key={field.name}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}
        >
          {(onCancel || onClear) && (
            <Button
              type='button'
              variant='outlined'
              onClick={onClear ? handleClear : handleCancel}
              disabled={loading}
            >
              {onClear ? 'Limpiar' : metadata.cancelButtonText || 'Cancelar'}
            </Button>
          )}
          <Button type='submit' variant='contained' disabled={loading}>
            {loading ? 'Procesando...' : metadata.submitButtonText || 'Guardar'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FormularioGenerico;
