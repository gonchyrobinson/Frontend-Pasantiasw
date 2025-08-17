import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../Shared/apis/apiClient';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { EstudianteDto } from './types';
import { getEdicionEstudianteMetadata } from './helpers/estudianteHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';

const EditarEstudiante: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<EstudianteDto | null>(null);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchEstudiante = async () => {
      try {
        const data = await apiClient.get<EstudianteDto>(`/students/${id}`);
        setInitialData(data);
      } catch (error) {
        showError('Error al cargar el estudiante');
        setTimeout(() => navigate(ROUTES.ESTUDIANTES), 2000);
      }
    };

    if (id) {
      fetchEstudiante();
    }
  }, [id, navigate, showError]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);

    try {
      const estudianteData = { ...data, idEstudiante: parseInt(id || '0') };
      await apiClient.put(`/students`, estudianteData);

      showSuccess('Estudiante actualizado exitosamente');

      setTimeout(() => {
        navigate(ROUTES.ESTUDIANTES);
      }, 2000);
    } catch (error) {
      showError('Error al actualizar el estudiante');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.ESTUDIANTES);
  };

  if (!initialData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Cargando datos del estudiante...
      </div>
    );
  }

  return (
    <>
      <FormularioGenerico
        metadata={getEdicionEstudianteMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        initialValues={initialData as unknown as Record<string, unknown>}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default EditarEstudiante;
