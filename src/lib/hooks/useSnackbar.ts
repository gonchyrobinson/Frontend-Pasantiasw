import { useState, useCallback } from 'react';
import { AlertColor } from '@mui/material';

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = useCallback(
    (message: string, severity: AlertColor = 'success') => {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const showSuccess = useCallback(
    (message: string) => {
      showSnackbar(message, 'success');
    },
    [showSnackbar]
  );

  const showError = useCallback(
    (message: string) => {
      showSnackbar(message, 'error');
    },
    [showSnackbar]
  );

  const showWarning = useCallback(
    (message: string) => {
      showSnackbar(message, 'warning');
    },
    [showSnackbar]
  );

  const showInfo = useCallback(
    (message: string) => {
      showSnackbar(message, 'info');
    },
    [showSnackbar]
  );

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
