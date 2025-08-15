import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { ItemDetailsBoxStyled } from './StyledComponents';
import { BodyText, CardTitle, WarningText } from '../lib/components/StyledText';

interface DeleteConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  itemName: string;
  itemDetails?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  title,
  message,
  itemName,
  itemDetails,
  onClose,
  onConfirm,
  isDeleting,
  confirmButtonText = 'Eliminar',
  cancelButtonText = 'Cancelar',
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Warning color='warning' />
        {title}
      </DialogTitle>

      <DialogContent>
        <BodyText sx={{ mb: 2 }}>{message}</BodyText>

        <ItemDetailsBoxStyled>
          <CardTitle gutterBottom>{itemName}</CardTitle>
          {itemDetails}
        </ItemDetailsBoxStyled>

        <WarningText sx={{ mt: 2 }}>
          ⚠️ Esta acción no se puede deshacer.
        </WarningText>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isDeleting} variant='outlined'>
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isDeleting}
          variant='contained'
          color='error'
          startIcon={isDeleting ? <CircularProgress size={16} /> : undefined}
        >
          {isDeleting ? 'Eliminando...' : confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
