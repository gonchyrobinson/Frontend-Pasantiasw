import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type TextFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  readonly?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
};

const TextField: React.FC<TextFieldProps> = ({
  register,
  label,
  error,
  type = 'text',
  placeholder,
  readonly = false,
  autoComplete,
  multiline = false,
  rows = 4,
}) => {
  return (
    <MuiTextField
      {...register}
      label={label}
      type={type}
      placeholder={placeholder}
      error={!!error}
      helperText={error}
      fullWidth
      margin='normal'
      variant='outlined'
      InputProps={{
        readOnly: readonly,
      }}
      autoComplete={autoComplete}
      multiline={multiline}
      rows={multiline ? rows : undefined}
    />
  );
};

export default TextField;
