import React from 'react';
import { Box, Typography } from '@mui/material';

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
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {loadingMessage}
        </Typography>
      </Box>
    );
  }

  if (!hasSearched) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {emptyStateTitle}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {emptyStateText}
        </Typography>
      </Box>
    );
  }

  if (searchResults.length === 0) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant='h6' color='text.secondary' gutterBottom>
          {noResultsTitle}
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {noResultsText}
        </Typography>
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
