import React from 'react';
import { WelcomeSectionProps } from '../types';
import {
  ContenedorBienvenida,
  TituloBienvenida,
  SubtituloBienvenida,
} from './ComponentesGenericos';
import { ChipStyled } from './StyledComponents';

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title,
  subtitle,
  statusLabel = 'Sistema Activo',
  statusColor = 'success',
}) => {
  return (
    <ContenedorBienvenida>
      <TituloBienvenida>{title}</TituloBienvenida>
      <SubtituloBienvenida>{subtitle}</SubtituloBienvenida>
      <ChipStyled label={statusLabel} color={statusColor} size='small' />
    </ContenedorBienvenida>
  );
};

export default WelcomeSection;
