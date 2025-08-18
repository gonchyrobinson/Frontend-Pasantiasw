import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Person, Assignment } from '@mui/icons-material';
import { VisualizadorGenerico, DisplayMetadata } from '../../lib/components';
import { useApiQuery } from '../../lib/hooks/useApi';
import { PasantiaDto } from './types';
import { ROUTES } from '../../helpers/routesHelper';

const DetallePasantia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: pasantia,
    isLoading,
    error,
    refetch,
  } = useApiQuery<PasantiaDto>(`${ROUTES.PASANTIAS}/${id}`);

  const metadata: DisplayMetadata = {
    title: 'Detalle de la Pasantía',
    subtitle: 'Información completa de la pasantía',
    showEditButton: true,
    showCopyButton: true,
    editButtonText: 'Editar',
    onEdit: () => navigate(`${ROUTES.PASANTIAS_EDITAR}/${id}`),
    navigationButtons: [
      {
        label: 'Ver Estudiante',
        icon: <Person />,
        onClick: () =>
          navigate(
            `${ROUTES.ESTUDIANTES_DETALLE}/${pasantia?.data?.idEstudiante}`
          ),
        condition: !!pasantia?.data?.idEstudiante,
      },
      {
        label: 'Ver Convenio',
        icon: <Assignment />,
        onClick: () =>
          navigate(`${ROUTES.CONVENIOS_DETALLE}/${pasantia?.data?.idConvenio}`),
        condition: !!pasantia?.data?.idConvenio,
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
            name: 'tramite',
            label: 'Trámite',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'estado',
            label: 'Estado',
            type: 'badge',
            gridSize: 6,
            badgeConfig: {
              color: 'primary',
            },
          },
          {
            name: 'areaTrabajo',
            label: 'Área de Trabajo',
            type: 'text',
            gridSize: 12,
          },
        ],
      },
      {
        title: 'Fechas y Duración',
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
        title: 'Aspectos Económicos',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'asignacionMensual',
            label: 'Asignación Mensual',
            type: 'currency',
            gridSize: 6,
          },
          {
            name: 'montoPago',
            label: 'Monto de Pago',
            type: 'currency',
            gridSize: 6,
          },
          {
            name: 'frecuenciaPago',
            label: 'Frecuencia de Pago',
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
        title: 'Seguros y Protección',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'obraSocial',
            label: 'Obra Social',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'art',
            label: 'ART',
            type: 'text',
            gridSize: 6,
          },
        ],
      },
      {
        title: 'Tutores',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'tutorEmpresa',
            label: 'Tutor de la Empresa',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'tutorFacultad',
            label: 'Tutor de la Facultad',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'dniTutorFacultad',
            label: 'DNI Tutor Facultad',
            type: 'text',
            gridSize: 6,
            prefix: 'DNI: ',
          },
        ],
      },
      {
        title: 'Información Adicional',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'sudocu',
            label: 'Sudocu',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'observaciones',
            label: 'Observaciones',
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
      data={pasantia?.data || {}}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
    />
  );
};

export default DetallePasantia;
