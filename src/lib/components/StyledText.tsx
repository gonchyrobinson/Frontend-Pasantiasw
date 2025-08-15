import { Typography, TypographyProps, styled } from '@mui/material';

// 1. Page Title - Large, bold title for main page headers
export const PageTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '2.125rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

// 2. Section Title - Medium title for section headers
export const SectionTitle = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  })
);

// 3. Card Title - Title for cards and smaller sections
export const CardTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

// 4. Subtitle - Secondary text below titles
export const Subtitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

// 5. Body Text - Standard paragraph text
export const BodyText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  lineHeight: 1.5,
}));

// 6. Caption Text - Small text for captions and metadata
export const CaptionText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.2,
}));

// 7. Stat Value - Large text for displaying statistics and numbers
export const StatValue = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  textAlign: 'center',
}));

// 8. Warning Text - Text for warnings and important messages
export const WarningText = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.warning.main,
  fontWeight: 500,
}));

// Export the base Typography component as well for flexibility
export { Typography };
export type { TypographyProps };
