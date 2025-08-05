import React from 'react';
import { Badge, BadgeProps } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import IconButtonWithTooltip from './IconButtonWithTooltip';

interface NotificationButtonProps {
  count?: number;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  color?: BadgeProps['color'];
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  count = 0,
  onClick,
  disabled = false,
  color = 'error',
}) => {
  return (
    <IconButtonWithTooltip
      tooltipTitle='Notificaciones'
      color='inherit'
      onClick={onClick}
      disabled={disabled}
      aria-label='notifications'
    >
      <Badge badgeContent={count} color={color}>
        <Notifications />
      </Badge>
    </IconButtonWithTooltip>
  );
};

export default NotificationButton;
