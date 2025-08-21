import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { usePasantia, useUpdatePasantia } from '../hooks/usePasantias';
import {
  useEstudiantesDropdown,
  useEmpresasConvenioDropdown,
} from '../../../lib/hooks/useDropdownData';
import { getPasantiaFormMetadata } from '../helpers/pasantiaHelpers';
import { PasantiaFormData, PasantiaDto } from '../types';
import { LoadingSpinner } from '../../../lib/components';

const EditarPasantia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pasantiaId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const { showSuccess } = useSnackbar();

  const { data: pasantiaData, isLoading, error } = usePasantia(pasantiaId);
  const { mutate: updatePasantia, isPending: isUpdating } = useUpdatePasantia();
  const { estudiantesOptions, isLoading: estudiantesLoading } =
    useEstudiantesDropdown();
  const { empresasConvenioOptions, isLoading: empresasConvenioLoading } =
    useEmpresasConvenioDropdown();

  const metadata = getPasantiaFormMetadata();

  const handleSubmit = async (formData: Record<string, unknown>) => {
    if (pasantiaId) {
      await new Promise<PasantiaDto>((resolve, reject) => {
        updatePasantia(
          { data: formData as unknown as PasantiaFormData },
          {
            onSuccess: resolve,
            onError: reject,
          }
        );
      });
      showSuccess('Pasantía actualizada exitosamente');
      navigate(`${ROUTES.PASANTIAS_DETALLE}/${pasantiaId}`);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.PASANTIAS);
  };

  if (isLoading || estudiantesLoading || empresasConvenioLoading) {
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
    idConvenio: empresasConvenioOptions || [],
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
