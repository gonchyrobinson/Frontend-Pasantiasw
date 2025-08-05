import { styled } from '@mui/material/styles';
import { IconButton, Box } from '@mui/material';

// Styled components with sx properties
export const MobileToggleButtonStyled = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: 16,
  left: 16,
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const CollapseButtonStyled = styled(IconButton)(() => ({
  // size is handled as a prop, not in styled component
}));

export const HeaderContainerStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
