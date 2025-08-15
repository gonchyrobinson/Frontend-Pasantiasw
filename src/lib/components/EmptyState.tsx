import React from 'react';
import { CenteredContainer } from './StyledContainers';
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
      <CenteredContainer sx={{ textAlign: 'center', py: 4 }}>
        {icon && (
          <CenteredContainer sx={{ mb: 2, justifyContent: 'center' }}>
            {icon}
          </CenteredContainer>
        )}
        <CardTitle color='text.secondary' gutterBottom>
          {title}
        </CardTitle>
        {subtitle && <Subtitle sx={{ mb: 2 }}>{subtitle}</Subtitle>}
        {action && (
          <CenteredContainer sx={{ mt: 2 }}>{action}</CenteredContainer>
        )}
      </CenteredContainer>
    </Section>
  );
};
