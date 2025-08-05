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

type DropdownFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  options: DropdownOption[];
  error?: string;
  readonly?: boolean;
  placeholder?: string;
  value?: string | number;
};

const DropdownField: React.FC<DropdownFieldProps> = ({
  register,
  label,
  options,
  error,
  readonly = false,
  placeholder,
  value,
}) => {
  return (
    <FormControl fullWidth margin='normal' error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...register}
        label={label}
        readOnly={readonly}
        disabled={readonly}
        value={value || ''}
        displayEmpty
      >
        {placeholder && (
          <MenuItem value=''>
            <em>{placeholder}</em>
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

export default DropdownField;
