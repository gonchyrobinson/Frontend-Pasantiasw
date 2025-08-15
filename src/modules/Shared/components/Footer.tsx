import { Box, Container } from '@mui/material';
import { BodyText } from '../../../lib/components/StyledText';

const Footer = () => {
  return (
    <Box
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
      <Container maxWidth='sm'>
        <BodyText color='text.secondary' align='center'>
          © {new Date().getFullYear()} Sistema de Pasantías. Todos los derechos
          reservados.
        </BodyText>
      </Container>
    </Box>
  );
};

export default Footer;
