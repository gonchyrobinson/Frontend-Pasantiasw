import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Fab,
  Tooltip,
} from '@mui/material';
import { BodyText } from '../../../lib/components/StyledText';
import { Add } from '@mui/icons-material';

export { ConvenioStats, ConvenioFilters } from './genericos';

// Componente de diálogo de confirmación - Componente presentacional simple
export const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  severity = 'warning',
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  severity?: 'warning' | 'error' | 'info';
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth='sm' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <BodyText>{message}</BodyText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button
          onClick={onConfirm}
          color={
            severity === 'error'
              ? 'error'
              : severity === 'warning'
                ? 'warning'
                : 'primary'
          }
          variant='contained'
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Componente de botón flotante - Componente presentacional simple
export const FloatingActionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Tooltip title='Crear nuevo convenio'>
      <Fab
        color='primary'
        aria-label='add'
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Add />
      </Fab>
    </Tooltip>
  );
};
