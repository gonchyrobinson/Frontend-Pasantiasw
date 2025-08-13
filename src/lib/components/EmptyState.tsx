import React from 'react';
import { Box, Typography } from '@mui/material';
import { Section } from './Section';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  icon,
  action,
}) => {
  return (
    <Section>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        {icon && (
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            {icon}
          </Box>
        )}
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        {action && <Box sx={{ mt: 2 }}>{action}</Box>}
      </Box>
    </Section>
  );
};
