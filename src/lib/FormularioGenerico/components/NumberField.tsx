import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type NumberFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
  placeholder?: string;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
};

const NumberField: React.FC<NumberFieldProps> = ({
  register,
  label,
  error,
  placeholder,
  readonly = false,
  min,
  max,
  step = 1,
}) => {
  return (
    <MuiTextField
      {...register}
      label={label}
      type='number'
      placeholder={placeholder}
      error={!!error}
      helperText={error}
      fullWidth
      margin='normal'
      variant='outlined'
      InputProps={{
        readOnly: readonly,
        inputProps: {
          min,
          max,
          step,
        },
      }}
    />
  );
};

export default NumberField;
