import { Add } from '@mui/icons-material';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledActionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  marginBottom: theme.spacing(1),
}));

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
}) => {
  return (
    <StyledActionCard onClick={onClick}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StatIcon
            sx={{
              backgroundColor: `${color}.light`,
              color: `${color}.main`,
              mr: 2,
            }}
          >
            {icon}
          </StatIcon>
          <Typography variant='h6' component='h3'>
            {title}
          </Typography>
        </Box>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          variant='contained'
          startIcon={<Add />}
          fullWidth
          sx={{ textTransform: 'none' }}
        >
          {title}
        </Button>
      </CardContent>
    </StyledActionCard>
  );
};

export default ActionCard;
