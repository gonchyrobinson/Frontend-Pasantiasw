import React from 'react';
import { FormControlLabel, Checkbox, FormHelperText } from '@mui/material';
import { SectionContainer } from '../../components/StyledContainers';
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
    <SectionContainer sx={{ mt: 2, mb: 1 }}>
      <FormControlLabel
        control={<Checkbox {...register} disabled={readonly} color='primary' />}
        label={label}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
    </SectionContainer>
  );
};

export default CheckboxField;
