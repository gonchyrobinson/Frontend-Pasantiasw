import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApiQuery } from '../../lib/hooks/useApi';
import { EstudianteDto } from './types';
import { ROUTES } from '../../helpers/routesHelper';
import {
  DisplayMetadata,
  VisualizadorGenerico,
} from '@/lib/VisualizadorGenerico';

const DetalleEstudiante: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: estudiante,
    isLoading,
    error,
    refetch,
  } = useApiQuery<EstudianteDto>(`${ROUTES.ESTUDIANTES}/${id}`);

  const metadata: DisplayMetadata = {
    title: 'Perfil del Estudiante',
    subtitle: 'Información completa del estudiante',
    showEditButton: true,
    showCopyButton: true,
    editButtonText: 'Editar',
    onEdit: () => navigate(`${ROUTES.ESTUDIANTES_EDITAR}/${id}`),
    sections: [
      {
        title: 'Datos Personales',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'nombre',
            label: 'Nombre',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'apellido',
            label: 'Apellido',
            type: 'text',
            gridSize: 6,
          },
          {
            name: 'documento',
            label: 'Documento',
            type: 'text',
            gridSize: 6,
            prefix: 'DNI: ',
          },
          {
            name: 'domicilio',
            label: 'Domicilio',
            type: 'text',
            gridSize: 6,
          },
        ],
      },
      {
        title: 'Información Académica',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'carrera',
            label: 'Carrera',
            type: 'badge',
            gridSize: 12,
            badgeConfig: {
              color: 'primary',
            },
          },
        ],
      },
      {
        title: 'Contacto',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            gridSize: 12,
          },
        ],
      },
      {
        title: 'Estado',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'eliminado',
            label: 'Estado',
            type: 'badge',
            gridSize: 6,
            badgeConfig: {
              color: 'success',
              trueLabel: 'Eliminado',
              falseLabel: 'Activo',
              trueColor: 'error',
              falseColor: 'success',
            },
          },
          {
            name: 'fechaEliminacion',
            label: 'Fecha de Eliminación',
            type: 'date',
            gridSize: 6,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            condition: (data: any) => data?.eliminado,
          },
        ],
      },
    ],
  };

  return (
    <VisualizadorGenerico
      metadata={metadata}
      data={estudiante?.data || {}}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
    />
  );
};

export default DetalleEstudiante;
