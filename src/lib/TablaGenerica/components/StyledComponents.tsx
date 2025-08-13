import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const TablaContainerStyled = styled(Box)(() => ({
  height: '600px',
  width: '100%',
}));

export const TablaHeaderStyled = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const TablaWrapperStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export const EmptyStateStyled = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
}));
