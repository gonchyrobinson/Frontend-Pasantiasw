import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { useCreatePasantia } from '../hooks/usePasantias';
import {
  useEstudiantesDropdown,
  useConveniosDropdown,
} from '../../../lib/hooks/useDropdownData';
import { getPasantiaFormMetadata } from '../helpers/pasantiaHelpers';
import { PasantiaFormData } from '../types';
import { LoadingSpinner } from '../../../lib/components';

const CrearPasantia: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const { mutate: createPasantia, isPending: isCreating } = useCreatePasantia();
  const { estudiantesOptions, isLoading: estudiantesLoading } =
    useEstudiantesDropdown();
  const { conveniosOptions, isLoading: conveniosLoading } =
    useConveniosDropdown();

  const metadata = getPasantiaFormMetadata();

  const handleSubmit = (formData: Record<string, unknown>) => {
    createPasantia(formData as unknown as PasantiaFormData, {
      onSuccess: () => {
        showSuccess('Pasantía creada exitosamente');
        navigate(ROUTES.PASANTIAS);
      },
      onError: err => {
        showError(`Error al crear pasantía: ${err.message}`);
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTES.PASANTIAS);
  };

  // Las opciones ya vienen formateadas desde los hooks
  const dynamicDropdownOptions = {
    idEstudiante: estudiantesOptions || [],
    idConvenio: conveniosOptions || [],
  };

  if (estudiantesLoading || conveniosLoading) {
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
