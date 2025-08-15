import React from 'react';
import { Box } from '@mui/material';
import { CardTitle, BodyText } from '../../components/StyledText';

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
      <Box sx={{ py: 4 }}>
        <CardTitle color='text.secondary' gutterBottom>
          {loadingMessage}
        </CardTitle>
      </Box>
    );
  }

  if (!hasSearched) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <CardTitle color='text.secondary' gutterBottom>
          {emptyStateTitle}
        </CardTitle>
        <BodyText color='text.secondary'>{emptyStateText}</BodyText>
      </Box>
    );
  }

  if (searchResults.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <CardTitle color='text.secondary' gutterBottom>
          {noResultsTitle}
        </CardTitle>
        <BodyText color='text.secondary'>{noResultsText}</BodyText>
      </Box>
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
