import React from 'react';
import {
  MainContainer,
  SectionContainer,
} from '../../lib/components/StyledContainers';
import { PageTitle, Subtitle } from '../../lib/components/StyledText';

const Reportes: React.FC = () => {
  return (
    <MainContainer>
      <SectionContainer>
        <PageTitle component='h1' gutterBottom>
          Reportes y Estadísticas
        </PageTitle>
        <Subtitle>
          Módulo para generar reportes y visualizar estadísticas.
        </Subtitle>
      </SectionContainer>
    </MainContainer>
  );
};

export default Reportes;
