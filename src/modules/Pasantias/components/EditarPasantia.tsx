import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { usePasantia, useUpdatePasantia } from '../hooks/usePasantias';
import {
  useEstudiantesDropdown,
  useConveniosDropdown,
} from '../../../lib/hooks/useDropdownData';
import { getPasantiaFormMetadata } from '../helpers/pasantiaHelpers';
import { PasantiaFormData } from '../types';
import { LoadingSpinner } from '../../../lib/components';

const EditarPasantia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pasantiaId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const { data: pasantiaData, isLoading, error } = usePasantia(pasantiaId);
  const { mutate: updatePasantia, isPending: isUpdating } = useUpdatePasantia();
  const { estudiantesOptions, isLoading: estudiantesLoading } =
    useEstudiantesDropdown();
  const { conveniosOptions, isLoading: conveniosLoading } =
    useConveniosDropdown();

  const metadata = getPasantiaFormMetadata();

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (pasantiaId) {
      updatePasantia(
        { data: formData as unknown as PasantiaFormData },
        {
          onSuccess: () => {
            showSuccess('Pasantía actualizada exitosamente');
            // Retornar a la página principal preservando el estado
            navigate(ROUTES.PASANTIAS);
          },
          onError: err => {
            showError(`Error al actualizar pasantía: ${err.message}`);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.PASANTIAS);
  };

  if (isLoading || estudiantesLoading || conveniosLoading) {
    return <LoadingSpinner message='Cargando datos...' />;
  }

  if (error) {
    return <div>Error al cargar la pasantía: {error.message}</div>;
  }

  if (!pasantiaData) {
    return <div>No se encontró la pasantía.</div>;
  }

  // Las opciones ya vienen formateadas desde los hooks
  const dynamicDropdownOptions = {
    idEstudiante: estudiantesOptions || [],
    idConvenio: conveniosOptions || [],
  };

  return (
    <FormularioGenerico
      metadata={metadata}
      initialValues={pasantiaData as unknown as Record<string, unknown>}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      loading={isUpdating}
      dynamicDropdownOptions={dynamicDropdownOptions}
    />
  );
};

export default EditarPasantia;
