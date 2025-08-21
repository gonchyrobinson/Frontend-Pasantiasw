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
            name: 'expediente',
            label: 'Expediente',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'caracter',
            label: 'Carácter',
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
            gridSize: 12,
          },
        ],
      },
      {
        title: 'Domicilios',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'domicilioLegal',
            label: 'Domicilio Legal',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'domicilioAlternativo',
            label: 'Domicilio Alternativo',
            type: 'text',
            gridSize: 6,
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
            name: 'fechaFirma',
            label: 'Fecha de Firma',
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
        title: 'Representante de Facultad',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'docRepresentanteFacultad',
            label: 'Documento del Representante',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'sudocu',
            label: 'Sudocu',
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
