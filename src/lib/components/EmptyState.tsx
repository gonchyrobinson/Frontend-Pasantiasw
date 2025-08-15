import React from 'react';
import { Box } from '@mui/material';
import { Section } from './Section';
import { CardTitle, Subtitle } from './StyledText';

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
        <CardTitle color='text.secondary' gutterBottom>
          {title}
        </CardTitle>
        {subtitle && <Subtitle sx={{ mb: 2 }}>{subtitle}</Subtitle>}
        {action && <Box sx={{ mt: 2 }}>{action}</Box>}
      </Box>
    </Section>
  );
};
