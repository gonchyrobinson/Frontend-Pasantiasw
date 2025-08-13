import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface TableHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  showDivider?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  subtitle,
  children,
  showDivider = true,
  variant = 'default',
}) => {
  if (!title && !subtitle && !children) {
    return null;
  }

  const getTitleVariant = () => {
    switch (variant) {
      case 'compact':
        return 'h6';
      case 'detailed':
        return 'h4';
      default:
        return 'h5';
    }
  };

  const getSubtitleVariant = () => {
    switch (variant) {
      case 'compact':
        return 'caption';
      case 'detailed':
        return 'body1';
      default:
        return 'body2';
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {title && (
        <Typography
          variant={getTitleVariant()}
          component='h2'
          gutterBottom
          sx={{
            fontWeight: variant === 'detailed' ? 600 : 500,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant={getSubtitleVariant()}
          color='text.secondary'
          gutterBottom
          sx={{
            lineHeight: variant === 'compact' ? 1.2 : 1.5,
          }}
        >
          {subtitle}
        </Typography>
      )}
      {children}
      {showDivider && (title || subtitle || children) && (
        <Divider sx={{ mt: 2, mb: 1 }} />
      )}
    </Box>
  );
};
