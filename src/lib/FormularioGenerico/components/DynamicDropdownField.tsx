import React from 'react';
import { Autocomplete, TextField, FormControl } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';
import { DropdownOption } from '../types';
import LoadingSpinner from '../../components/LoadingSpinner';

type DynamicDropdownFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  options?: DropdownOption[];
  error?: string;
  readonly?: boolean;
  placeholder?: string;
  loading?: boolean;
  value?: string | number;
};

const DynamicDropdownField: React.FC<DynamicDropdownFieldProps> = ({
  register,
  label,
  options = [],
  error,
  readonly = false,
  placeholder,
  loading = false,
  value,
}) => {
  const selectedOption = options.find(opt => opt.value === value) || null;

  // Mostrar LoadingSpinner mientras cargan las opciones
  if (loading || (options.length === 0 && loading !== false)) {
    return (
      <FormControl fullWidth margin='normal'>
        <LoadingSpinner
          message={`Cargando ${label.toLowerCase()}...`}
          size={40}
        />
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth margin='normal' error={!!error}>
      <Autocomplete
        {...register}
        options={options}
        getOptionLabel={option => option.label}
        value={selectedOption}
        onChange={(_, newValue) => {
          const event = {
            target: { value: newValue?.value || '', name: register.name },
          } as React.ChangeEvent<HTMLInputElement>;
          register.onChange(event);
        }}
        readOnly={readonly}
        disabled={readonly}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
          />
        )}
        isOptionEqualToValue={(option, val) => option.value === val.value}
        noOptionsText='No hay opciones disponibles'
        clearText='Limpiar'
        closeText='Cerrar'
        openText='Abrir'
      />
    </FormControl>
  );
};

export default DynamicDropdownField;
