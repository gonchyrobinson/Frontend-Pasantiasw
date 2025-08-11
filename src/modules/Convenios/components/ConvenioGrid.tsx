import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { Warning, Business } from '@mui/icons-material';
import { ConvenioEmpresaDto } from '../types';
import { Grids, GridsProps } from '../../../lib/ElementCardGenerica';
import {
  getConvenioMetadata,
  getConvenioCardTitle,
  getConvenioCardSubtitle,
} from '../helpers/convenioHelpers';

interface ConvenioGridProps {
  convenios: ConvenioEmpresaDto[];
  loading: boolean;
  onEdit: (convenio: ConvenioEmpresaDto) => void;
  onDelete: (convenio: ConvenioEmpresaDto) => void;
  onCaducar: (convenio: ConvenioEmpresaDto) => void;
  onAsignarEmpresa: (convenio: ConvenioEmpresaDto) => void;
}

const ConvenioGrid: React.FC<ConvenioGridProps> = ({
  convenios,
  loading,
  onEdit,
  onDelete,
  onCaducar,
  onAsignarEmpresa,
}) => {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <CircularProgress size={40} />
          </Grid>
        ))}
      </Grid>
    );
  }

  const metadata = getConvenioMetadata();

  const gridsData: GridsProps<ConvenioEmpresaDto> = {
    items: convenios,
    metadata,
    getCardTitle: getConvenioCardTitle,
    getCardSubtitle: getConvenioCardSubtitle,
    onItemEdit: onEdit,
    onItemDelete: onDelete,
    getExtraButtons: (convenio: ConvenioEmpresaDto) => [
      {
        label: 'Caducar',
        onClick: () => onCaducar(convenio),
        color: 'warning' as const,
        variant: 'outlined' as const,
        icon: <Warning />,
      },
      {
        label: 'Asignar Empresa',
        onClick: () => onAsignarEmpresa(convenio),
        color: 'info' as const,
        variant: 'outlined' as const,
        icon: <Business />,
      },
    ],
    emptyStateTitle: 'No se encontraron convenios',
    emptyStateText: 'No hay convenios para mostrar en este momento.',
  };

  return <Grids {...gridsData} />;
};

export default ConvenioGrid;
