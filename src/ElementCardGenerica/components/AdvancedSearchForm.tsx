import React from 'react';
import { FormularioGenerico } from '../../FormularioGenerico';
import { AdvancedSearchFormProps } from '../types';

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({
  metadata,
  onSubmit,
  onCancel,
  onClear,
  initialValues = {},
  loading = false,
}) => {
  return (
    <FormularioGenerico
      metadata={metadata}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onClear={onClear}
      initialValues={initialValues}
      loading={loading}
    />
  );
};

export default AdvancedSearchForm;
