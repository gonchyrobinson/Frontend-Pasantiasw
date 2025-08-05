import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { SnackbarState } from '../../../hooks/useSnackbar';

interface PersonalizedSnackbarProps {
  snackbar: SnackbarState;
  onClose: () => void;
  autoHideDuration?: number;
}

const PersonalizedSnackbar: React.FC<PersonalizedSnackbarProps> = ({
  snackbar,
  onClose,
  autoHideDuration = 6000,
}) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default PersonalizedSnackbar;
