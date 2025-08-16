import React from 'react';
import { Chip } from '@mui/material';
import {
  ContenedorBienvenida,
  SubtituloBienvenida,
  TituloBienvenida,
} from './ComponentesGenericos';

interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  statusLabel?: string;
  statusColor?: 'success' | 'error' | 'warning' | 'info';
}

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
