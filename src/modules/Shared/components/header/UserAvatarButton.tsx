import React from 'react';
import { Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import IconButtonWithTooltip from './IconButtonWithTooltip';

interface UserAvatarButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  avatarColor?: string;
  avatarSize?: number;
}

const UserAvatarButton: React.FC<UserAvatarButtonProps> = ({
  onClick,
  disabled = false,
  size = 'large',
  avatarColor = 'primary.light',
  avatarSize = 32,
}) => {
  return (
    <IconButtonWithTooltip
      tooltipTitle='Menú de usuario'
      size={size}
      aria-label='account of current user'
      aria-controls='menu-appbar'
      aria-haspopup='true'
      onClick={onClick}
      disabled={disabled}
      color='inherit'
    >
      <Avatar
        sx={{ width: avatarSize, height: avatarSize, bgcolor: avatarColor }}
      >
        <Person />
      </Avatar>
    </IconButtonWithTooltip>
  );
};

export default UserAvatarButton;
