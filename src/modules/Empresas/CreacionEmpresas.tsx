import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { CreacionEmpresaDto } from './types';
import { getCreacionEmpresaMetadata } from './helpers/creacionEmpresaHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { useCreateEmpresa } from './hooks/useEmpresas';

const CreacionEmpresas: React.FC = () => {
  const navigate = useNavigate();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const { mutate: createEmpresa, isPending: isCreating } = useCreateEmpresa();

  const handleSubmit = (formData: Record<string, unknown>) => {
    createEmpresa(formData as unknown as CreacionEmpresaDto, {
      onSuccess: () => {
        showSuccess('Empresa creada exitosamente');
        setTimeout(() => {
          navigate(ROUTES.EMPRESAS);
        }, 2000);
      },
      onError: err => {
        showError(`Error al crear la empresa: ${err.message}`);
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTES.EMPRESAS);
  };

  return (
    <>
      <FormularioGenerico
        metadata={getCreacionEmpresaMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={isCreating}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default CreacionEmpresas;
