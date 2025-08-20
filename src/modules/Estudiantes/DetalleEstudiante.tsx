import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VisualizadorGenerico, DisplayMetadata } from '../../lib/components';
import { useApiQuery } from '../../lib/hooks/useApi';
import { EstudianteDto } from './types';
import { ROUTES } from '../../helpers/routesHelper';

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
            gridSize: 12,
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
            gridSize: 6,
            badgeConfig: {
              color: 'primary',
            },
          },
          {
            name: 'areaTrabajo',
            label: 'Área de Trabajo',
            type: 'badge',
            gridSize: 6,
            badgeConfig: {
              color: 'secondary',
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
