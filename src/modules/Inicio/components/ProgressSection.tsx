import { LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { ProgressSectionProps } from '../types';
import {
  ContenedorProgreso,
  TituloProgreso,
  ItemProgreso,
} from './ComponentesGenericos';
import { Box } from '@mui/material';
import { SectionContainer } from '../../../lib/components/StyledContainers';

const ProgressSection: React.FC<ProgressSectionProps> = ({ title, items }) => {
  return (
    <ContenedorProgreso>
      <TituloProgreso>{title}</TituloProgreso>
      <Stack spacing={2}>
        {items.map((item, index) => (
          <SectionContainer key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
            >
              <ItemProgreso
                label={item.label}
                value={item.value}
                color={item.color}
              />
            </Box>
            <LinearProgress
              variant='determinate'
              value={item.value}
              color={item.color || 'primary'}
            />
          </SectionContainer>
        ))}
      </Stack>
    </ContenedorProgreso>
  );
};

export default ProgressSection;
