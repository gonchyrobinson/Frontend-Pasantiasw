import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledWelcomeSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.spacing(2),
  textAlign: 'center',
}));

interface WelcomeSectionProps {
  title: string;
  subtitle: string;
  statusLabel?: string;
  statusColor?: 'success' | 'error' | 'warning' | 'info';
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title,
  subtitle,
  statusLabel = 'Sistema Activo',
  statusColor = 'success',
}) => {
  return (
    <StyledWelcomeSection>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
        {subtitle}
      </Typography>
      <Chip 
        label={statusLabel} 
        color={statusColor} 
        size="small" 
        sx={{ mt: 2 }}
      />
    </StyledWelcomeSection>
  );
};

export default WelcomeSection; 