import { styled } from '@mui/material/styles';
import { SectionContainer } from './StyledContainers';

// Styled components with sx properties
export const ItemDetailsBoxStyled = styled(SectionContainer)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[300]}`,
}));
