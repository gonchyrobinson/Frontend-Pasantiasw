import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type DateFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
  readonly?: boolean;
  type?: 'date' | 'datetime-local';
};

const DateField: React.FC<DateFieldProps> = ({
  register,
  label,
  error,
  readonly = false,
  type = 'date',
}) => {
  return (
    <MuiTextField
      {...register}
      label={label}
      type={type}
      error={!!error}
      helperText={error}
      fullWidth
      margin='normal'
      variant='outlined'
      InputProps={{
        readOnly: readonly,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateField;
