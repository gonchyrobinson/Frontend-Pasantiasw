import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../FormularioGenerico';
import { useCreateConvenio } from '../hooks/useConvenios';
import { getConvenioFormMetadata } from '../helpers/convenioHelpers';
import { ConvenioCreateDto } from '../types';
import { useEmpresasForDropdown } from '../hooks/useEmpresasForDropdown';

const CrearConvenio: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();
  const createMutation = useCreateConvenio();
  const { empresasParaAsignarOptions, isLoading: empresasLoading } =
    useEmpresasForDropdown();

  const handleSubmit = (data: ConvenioCreateDto) => {
    createMutation.mutate(data as ConvenioCreateDto & Record<string, unknown>, {
      onSuccess: () => {
        showSuccess('Convenio creado exitosamente');
        navigate(ROUTES.CONVENIOS);
      },
      onError: () => {
        showError('Error al crear el convenio');
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTES.CONVENIOS);
  };

  return (
    <div>
      <Typography variant='h4' component='h1' gutterBottom>
        Crear Nuevo Convenio
      </Typography>

      <FormularioGenerico
        metadata={getConvenioFormMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={createMutation.isPending || empresasLoading}
        dynamicDropdownOptions={{ idEmpresa: empresasParaAsignarOptions }}
      />
    </div>
  );
};

export default CrearConvenio;
