import React from 'react';
import { Divider } from '@mui/material';
import { SectionContainer } from './StyledContainers';
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
    <SectionContainer sx={{ mb: 3 }}>
      {title && (
        <SectionContainer component='h2' sx={{ m: 0, p: 0 }}>
          {variant === 'detailed' ? (
            <SectionTitle>{title}</SectionTitle>
          ) : variant === 'compact' ? (
            <CardTitle>{title}</CardTitle>
          ) : (
            <SectionTitle>{title}</SectionTitle>
          )}
        </SectionContainer>
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
    </SectionContainer>
  );
};
