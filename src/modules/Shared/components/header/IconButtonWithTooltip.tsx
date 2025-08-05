import React from 'react';
import { IconButton, Tooltip, IconButtonProps } from '@mui/material';

interface IconButtonWithTooltipProps extends IconButtonProps {
  tooltipTitle: string;
  children: React.ReactNode;
}

const IconButtonWithTooltip: React.FC<IconButtonWithTooltipProps> = ({
  tooltipTitle,
  children,
  ...iconButtonProps
}) => {
  return (
    <Tooltip title={tooltipTitle} arrow>
      <IconButton {...iconButtonProps}>{children}</IconButton>
    </Tooltip>
  );
};

export default IconButtonWithTooltip;
