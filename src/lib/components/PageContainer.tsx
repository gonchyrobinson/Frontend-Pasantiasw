import React from 'react';
import { MainContainer } from './StyledContainers';
import type { ContainerProps } from '@mui/material';

export const PageContainer: React.FC<ContainerProps> = props => {
  return <MainContainer maxWidth='lg' sx={{ py: 3 }} {...props} />;
};
