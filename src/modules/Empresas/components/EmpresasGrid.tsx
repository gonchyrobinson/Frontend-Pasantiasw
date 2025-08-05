import React from 'react';
import { ElementCard } from '../../../ElementCardGenerica';
import { EmpresaDto } from '../types';
import {
  getEmpresaMetadata,
  getEmpresaCardTitle,
  getEmpresaCardSubtitle,
} from '../helpers/empresaHelpers';
import { EmptyStateStyled } from './StyledComponents';
import {
  TituloSecundario,
  TextoPrincipal,
  ContenedorGrid,
  ItemGrid,
} from './ComponentesPersonalizados';

interface EmpresasGridProps {
  empresas: EmpresaDto[];
  onEmpresaClick?: (empresa: EmpresaDto) => void;
  onEmpresaEdit?: (empresa: EmpresaDto) => void;
  onEmpresaDelete?: (empresa: EmpresaDto) => void;
}

const EmpresasGrid: React.FC<EmpresasGridProps> = ({
  empresas,
  onEmpresaClick,
  onEmpresaEdit,
  onEmpresaDelete,
}) => {
  const metadata = getEmpresaMetadata();

  if (empresas.length === 0) {
    return (
      <EmptyStateStyled>
        <TituloSecundario>No se encontraron empresas</TituloSecundario>
        <TextoPrincipal>
          No hay empresas para mostrar en este momento.
        </TextoPrincipal>
      </EmptyStateStyled>
    );
  }

  return (
    <ContenedorGrid>
      {empresas.map(empresa => (
        <ItemGrid xs={12} sm={6} md={4} lg={3} key={empresa.idEmpresa}>
          <ElementCard
            metadata={metadata}
            data={empresa as unknown as Record<string, unknown>}
            title={getEmpresaCardTitle(empresa)}
            subtitle={getEmpresaCardSubtitle(empresa)}
            onClick={onEmpresaClick ? () => onEmpresaClick(empresa) : undefined}
            onClickEdit={
              onEmpresaEdit ? () => onEmpresaEdit(empresa) : undefined
            }
            onClickEliminar={
              onEmpresaDelete ? () => onEmpresaDelete(empresa) : undefined
            }
          />
        </ItemGrid>
      ))}
    </ContenedorGrid>
  );
};

export default EmpresasGrid;
