import {
  Box,
  Grid,
  Container,
  Paper,
  Card,
  CardContent,
  styled,
} from '@mui/material';
import type {
  BoxProps,
  GridProps,
  ContainerProps,
  PaperProps,
  CardProps,
  CardContentProps,
} from '@mui/material';

// 1. Main Container - Large container for main page content
export const MainContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  maxWidth: 'lg',
}));

// 2. Section Container - Container for sections with padding and margin
export const SectionContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

// 3. Card Container - Paper-based container for card-like content
export const CardContainer = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

// 4. Flex Container - Box with flexbox layout
export const FlexContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

// 5. Grid Container - Responsive grid layout
export const GridContainer = styled(Grid)<GridProps>(({ theme }) => ({
  gap: theme.spacing(3),
}));

// 5.1. Grid Layout Container - Grid container with proper spacing
export const GridLayoutContainer = styled(Grid)<GridProps>(() => ({
  // No additional styles needed, MUI Grid handles it
}));

// 5.2. Field Container - Container for individual display fields
export const FieldContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
}));

// 5.3. Display Section Card - Complete card for display sections
export const DisplaySectionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiCardActions-root': {
    backgroundColor: theme.palette.grey[50],
    justifyContent: 'space-between',
  },
}));

// 5.4. Status Badge Container - Container for status badges with conditional styling
export const StatusBadgeContainer = styled(Box)<
  BoxProps & { success?: boolean }
>(({ theme, success }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  fontWeight: 600,
  backgroundColor: success
    ? theme.palette.success.light
    : theme.palette.warning.light,
  color: success ? theme.palette.success.dark : theme.palette.warning.dark,
  border: `1px solid ${success ? theme.palette.success.main : theme.palette.warning.main}`,
  display: 'inline-block',
}));

// 6. Centered Container - Box centered both horizontally and vertically
export const CenteredContainer = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '200px',
  flexDirection: 'column',
}));

// 7. Form Container - Container optimized for forms
export const FormContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

// 8. Action Container - Container for action buttons and controls
export const ActionContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'center',
  marginTop: theme.spacing(1),
  paddingTop: theme.spacing(1),
  alignItems: 'center',
}));

// 9. Content Container - Container for main content areas
export const ContentContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

// 10. Dialog Container - Container optimized for dialog content
export const DialogContainer = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(2),
  minWidth: '400px',
}));

// Export base components for flexibility
export { Box, Grid, Container, Paper, Card, CardContent };
export type {
  BoxProps,
  GridProps,
  ContainerProps,
  PaperProps,
  CardProps,
  CardContentProps,
};
