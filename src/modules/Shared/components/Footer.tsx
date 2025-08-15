import {
  MainContainer,
  CenteredContainer,
} from '../../../lib/components/StyledContainers';
import { BodyText } from '../../../lib/components/StyledText';

const Footer = () => {
  return (
    <MainContainer
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <CenteredContainer sx={{ textAlign: 'center' }}>
        <BodyText color='text.secondary' align='center'>
          © {new Date().getFullYear()} Sistema de Pasantías. Todos los derechos
          reservados.
        </BodyText>
      </CenteredContainer>
    </MainContainer>
  );
};

export default Footer;
