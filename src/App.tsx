import React from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import QueryProvider from './contexts/QueryProvider';
import ThemeProvider from './contexts/ThemeProvider';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <div className='App'>
            <AppRoutes />
          </div>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
