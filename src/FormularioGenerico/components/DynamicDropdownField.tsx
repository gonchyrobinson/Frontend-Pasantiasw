import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';
import { DropdownOption } from '../types';

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
  return (
    <FormControl fullWidth margin='normal' error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...register}
        label={label}
        readOnly={readonly || loading}
        disabled={readonly || loading}
        value={value !== undefined ? value : ''}
        displayEmpty={false}
      >
        {placeholder && (
          <MenuItem value=''>
            <em>{loading ? 'Cargando...' : placeholder}</em>
          </MenuItem>
        )}
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default DynamicDropdownField;
