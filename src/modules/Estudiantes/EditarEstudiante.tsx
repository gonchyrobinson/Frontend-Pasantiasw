import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { EstudianteDto } from './types';
import { getEdicionEstudianteMetadata } from './helpers/estudianteHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { useEstudiante, useUpdateEstudiante } from './hooks/useEstudiantes';

const EditarEstudiante: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const estudianteId = id ? parseInt(id, 10) : null;
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const {
    data: estudianteData,
    isLoading,
    error,
  } = useEstudiante(estudianteId);
  const { mutate: updateEstudiante, isPending: isUpdating } =
    useUpdateEstudiante();

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (estudianteId) {
      updateEstudiante(
        { ...formData, idEstudiante: estudianteId } as unknown as EstudianteDto,
        {
          onSuccess: () => {
            showSuccess('Estudiante actualizado exitosamente');
            // Redirigir al detalle del estudiante modificado
            setTimeout(() => {
              navigate(`${ROUTES.ESTUDIANTES_DETALLE}/${estudianteId}`);
            }, 2000);
          },
          onError: err => {
            showError(`Error al actualizar el estudiante: ${err.message}`);
          },
        }
      );
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.ESTUDIANTES);
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Cargando datos del estudiante...
      </div>
    );
  }

  if (error) {
    return <div>Error al cargar el estudiante: {error.message}</div>;
  }

  if (!estudianteData) {
    return <div>No se encontró el estudiante.</div>;
  }

  return (
    <>
      <FormularioGenerico
        metadata={getEdicionEstudianteMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={isUpdating}
        initialValues={estudianteData as unknown as Record<string, unknown>}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default EditarEstudiante;
