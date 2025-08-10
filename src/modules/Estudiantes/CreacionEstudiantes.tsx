import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../Shared/apis/apiClient';
import { FormularioGenerico } from '../../FormularioGenerico';
import { CreacionEstudianteDto } from './types';
import { getCreacionEstudianteMetadata } from './helpers/estudianteHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../hooks/useSnackbar';

const CreacionEstudiantes: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const handleSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);

    try {
      const estudianteData = data as unknown as CreacionEstudianteDto;
      await apiClient.post('/students', estudianteData);

      showSuccess('Estudiante creado exitosamente');

      setTimeout(() => {
        navigate(ROUTES.ESTUDIANTES);
      }, 2000);
    } catch (error) {
      showError('Error al crear el estudiante');
    } finally {
      setLoading(false);
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
        loading={loading}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default CreacionEstudiantes;
