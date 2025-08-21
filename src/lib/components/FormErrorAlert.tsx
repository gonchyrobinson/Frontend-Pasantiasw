import React, { useEffect, useRef } from 'react';
import { Alert, AlertProps } from '@mui/material';

interface FormErrorAlertProps extends AlertProps {
  message: string;
  autoFocus?: boolean;
}

const FormErrorAlert: React.FC<FormErrorAlertProps> = ({
  message,
  autoFocus = true,
  sx,
  ...props
}) => {
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus && alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      alertRef.current.focus();
    }
  }, [autoFocus]);

  if (!message) return null;

  return (
    <Alert
      ref={alertRef}
      severity='error'
      sx={{
        mb: 2,
        fontSize: '1.1rem',
        fontWeight: 'bold',
        border: '2px solid red',
        animation: 'shake 0.5s',
        '@keyframes shake': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
          '100%': { transform: 'translateX(0)' },
        },
        ...sx,
      }}
      {...props}
    >
      {message}
    </Alert>
  );
};

export default FormErrorAlert;
