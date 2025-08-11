import React from 'react';
import { FormControlLabel, Checkbox, FormHelperText, Box } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

type CheckboxFieldProps = {
  register: UseFormRegisterReturn;
  label: string;
  error?: string;
  readonly?: boolean;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  register,
  label,
  error,
  readonly = false,
}) => {
  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <FormControlLabel
        control={<Checkbox {...register} disabled={readonly} color='primary' />}
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
};

export default CheckboxField;
