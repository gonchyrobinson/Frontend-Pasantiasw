import React from 'react';
import { Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledNavButton = styled(Button, {
  shouldForwardProp: prop => !['component', 'to'].includes(prop as string),
})<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 500,
  borderRadius: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

interface NavButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ label, icon, onClick }) => {
  return (
    <Tooltip title={label} arrow>
      <StyledNavButton color='inherit' onClick={onClick} startIcon={icon}>
        {label}
      </StyledNavButton>
    </Tooltip>
  );
};

export default NavButton;
