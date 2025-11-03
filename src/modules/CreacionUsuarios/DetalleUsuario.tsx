import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../lib/hooks/useApi';
import { UsuarioDto } from './types';
import { ROUTES } from '../../helpers/routesHelper';
import { VisualizadorGenerico } from '@/lib/VisualizadorGenerico';
import { getDetalleUsuarioMetadata } from './helpers/usuarioHelpers';

const DetalleUsuario: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: usuario,
    isLoading,
    error,
    refetch,
  } = useApiQuery<UsuarioDto>(`/v1/authn/user/${id}`);

  const metadata = getDetalleUsuarioMetadata(() =>
    navigate(`${ROUTES.USUARIOS_EDITAR}/${id}`)
  );

  return (
    <VisualizadorGenerico
      metadata={metadata}
      data={usuario?.data || {}}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
    />
  );
};

export default DetalleUsuario;
