import React from 'react';
import { IconButton, Tooltip, Button } from '@mui/material';
import { FlexContainer } from './StyledContainers';
import { Refresh, Add } from '@mui/icons-material';
import { PageTitle, Subtitle } from './StyledText';

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
    <FlexContainer
      sx={{
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        mb: 4,
      }}
    >
      <FlexContainer sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <PageTitle component='h1' gutterBottom>
          {title}
        </PageTitle>
        <Subtitle>{subtitle}</Subtitle>
      </FlexContainer>
      <FlexContainer sx={{ gap: 1 }}>
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
      </FlexContainer>
    </FlexContainer>
  );
};
