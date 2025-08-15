import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CardTitle } from '../../../lib/components/StyledText';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  MobileToggleButtonStyled,
  CollapseButtonStyled,
  HeaderContainerStyled,
} from './StyledComponents';

// Generic components with custom logic

interface MobileToggleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const MobileToggleButton: React.FC<MobileToggleButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <MobileToggleButtonStyled onClick={onClick}>
      {children}
    </MobileToggleButtonStyled>
  );
};

interface CollapseButtonProps {
  isCollapsed: boolean;
  onClick: () => void;
}

export const CollapseButton: React.FC<CollapseButtonProps> = ({
  isCollapsed,
  onClick,
}) => {
  return (
    <CollapseButtonStyled onClick={onClick} size='small'>
      {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
    </CollapseButtonStyled>
  );
};

interface SidebarHeaderProps {
  isCollapsed: boolean;
  isMobile: boolean;
  onToggleCollapse: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  isMobile,
  onToggleCollapse,
}) => {
  return (
    <HeaderContainerStyled>
      {!isCollapsed && (
        <CardTitle component='div'>Sistema de Pasantías</CardTitle>
      )}
      {!isMobile && (
        <CollapseButton isCollapsed={isCollapsed} onClick={onToggleCollapse} />
      )}
    </HeaderContainerStyled>
  );
};

interface SidebarMenuItemProps {
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  icon,
  text,
  isCollapsed,
  isSelected,
  onClick,
}) => {
  return (
    <ListItemButton
      onClick={onClick}
      selected={isSelected}
      sx={{
        minHeight: 48,
        justifyContent: isCollapsed ? 'center' : 'initial',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isCollapsed ? 0 : 3,
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      {!isCollapsed && <ListItemText primary={text} />}
    </ListItemButton>
  );
};
