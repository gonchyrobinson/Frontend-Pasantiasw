import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { useCreatePasantia } from '../hooks/usePasantias';
import {
  useEstudiantesDropdown,
  useEmpresasConvenioDropdown,
} from '../../../lib/hooks/useDropdownData';
import { getPasantiaFormMetadata } from '../helpers/pasantiaHelpers';
import { PasantiaFormData } from '../types';
import { LoadingSpinner } from '../../../lib/components';
import { PasantiaDto } from '../types';

const CrearPasantia: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess } = useSnackbar();

  const { mutate: createPasantia, isPending: isCreating } = useCreatePasantia();
  const { estudiantesOptions, isLoading: estudiantesLoading } =
    useEstudiantesDropdown();
  const { empresasConvenioOptions, isLoading: empresasConvenioLoading } =
    useEmpresasConvenioDropdown();

  const metadata = getPasantiaFormMetadata();

  const handleSubmit = async (formData: Record<string, unknown>) => {
    const response = await new Promise<PasantiaDto>((resolve, reject) => {
      createPasantia(formData as PasantiaFormData, {
        onSuccess: resolve,
        onError: reject,
      });
    });
    showSuccess('Pasantía creada exitosamente');
    if (response && response.idPasantia) {
      navigate(`${ROUTES.PASANTIAS_DETALLE}/${response.idPasantia}`);
    } else {
      navigate(ROUTES.PASANTIAS);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.PASANTIAS);
  };

  // Las opciones ya vienen formateadas desde los hooks
  const dynamicDropdownOptions = {
    idEstudiante: estudiantesOptions || [],
    idConvenio: empresasConvenioOptions || [],
  };

  if (estudiantesLoading || empresasConvenioLoading) {
    return <LoadingSpinner message='Cargando opciones...' />;
  }

  return (
    <FormularioGenerico
      metadata={metadata}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      loading={isCreating}
      dynamicDropdownOptions={dynamicDropdownOptions}
    />
  );
};

export default CrearPasantia;
