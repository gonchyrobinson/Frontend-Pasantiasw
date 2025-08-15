import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import {
  FlexContainer,
  CenteredContainer,
} from '../../../lib/components/StyledContainers';
import { SectionTitle } from '../../../lib/components/StyledText';

// Solo mantener componentes específicos de Estudiantes
export const TituloPrincipalStyled = styled(SectionTitle)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ContenedorIconoStyled = styled(CenteredContainer)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const ContenedorChipsStyled = styled(FlexContainer)(() => ({
  flexWrap: 'wrap',
}));

export const ContenedorFiltrosInfoStyled = styled(FlexContainer)(
  ({ theme }) => ({
    alignItems: 'center',
    gap: theme.spacing(2),
  })
);

// Botón específico de estudiantes
export const BotonNuevoEstudianteStyled = styled(Button)(() => ({
  marginLeft: 'auto',
}));
