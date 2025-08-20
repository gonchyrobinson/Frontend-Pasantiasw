import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { CreacionEstudianteDto } from './types';
import { getCreacionEstudianteMetadata } from './helpers/estudianteHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { useCreateEstudiante } from './hooks/useEstudiantes';

const CreacionEstudiantes: React.FC = () => {
  const navigate = useNavigate();
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const { mutate: createEstudiante, isPending: isCreating } =
    useCreateEstudiante();

  const handleSubmit = (formData: Record<string, unknown>) => {
    createEstudiante(formData as unknown as CreacionEstudianteDto, {
      onSuccess: response => {
        showSuccess('Estudiante creado exitosamente');
        // Redirigir al detalle del estudiante creado
        if (response && response.idEstudiante) {
          setTimeout(() => {
            navigate(`${ROUTES.ESTUDIANTES_DETALLE}/${response.idEstudiante}`);
          }, 2000);
        } else {
          // Fallback: redirigir a la lista si no se puede obtener el ID
          setTimeout(() => {
            navigate(ROUTES.ESTUDIANTES);
          }, 2000);
        }
      },
      onError: err => {
        showError(`Error al crear el estudiante: ${err.message}`);
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTES.ESTUDIANTES);
  };

  return (
    <>
      <FormularioGenerico
        metadata={getCreacionEstudianteMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={isCreating}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default CreacionEstudiantes;
