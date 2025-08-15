import React from 'react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import { CardTitle } from '../../../lib/components/StyledText';
import { ContenedorHeaderStyled } from '../../../lib/components/StyledComponents';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

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
    <IconButton
      onClick={onClick}
      sx={{
        position: 'fixed',
        top: 16,
        left: 16,
        zIndex: theme => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        boxShadow: 2,
        '&:hover': {
          backgroundColor: 'background.paper',
        },
      }}
    >
      {children}
    </IconButton>
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
    <IconButton onClick={onClick} size='small'>
      {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
    </IconButton>
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
    <ContenedorHeaderStyled sx={{ padding: 2, marginBottom: 0 }}>
      {!isCollapsed && (
        <CardTitle component='div'>Sistema de Pasantías</CardTitle>
      )}
      {!isMobile && (
        <CollapseButton isCollapsed={isCollapsed} onClick={onToggleCollapse} />
      )}
    </ContenedorHeaderStyled>
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
