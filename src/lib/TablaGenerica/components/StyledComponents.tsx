import { styled } from '@mui/material/styles';
import {
  SectionContainer,
  CardContainer,
} from '../../components/StyledContainers';

export const TablaContainerStyled = styled(SectionContainer)(() => ({
  height: '600px',
  width: '100%',
}));

export const TablaHeaderStyled = styled(SectionContainer)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const TablaWrapperStyled = styled(CardContainer)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export const EmptyStateStyled = styled(CardContainer)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
}));
