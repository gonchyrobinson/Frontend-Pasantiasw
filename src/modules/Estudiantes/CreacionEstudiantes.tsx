import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { CreacionEstudianteDto, EstudianteDto } from './types';
import { getCreacionEstudianteMetadata } from './helpers/estudianteHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { useCreateEstudiante } from './hooks/useEstudiantes';

const CreacionEstudiantes: React.FC = () => {
  const navigate = useNavigate();
  const { snackbar, showSuccess, hideSnackbar } = useSnackbar();
  const { mutate: createEstudiante, isPending: isCreating } =
    useCreateEstudiante();

  const handleSubmit = async (formData: Record<string, unknown>) => {
    const response = await new Promise<EstudianteDto>((resolve, reject) => {
      createEstudiante(formData as unknown as CreacionEstudianteDto, {
        onSuccess: resolve,
        onError: reject,
      });
    });
    showSuccess('Estudiante creado exitosamente');
    if (response && response.idEstudiante) {
      setTimeout(() => {
        navigate(`${ROUTES.ESTUDIANTES_DETALLE}/${response.idEstudiante}`);
      }, 2000);
    } else {
      setTimeout(() => {
        navigate(ROUTES.ESTUDIANTES);
      }, 2000);
    }
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
