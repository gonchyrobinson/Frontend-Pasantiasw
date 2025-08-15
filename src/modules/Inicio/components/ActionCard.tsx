import { Add, ArrowForward, TouchApp } from '@mui/icons-material';
import React from 'react';
import { ActionCardProps } from '../types';
import {
  ActionCardContainer,
  IconoEstadistica,
  TituloAccion,
  DescripcionAccion,
  BotonAccion,
} from './ComponentesGenericos';
import { CardContent, Box } from '@mui/material';

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
}) => {
  return (
    <ActionCardContainer
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': onClick
          ? {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              '& .action-indicator': {
                opacity: 1,
                transform: 'translateX(0)',
              },
              '& .action-arrow': {
                transform: 'translateX(4px)',
              },
            }
          : {},
        '&::before': onClick
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(90deg, ${color}.main, ${color}.light)`,
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }
          : {},
        '&:hover::before': onClick
          ? {
              opacity: 1,
            }
          : {},
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <IconoEstadistica color={color} bgColor={color}>
            {icon}
          </IconoEstadistica>
          <TituloAccion>{title}</TituloAccion>
        </Box>
        <DescripcionAccion>{description}</DescripcionAccion>
        <BotonAccion _icon={<Add />}>
          {title}
          {onClick && (
            <ArrowForward
              className='action-arrow'
              fontSize='small'
              sx={{
                ml: 1,
                transition: 'transform 0.2s ease',
              }}
            />
          )}
        </BotonAccion>

        {onClick && (
          <div
            className='action-indicator'
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              opacity: 0,
              transform: 'translateX(-10px)',
              transition: 'all 0.3s ease',
            }}
          >
            <TouchApp fontSize='small' color='action' sx={{ opacity: 0.7 }} />
          </div>
        )}
      </CardContent>
    </ActionCardContainer>
  );
};

export default ActionCard;
