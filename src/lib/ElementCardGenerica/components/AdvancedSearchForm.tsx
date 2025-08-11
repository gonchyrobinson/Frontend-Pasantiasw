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
  dynamicDropdownOptions,
}) => {
  return (
    <FormularioGenerico
      metadata={metadata}
      onSubmit={onSubmit}
      onCancel={onCancel}
      onClear={onClear}
      initialValues={initialValues}
      loading={loading}
      dynamicDropdownOptions={dynamicDropdownOptions}
    />
  );
};

export default AdvancedSearchForm;
