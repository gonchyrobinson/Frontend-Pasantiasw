import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { EmpresaDto } from './types';
import { getEdicionEmpresaMetadata } from './helpers/creacionEmpresaHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { useEmpresa, useUpdateEmpresa } from './hooks/useEmpresas';

const EditarEmpresa: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const empresaId = id ? parseInt(id, 10) : null;
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const { data: empresaData, isLoading, error } = useEmpresa(empresaId);
  const { mutate: updateEmpresa, isPending: isUpdating } = useUpdateEmpresa();

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (empresaId) {
      updateEmpresa(
        { ...formData, idEmpresa: empresaId } as unknown as EmpresaDto,
        {
          onSuccess: () => {
            showSuccess('Empresa actualizada exitosamente');
            setTimeout(() => {
              navigate(ROUTES.EMPRESAS);
            }, 2000);
          },
          onError: err => {
            showError(`Error al actualizar la empresa: ${err.message}`);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.EMPRESAS);
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Cargando datos de la empresa...
      </div>
    );
  }

  if (error) {
    return <div>Error al cargar la empresa: {error.message}</div>;
  }

  if (!empresaData) {
    return <div>No se encontró la empresa.</div>;
  }

  return (
    <>
      <FormularioGenerico
        metadata={getEdicionEmpresaMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={isUpdating}
        initialValues={empresaData as unknown as Record<string, unknown>}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default EditarEmpresa;
