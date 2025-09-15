import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Business } from '@mui/icons-material';
import { useApiQuery } from '../../lib/hooks/useApi';
import { ConvenioEmpresaDto } from './types';
import { ROUTES } from '../../helpers/routesHelper';
import {
  DisplayMetadata,
  VisualizadorGenerico,
} from '@/lib/VisualizadorGenerico';

const DetalleConvenio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: convenio,
    isLoading,
    error,
    refetch,
  } = useApiQuery<ConvenioEmpresaDto>(`${ROUTES.CONVENIOS}/${id}`);

  const metadata: DisplayMetadata = {
    title: 'Detalle del Convenio',
    subtitle: 'Información completa del convenio y empresa asociada',
    showEditButton: true,
    showCopyButton: true,
    editButtonText: 'Editar',
    onEdit: () => navigate(`${ROUTES.CONVENIOS_EDITAR}/${id}`),
    navigationButtons: [
      {
        label: 'Ver Empresa',
        icon: <Business />,
        onClick: () =>
          navigate(`${ROUTES.EMPRESAS_DETALLE}/${convenio?.data?.idEmpresa}`),
        condition: !!convenio?.data?.idEmpresa,
      },
    ],
    sections: [
      {
        title: 'Información General',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'expedienteSudocu',
            label: 'Expediente SUDOCU',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'tipoAcuerdo',
            label: 'Tipo de Acuerdo',
            type: 'text',
            gridSize: 6,
          },
        ],
      },
      {
        title: 'Empresa Asociada',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'nombreEmpresa',
            label: 'Nombre de la Empresa',
            type: 'text',
            gridSize: 12,
          },
          {
            name: 'representanteEmpresa',
            label: 'Representante de la Empresa',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'docRepresentanteEmpresa',
            label: 'Documento del Representante',
            type: 'text',
            gridSize: 6,
          },
        ],
      },
      {
        title: 'Domicilio',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'domicilioLegal',
            label: 'Domicilio Legal',
            type: 'text',
            gridSize: 12,
          },
        ],
      },
      {
        title: 'Fechas del Convenio',
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
            name: 'fechaCaducidad',
            label: 'Fecha de Caducidad',
            type: 'date',
            gridSize: 6,
          },
        ],
      },
      {
        title: 'Decano',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'nombreDecano',
            label: 'Nombre del Decano',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'documentoDecano',
            label: 'Documento del Decano',
            type: 'text',
            gridSize: 6,
          },
        ],
      },
    ],
  };

  return (
    <VisualizadorGenerico
      metadata={metadata}
      data={convenio?.data || {}}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
    />
  );
};

export default DetalleConvenio;
