import React from 'react';
import { MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { useNavigation } from '../../../../lib/hooks/useNavigation';

export interface MenuItemData {
  icon?: SvgIconComponent;
  primary?: string;
  secondary?: string;
  onClick?: () => void;
  path?: string;
  isDivider?: boolean;
  disabled?: boolean;
}

interface MenuElementProps extends MenuItemData {
  onClose?: () => void;
}

const MenuElement: React.FC<MenuElementProps> = ({
  icon: Icon,
  primary,
  secondary,
  onClick,
  path,
  isDivider = false,
  disabled = false,
  onClose,
}) => {
  const { navigate } = useNavigation();

  const handleClick = () => {
    onClick?.();
    if (path) {
      navigate(path);
    }
    onClose?.();
  };

  if (isDivider) {
    return <Divider />;
  }

  return (
    <MenuItem onClick={handleClick} disabled={disabled}>
      {Icon && (
        <ListItemIcon>
          <Icon fontSize='small' />
        </ListItemIcon>
      )}
      <ListItemText primary={primary} secondary={secondary} />
    </MenuItem>
  );
};

export default MenuElement;
