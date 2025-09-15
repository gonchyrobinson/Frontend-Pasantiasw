import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../lib/hooks/useApi';
import { EmpresaDto } from './types';
import { ROUTES } from '../../helpers/routesHelper';
import {
  DisplayMetadata,
  VisualizadorGenerico,
} from '@/lib/VisualizadorGenerico';

const DetalleEmpresa: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: empresa,
    isLoading,
    error,
    refetch,
  } = useApiQuery<EmpresaDto>(`${ROUTES.EMPRESAS}/${id}`);

  const metadata: DisplayMetadata = {
    title: 'Perfil de la Empresa',
    subtitle: 'Información completa de la empresa',
    showEditButton: true,
    showCopyButton: true,
    editButtonText: 'Editar',
    onEdit: () => navigate(`${ROUTES.EMPRESAS_EDITAR}/${id}`),
    sections: [
      {
        title: 'Información General',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'idEmpresa',
            label: 'ID de la Empresa',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'nombre',
            label: 'Nombre de la Empresa',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'correoElectronico',
            label: 'Correo Electrónico',
            type: 'email',
            gridSize: 12,
          },
        ],
      },
    ],
  };

  return (
    <VisualizadorGenerico
      metadata={metadata}
      data={empresa?.data || {}}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
    />
  );
};

export default DetalleEmpresa;
