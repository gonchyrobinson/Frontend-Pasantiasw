import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../Shared/apis/apiClient';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { EmpresaDto } from './types';
import { getEdicionEmpresaMetadata } from './helpers/creacionEmpresaHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';

const EditarEmpresa: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<EmpresaDto | null>(null);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const data = await apiClient.get<EmpresaDto>(`/empresas/${id}`);
        setInitialData(data);
      } catch (error) {
        showError('Error al cargar la empresa');
        setTimeout(() => navigate(ROUTES.EMPRESAS), 2000);
      }
    };

    if (id) {
      fetchEmpresa();
    }
  }, [id, navigate, showError]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);

    try {
      const empresaData = { ...data, idEmpresa: parseInt(id || '0') };
      await apiClient.put(`/empresas`, empresaData);

      showSuccess('Empresa actualizada exitosamente');

      setTimeout(() => {
        navigate(ROUTES.EMPRESAS);
      }, 2000);
    } catch (error) {
      showError('Error al actualizar la empresa');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.EMPRESAS);
  };

  if (!initialData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Cargando datos de la empresa...
      </div>
    );
  }

  return (
    <>
      <FormularioGenerico
        metadata={getEdicionEmpresaMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
        initialValues={initialData as unknown as Record<string, unknown>}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default EditarEmpresa;
