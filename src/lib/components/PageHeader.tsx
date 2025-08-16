import React from 'react';
import { FlexContainer } from './StyledContainers';
import { PageTitle, Subtitle } from './StyledText';
import { RefreshButton, CreateButton } from './StyledButtons';

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
          <RefreshButton onClick={onRefresh} loading={isRefreshing} />
        )}
        {onAction && (
          <CreateButton onClick={onAction}>{actionButtonText}</CreateButton>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};
