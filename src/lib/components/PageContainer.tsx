import React from 'react';
import { Container, ContainerProps } from '@mui/material';

export const PageContainer: React.FC<ContainerProps> = props => {
  return <Container maxWidth='lg' sx={{ py: 3 }} {...props} />;
};
