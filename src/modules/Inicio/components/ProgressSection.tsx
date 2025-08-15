import { LinearProgress, Stack } from '@mui/material';
import React from 'react';
import { ProgressSectionProps } from '../types';
import {
  ContenedorProgreso,
  TituloProgreso,
  ItemProgreso,
} from './ComponentesGenericos';
import { BoxFlexBetweenStyled } from './StyledComponents';
import { SectionContainer } from '../../../lib/components/StyledContainers';

const ProgressSection: React.FC<ProgressSectionProps> = ({ title, items }) => {
  return (
    <ContenedorProgreso>
      <TituloProgreso>{title}</TituloProgreso>
      <Stack spacing={2}>
        {items.map((item, index) => (
          <SectionContainer key={index}>
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
          </SectionContainer>
        ))}
      </Stack>
    </ContenedorProgreso>
  );
};

export default ProgressSection;
