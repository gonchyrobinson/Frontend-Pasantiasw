import React from 'react';
import { CardTitle, BodyText } from '../../components/StyledText';
import { SectionContainer } from '../../components/StyledContainers';

export interface SearchableContentProps {
  hasSearched: boolean;
  searchResults: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  isLoading?: boolean;
  isRefreshing?: boolean;
  emptyStateTitle: string;
  emptyStateText: string;
  noResultsTitle: string;
  noResultsText: string;
  loadingMessage: string;
  children: React.ReactNode;
  statsComponent?: React.ReactNode;
}

const SearchableContent: React.FC<SearchableContentProps> = ({
  hasSearched,
  searchResults,
  isLoading = false,
  isRefreshing = false,
  emptyStateTitle,
  emptyStateText,
  noResultsTitle,
  noResultsText,
  loadingMessage,
  children,
  statsComponent,
}) => {
  if (isLoading || isRefreshing) {
    return (
      <SectionContainer sx={{ py: 4 }}>
        <CardTitle color='text.secondary' gutterBottom>
          {loadingMessage}
        </CardTitle>
      </SectionContainer>
    );
  }

  if (!hasSearched) {
    return (
      <SectionContainer sx={{ py: 8, textAlign: 'center' }}>
        <CardTitle color='text.secondary' gutterBottom>
          {emptyStateTitle}
        </CardTitle>
        <BodyText color='text.secondary'>{emptyStateText}</BodyText>
      </SectionContainer>
    );
  }

  if (searchResults.length === 0) {
    return (
      <SectionContainer sx={{ py: 8, textAlign: 'center' }}>
        <CardTitle color='text.secondary' gutterBottom>
          {noResultsTitle}
        </CardTitle>
        <BodyText color='text.secondary'>{noResultsText}</BodyText>
      </SectionContainer>
    );
  }

  return (
    <>
      {statsComponent}
      {children}
    </>
  );
};

export default SearchableContent;
