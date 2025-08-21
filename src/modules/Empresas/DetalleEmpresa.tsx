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
            name: 'nombre',
            label: 'Nombre de la Empresa',
            type: 'text',
            gridSize: 12,
          },
          {
            name: 'vigencia',
            label: 'Estado',
            type: 'badge',
            gridSize: 6,
            badgeConfig: {
              color: 'primary',
            },
          },
          {
            name: 'tipoContrato',
            label: 'Tipo de Contrato',
            type: 'badge',
            gridSize: 6,
            badgeConfig: {
              color: 'secondary',
            },
          },
        ],
      },
      {
        title: 'Fechas del Contrato',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'fechaInicio',
            label: 'Fecha de Inicio',
            type: 'date',
            gridSize: 6,
          },
          {
            name: 'fechaFin',
            label: 'Fecha de Fin',
            type: 'date',
            gridSize: 6,
          },
        ],
      },
      {
        title: 'Información de Contacto',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'encargado',
            label: 'Encargado',
            type: 'text',
            gridSize: 12,
          },
          {
            name: 'correoElectronico',
            label: 'Email',
            type: 'email',
            gridSize: 6,
          },
          {
            name: 'celular',
            label: 'Teléfono',
            type: 'phone',
            gridSize: 6,
          },
          {
            name: 'sudocu',
            label: 'Sudocu',
            type: 'text',
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
