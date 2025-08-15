import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import { PageTitle } from '../../../lib/components/StyledText';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../FormularioGenerico';
import { useConvenio, useUpdateConvenio } from '../hooks/useConvenios';
import { useEmpresasForDropdown } from '../hooks/useEmpresasForDropdown';
import { getConvenioFormMetadata } from '../helpers/convenioHelpers';
import { ConvenioDto } from '../types';

const EditarConvenio: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showSuccess, showError } = useSnackbar();

  const convenioId = id ? parseInt(id, 10) : 0;
  const { data: convenioResponse, isLoading, error } = useConvenio(convenioId);
  const convenio = convenioResponse?.data;
  const { empresasParaAsignarOptions, isLoading: empresasLoading } =
    useEmpresasForDropdown();
  const updateMutation = useUpdateConvenio();

  const handleSubmit = (data: ConvenioDto) => {
    updateMutation.mutate(data as ConvenioDto & Record<string, unknown>, {
      onSuccess: () => {
        showSuccess('Convenio actualizado exitosamente');
        navigate(ROUTES.CONVENIOS);
      },
      onError: () => {
        showError('Error al actualizar el convenio');
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTES.CONVENIOS);
  };

  if (isLoading || empresasLoading) {
    return (
      <div
        style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity='error'>
        Error al cargar el convenio: {error.message}
      </Alert>
    );
  }

  if (!convenio) {
    return <Alert severity='warning'>No se encontró el convenio</Alert>;
  }

  return (
    <div>
      <PageTitle component='h1' gutterBottom>
        Editar Convenio
      </PageTitle>

      <FormularioGenerico
        metadata={getConvenioFormMetadata()}
        initialValues={convenio as unknown as Record<string, unknown>}
        onSubmit={
          handleSubmit as unknown as (data: Record<string, unknown>) => void
        }
        onCancel={handleCancel}
        loading={updateMutation.isPending}
        dynamicDropdownOptions={{
          idEmpresa: empresasParaAsignarOptions,
        }}
      />
    </div>
  );
};

export default EditarConvenio;
