import { styled } from '@mui/material/styles';
import React from 'react';
import { Box } from '@mui/material';

import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

// Styled components
const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  minHeight: 'calc(100vh - 64px)', // Adjust for header height
  overflow: 'auto',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
    minHeight: 'calc(100vh - 56px)', // Smaller header on mobile
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <ContentArea component='main'>{children}</ContentArea>
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
