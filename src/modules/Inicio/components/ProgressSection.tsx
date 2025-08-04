import { Box, LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { ProgressSectionProps } from '../types';
import {
  ContenedorProgreso,
  TituloProgreso,
  ItemProgreso,
} from './ComponentesGenericos';
import { BoxFlexBetweenStyled } from './StyledComponents';

const ProgressSection: React.FC<ProgressSectionProps> = ({ title, items }) => {
  return (
    <ContenedorProgreso>
      <TituloProgreso>{title}</TituloProgreso>
      <Stack spacing={2}>
        {items.map((item, index) => (
          <Box key={index}>
            <BoxFlexBetweenStyled>
              <ItemProgreso
                label={item.label}
                value={item.value}
                color={item.color}
              />
            </BoxFlexBetweenStyled>
            <LinearProgress
              variant='determinate'
              value={item.value}
              color={item.color || 'primary'}
            />
          </Box>
        ))}
      </Stack>
    </ContenedorProgreso>
  );
};

export default ProgressSection;
