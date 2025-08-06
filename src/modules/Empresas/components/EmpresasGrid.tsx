import React from 'react';
import { Grids, GridsProps } from '../../../ElementCardGenerica';
import { EmpresasGridProps, EmpresaDto } from '../types';
import {
  getEmpresaMetadata,
  getEmpresaCardTitle,
  getEmpresaCardSubtitle,
} from '../helpers/empresaHelpers';

const EmpresasGrid: React.FC<EmpresasGridProps> = ({
  empresas,
  onEmpresaClick,
  onEmpresaEdit,
  onEmpresaDelete,
}) => {
  const metadata = getEmpresaMetadata();

  const gridsData: GridsProps<EmpresaDto> = {
    items: empresas,
    metadata,
    getCardTitle: getEmpresaCardTitle,
    getCardSubtitle: getEmpresaCardSubtitle,
    onItemClick: onEmpresaClick,
    onItemEdit: onEmpresaEdit,
    onItemDelete: onEmpresaDelete,
    emptyStateTitle: 'No se encontraron empresas',
    emptyStateText: 'No hay empresas para mostrar en este momento.',
  };

  return <Grids {...gridsData} />;
};

export default EmpresasGrid;
