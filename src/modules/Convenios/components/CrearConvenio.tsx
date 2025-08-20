import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../../../lib/components/StyledText';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { useCreateConvenio } from '../hooks/useConvenios';
import { getConvenioFormMetadata } from '../helpers/convenioHelpers';
import { ConvenioCreateDto } from '../types';
import { useEmpresasDropdown } from '../../../lib/hooks/useDropdownData';

const CrearConvenio: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();
  const createMutation = useCreateConvenio();
  const { empresasParaAsignarOptions, isLoading: empresasLoading } =
    useEmpresasDropdown();

  const handleSubmit = (data: ConvenioCreateDto) => {
    createMutation.mutate(data as ConvenioCreateDto & Record<string, unknown>, {
      onSuccess: response => {
        showSuccess('Convenio creado exitosamente');
        // Redirigir al detalle del convenio creado
        if (response?.data && response.data.idConvenio) {
          navigate(`${ROUTES.CONVENIOS_DETALLE}/${response.data.idConvenio}`);
        } else {
          // Fallback: redirigir a la lista si no se puede obtener el ID
          navigate(ROUTES.CONVENIOS);
        }
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
      <PageTitle component='h1' gutterBottom>
        Crear Nuevo Convenio
      </PageTitle>

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
