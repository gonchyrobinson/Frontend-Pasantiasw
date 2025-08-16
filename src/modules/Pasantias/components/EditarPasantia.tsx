import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../FormularioGenerico';
import {
  usePasantia,
  useUpdatePasantia,
  useEstudiantes,
  useConvenios,
} from '../hooks/usePasantias';
import { getPasantiaFormMetadata } from '../helpers/pasantiaHelpers';
import { PasantiaFormData } from '../types';
import { LoadingSpinner } from '../../../lib/components';

// Tipos para estudiantes y convenios
interface Estudiante {
  idEstudiante: number;
  nombre: string;
  apellido: string;
}

interface Convenio {
  idConvenio: number;
  expediente: string;
}

const EditarPasantia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pasantiaId = id ? parseInt(id, 10) : null;
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const { data: pasantiaData, isLoading, error } = usePasantia(pasantiaId);
  const { mutate: updatePasantia, isPending: isUpdating } = useUpdatePasantia();
  const { data: estudiantesResponse, isLoading: estudiantesLoading } =
    useEstudiantes();
  const { data: conveniosResponse, isLoading: conveniosLoading } =
    useConvenios();

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

  // Preparar opciones para dropdowns dinámicos
  const estudiantes = (estudiantesResponse || []) as Estudiante[];
  const convenios = (conveniosResponse || []) as Convenio[];

  const dynamicDropdownOptions = {
    idEstudiante: estudiantes.map((estudiante: Estudiante) => ({
      value: estudiante.idEstudiante,
      label: `${estudiante.nombre} ${estudiante.apellido}`,
    })),
    idConvenio: convenios.map((convenio: Convenio) => ({
      value: convenio.idConvenio,
      label: convenio.expediente,
    })),
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
