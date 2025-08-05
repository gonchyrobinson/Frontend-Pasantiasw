import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormularioGenerico } from '../../FormularioGenerico';
import { CreacionEmpresaDto } from './types';
import { getCreacionEmpresaMetadata } from './helpers/creacionEmpresaHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../hooks/useSnackbar';

const CreacionEmpresas: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const handleSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);

    try {
      const empresaData = data as unknown as CreacionEmpresaDto;
      await axios.post('/api/empresas', empresaData);

      showSuccess('Empresa creada exitosamente');

      setTimeout(() => {
        navigate(ROUTES.EMPRESAS);
      }, 2000);
    } catch (error) {
      showError('Error al crear la empresa');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.EMPRESAS);
  };

  return (
    <>
      <FormularioGenerico
        metadata={getCreacionEmpresaMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default CreacionEmpresas;
