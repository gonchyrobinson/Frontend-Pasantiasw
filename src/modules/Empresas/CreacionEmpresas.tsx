import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { CreacionEmpresaDto, EmpresaDto } from './types';
import { getCreacionEmpresaMetadata } from './helpers/creacionEmpresaHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { useCreateEmpresa } from './hooks/useEmpresas';

const CreacionEmpresas: React.FC = () => {
  const navigate = useNavigate();
  const { snackbar, showSuccess, hideSnackbar } = useSnackbar();
  const { mutate: createEmpresa, isPending: isCreating } = useCreateEmpresa();

  const handleSubmit = async (formData: Record<string, unknown>) => {
    const response = await new Promise<EmpresaDto>((resolve, reject) => {
      createEmpresa(formData as unknown as CreacionEmpresaDto, {
        onSuccess: resolve,
        onError: reject,
      });
    });
    showSuccess('Empresa creada exitosamente');
    if (response && response.idEmpresa) {
      setTimeout(() => {
        navigate(`${ROUTES.EMPRESAS_DETALLE}/${response.idEmpresa}`);
      }, 2000);
    } else {
      setTimeout(() => {
        navigate(ROUTES.EMPRESAS);
      }, 2000);
    }
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
