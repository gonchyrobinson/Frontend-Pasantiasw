import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import {
  useCreatePasantia,
  useEstudiantes,
  useConvenios,
} from '../hooks/usePasantias';
import { getPasantiaFormMetadata } from '../helpers/pasantiaHelpers';
import { PasantiaFormData } from '../types';
import { LoadingSpinner } from '../../../lib/components';

const CrearPasantia: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const { mutate: createPasantia, isPending: isCreating } = useCreatePasantia();
  const { data: estudiantesResponse, isLoading: estudiantesLoading } =
    useEstudiantes();
  const { data: conveniosResponse, isLoading: conveniosLoading } =
    useConvenios();

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

  // Preparar opciones para dropdowns dinámicos
  const estudiantes = estudiantesResponse || [];
  const convenios = conveniosResponse || [];

  const dynamicDropdownOptions = {
    idEstudiante: estudiantes.map(estudiante => ({
      value: estudiante.idEstudiante,
      label: `${estudiante.nombre} ${estudiante.apellido}`,
    })),
    idConvenio: convenios.map(convenio => ({
      value: convenio.idConvenio,
      label: convenio.expediente,
    })),
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
