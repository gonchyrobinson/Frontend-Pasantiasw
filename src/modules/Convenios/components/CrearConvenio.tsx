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
  const { showSuccess } = useSnackbar();
  const createMutation = useCreateConvenio();
  const { empresasParaAsignarOptions, isLoading: empresasLoading } =
    useEmpresasDropdown();

  const handleSubmit = async (data: ConvenioCreateDto) => {
    const response = await createMutation.mutateAsync(
      data as ConvenioCreateDto & Record<string, unknown>
    );
    showSuccess('Convenio creado exitosamente');
    if (response?.data && response.data.idConvenio) {
      navigate(`${ROUTES.CONVENIOS_DETALLE}/${response.data.idConvenio}`);
    } else {
      navigate(ROUTES.CONVENIOS);
    }
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
