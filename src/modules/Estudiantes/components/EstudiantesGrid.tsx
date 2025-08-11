import React from 'react';
import { Grids, GridsProps } from '../../../lib/ElementCardGenerica';
import { EstudianteDto } from '../types';
import {
  getEstudianteMetadata,
  getEstudianteCardTitle,
  getEstudianteCardSubtitle,
} from '../helpers/estudianteHelpers';

interface EstudiantesGridProps {
  estudiantes: EstudianteDto[];
  onEstudianteClick?: (estudiante: EstudianteDto) => void;
  onEstudianteEdit?: (estudiante: EstudianteDto) => void;
  onEstudianteDelete?: (estudiante: EstudianteDto) => void;
}

const EstudiantesGrid: React.FC<EstudiantesGridProps> = ({
  estudiantes,
  onEstudianteClick,
  onEstudianteEdit,
  onEstudianteDelete,
}) => {
  const metadata = getEstudianteMetadata();

  const gridsData: GridsProps<EstudianteDto> = {
    items: estudiantes,
    metadata,
    getCardTitle: getEstudianteCardTitle,
    getCardSubtitle: getEstudianteCardSubtitle,
    onItemClick: onEstudianteClick,
    onItemEdit: onEstudianteEdit,
    onItemDelete: onEstudianteDelete,
    emptyStateTitle: 'No se encontraron estudiantes',
    emptyStateText: 'No hay estudiantes para mostrar en este momento.',
  };

  return <Grids {...gridsData} />;
};

export default EstudiantesGrid;
