import {
  GitHub,
  LinkedIn,
  Twitter,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';
import {
  Box,
  Typography,
  Container,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

// Styled components
const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  marginTop: 'auto',
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
  },
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer: React.FC = () => {
  return (
    <StyledFooter component='footer'>
      <FooterContent maxWidth='lg'>
        <FooterSection>
          <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
            Sistema de Gestión de Pasantías
          </Typography>
          <Typography
            variant='body2'
            sx={{ opacity: 0.8, textAlign: 'center' }}
          >
            Secretaría de Bienestar Estudiantil
          </Typography>
          <ContactInfo>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Email fontSize='small' />
              <StyledLink href='mailto:contacto@universidad.edu'>
                contacto@universidad.edu
              </StyledLink>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Phone fontSize='small' />
              <StyledLink href='tel:+1234567890'>+1 (234) 567-890</StyledLink>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOn fontSize='small' />
              <Typography variant='body2' sx={{ opacity: 0.8 }}>
                Campus Universitario, Edificio Central
              </Typography>
            </Box>
          </ContactInfo>
        </FooterSection>

        <Divider
          orientation='vertical'
          flexItem
          sx={{ display: { xs: 'none', md: 'block' } }}
        />

        <FooterSection>
          <Typography
            variant='body2'
            sx={{ opacity: 0.8, textAlign: 'center' }}
          >
            &copy; 2025 Sistema de Gestión de Pasantías
          </Typography>
          <Typography
            variant='caption'
            sx={{ opacity: 0.7, textAlign: 'center' }}
          >
            Desarrollado con React, TypeScript y Material-UI
          </Typography>
          <SocialLinks>
            <IconButton
              size='small'
              color='inherit'
              href='https://github.com'
              target='_blank'
              aria-label='GitHub'
            >
              <GitHub fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              color='inherit'
              href='https://linkedin.com'
              target='_blank'
              aria-label='LinkedIn'
            >
              <LinkedIn fontSize='small' />
            </IconButton>
            <IconButton
              size='small'
              color='inherit'
              href='https://twitter.com'
              target='_blank'
              aria-label='Twitter'
            >
              <Twitter fontSize='small' />
            </IconButton>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
