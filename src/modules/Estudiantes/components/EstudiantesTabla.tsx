import React from 'react';
import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { EstudianteDto } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';

interface EstudiantesTablaProps {
  estudiantes: EstudianteDto[];
  loading?: boolean;
  onRowClick?: (estudiante: EstudianteDto) => void;
  onRowEdit?: (estudiante: EstudianteDto) => void;
  onRowDelete?: (estudiante: EstudianteDto) => void;
  extraButtons?: Array<{
    label: string;
    onClick: (estudiante: EstudianteDto) => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: React.ReactNode;
  }>;
}

const EstudiantesTabla: React.FC<EstudiantesTablaProps> = ({
  estudiantes,
  loading = false,
  onRowClick,
  onRowEdit,
  onRowDelete,
  extraButtons = [],
}) => {
  const metadata: FieldMetadata[] = [
    { name: 'apellido', label: 'Apellido', type: 'text' },
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'documento', label: 'Documento', type: 'text' },
    { name: 'carrera', label: 'Carrera', type: 'text' },
    { name: 'areaTrabajo', label: 'Área de Trabajo', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'telefono', label: 'Teléfono', type: 'text' },
    { name: 'domicilio', label: 'Domicilio', type: 'text' },
    { name: 'libreta', label: 'Libreta', type: 'text' },
  ];

  const estudiantesData = estudiantes.map(estudiante => ({
    ...estudiante,
    id: estudiante.idEstudiante,
  }));

  const handleRowClick = (row: Record<string, unknown>) => {
    if (onRowClick) {
      const estudiante = estudiantes.find(e => e.idEstudiante === row.id);
      if (estudiante) onRowClick(estudiante);
    }
  };

  const handleRowEdit = (row: Record<string, unknown>) => {
    if (onRowEdit) {
      const estudiante = estudiantes.find(e => e.idEstudiante === row.id);
      if (estudiante) onRowEdit(estudiante);
    }
  };

  const handleRowDelete = (row: Record<string, unknown>) => {
    if (onRowDelete) {
      const estudiante = estudiantes.find(e => e.idEstudiante === row.id);
      if (estudiante) onRowDelete(estudiante);
    }
  };

  const extraButtonsGeneric = extraButtons.map(button => ({
    ...button,
    onClick: (row: Record<string, unknown>) => {
      const estudiante = estudiantes.find(e => e.idEstudiante === row.id);
      if (estudiante) button.onClick(estudiante);
    },
  }));

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={estudiantesData}
      title='Estudiantes'
      subtitle='Lista de estudiantes registrados en el sistema'
      loading={loading}
      onRowClick={handleRowClick}
      onRowEdit={handleRowEdit}
      onRowDelete={handleRowDelete}
      extraButtons={extraButtonsGeneric}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      initialSortModel={[{ field: 'apellido', sort: 'asc' }]}
    />
  );
};

export default EstudiantesTabla;
