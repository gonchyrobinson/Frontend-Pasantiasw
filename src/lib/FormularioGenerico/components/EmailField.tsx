import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type EmailFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
  placeholder?: string;
  readonly?: boolean;
};

const EmailField: React.FC<EmailFieldProps> = ({
  register,
  label,
  error,
  placeholder,
  readonly = false,
}) => {
  return (
    <MuiTextField
      {...register}
      label={label}
      type='email'
      placeholder={placeholder}
      error={!!error}
      helperText={error}
      fullWidth
      margin='normal'
      variant='outlined'
      InputProps={{
        readOnly: readonly,
      }}
      autoComplete='email'
    />
  );
};

export default EmailField;
