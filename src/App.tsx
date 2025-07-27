import React from 'react';
import AppRoutes from './routes/AppRoutes';
import ThemeProvider from './contexts/ThemeProvider';
import QueryProvider from './contexts/QueryProvider';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
