import { Box, Typography, LinearProgress, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledProgressSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
}));

interface ProgressItem {
  label: string;
  value: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
}

interface ProgressSectionProps {
  title: string;
  items: ProgressItem[];
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ title, items }) => {
  return (
    <StyledProgressSection>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Stack spacing={2}>
        {items.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant='body2'>{item.label}</Typography>
              <Typography variant='body2' color={item.color || 'primary'}>
                {item.value}%
              </Typography>
            </Box>
            <LinearProgress
              variant='determinate'
              value={item.value}
              color={item.color || 'primary'}
            />
          </Box>
        ))}
      </Stack>
    </StyledProgressSection>
  );
};

export default ProgressSection;
