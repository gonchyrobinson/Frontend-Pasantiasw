import React from 'react';
import { Typography, Box, IconButton, Tooltip, Button } from '@mui/material';
import { Refresh, Add } from '@mui/icons-material';

export interface PageHeaderProps {
  title: string;
  subtitle: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onAction?: () => void;
  actionButtonText?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  isRefreshing = false,
  onAction,
  actionButtonText = 'Nuevo',
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 4,
      }}
    >
      <Box>
        <Typography
          variant='h4'
          component='h1'
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {onRefresh && (
          <Tooltip title='Actualizar datos'>
            <IconButton
              onClick={onRefresh}
              disabled={isRefreshing}
              color='primary'
              size='large'
            >
              <Refresh
                sx={{
                  animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        )}
        {onAction && (
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={onAction}
            color='primary'
          >
            {actionButtonText}
          </Button>
        )}
      </Box>
    </Box>
  );
};
