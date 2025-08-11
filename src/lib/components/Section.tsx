import React from 'react';
import { Paper, PaperProps, styled } from '@mui/material';

const StyledSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

export const Section: React.FC<PaperProps> = ({ children, ...props }) => {
  return (
    <StyledSection elevation={0} variant='outlined' {...props}>
      {children}
    </StyledSection>
  );
};
