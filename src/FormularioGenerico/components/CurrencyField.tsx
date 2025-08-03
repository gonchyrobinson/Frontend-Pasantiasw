import React from 'react';
import { TextField as MuiTextField, InputAdornment } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type CurrencyFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
  placeholder?: string;
  readonly?: boolean;
  currency?: string;
};

const CurrencyField: React.FC<CurrencyFieldProps> = ({
  register,
  label,
  error,
  placeholder,
  readonly = false,
  currency = '$',
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
        startAdornment: (
          <InputAdornment position='start'>{currency}</InputAdornment>
        ),
        inputProps: {
          step: '0.01',
          min: '0',
        },
      }}
    />
  );
};

export default CurrencyField;
