import React from 'react';
import { WelcomeSectionProps } from '../types';
import {
  ContenedorBienvenida,
  TituloBienvenida,
  SubtituloBienvenida,
} from './ComponentesGenericos';
import { Chip } from '@mui/material';

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
      <Chip
        label={statusLabel}
        color={statusColor}
        size='small'
        sx={{ marginTop: 2 }}
      />
    </ContenedorBienvenida>
  );
};

export default WelcomeSection;
