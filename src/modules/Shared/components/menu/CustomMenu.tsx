import React from 'react';
import { Menu, MenuProps } from '@mui/material';

interface CustomMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: React.ReactNode;
  id?: string;
  PaperProps?: MenuProps['PaperProps'];
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  anchorEl,
  onClose,
  children,
  ...menuProps
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: { minWidth: 200 },
      }}
      {...menuProps}
    >
      {children}
    </Menu>
  );
};

export default CustomMenu;
