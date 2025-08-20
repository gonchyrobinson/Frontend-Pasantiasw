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
      onSuccess: response => {
        showSuccess('Empresa creada exitosamente');
        // Redirigir al detalle de la empresa creada
        if (response && response.idEmpresa) {
          setTimeout(() => {
            navigate(`${ROUTES.EMPRESAS_DETALLE}/${response.idEmpresa}`);
          }, 2000);
        } else {
          // Fallback: redirigir a la lista si no se puede obtener el ID
          setTimeout(() => {
            navigate(ROUTES.EMPRESAS);
          }, 2000);
        }
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
