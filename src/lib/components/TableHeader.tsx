import React from 'react';
import { Box, Divider } from '@mui/material';
import { SectionTitle, CardTitle, Subtitle } from './StyledText';

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

  return (
    <Box sx={{ mb: 3 }}>
      {title && (
        <Box component='h2' sx={{ m: 0, p: 0 }}>
          {variant === 'detailed' ? (
            <SectionTitle>{title}</SectionTitle>
          ) : variant === 'compact' ? (
            <CardTitle>{title}</CardTitle>
          ) : (
            <SectionTitle>{title}</SectionTitle>
          )}
        </Box>
      )}
      {subtitle && (
        <Subtitle
          sx={{
            lineHeight: variant === 'compact' ? 1.2 : 1.5,
          }}
        >
          {subtitle}
        </Subtitle>
      )}
      {children}
      {showDivider && (title || subtitle || children) && (
        <Divider sx={{ mt: 2, mb: 1 }} />
      )}
    </Box>
  );
};
