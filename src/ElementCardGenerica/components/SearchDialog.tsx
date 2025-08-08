import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { ClearAll } from '@mui/icons-material';
import AdvancedSearchForm from './AdvancedSearchForm';
import { AdvancedSearchFormProps } from '../types';

export interface SearchDialogProps {
  title: string;
  buttonText: string;
  metadata: AdvancedSearchFormProps['metadata'];
  onSubmit: (filters: Record<string, any>) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClearResults?: () => void;
  hasResults?: boolean;
  dynamicDropdownOptions?: Record<
    string,
    Array<{ value: string | number; label: string }>
  >;
  loading?: boolean;
}

const SearchDialog: React.FC<SearchDialogProps> = ({
  title,
  buttonText,
  metadata,
  onSubmit,
  onClearResults,
  hasResults = false,
  dynamicDropdownOptions,
  loading = false,
}) => {
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    setIsSubmitting(true);
    try {
      await onSubmit(filters);
      setIsSearchFormOpen(false);
    } catch (error) {
      setIsSearchFormOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsSearchFormOpen(false);
    // NO limpia los resultados - mantiene los datos en memoria
  };

  const handleClear = () => {
    // Solo limpia los campos del formulario - la funcionalidad ya está en FormularioGenerico
    // No necesita hacer nada extra aquí
  };

  const handleOpenDialog = () => {
    setIsSearchFormOpen(true);
  };

  const searchFormData: AdvancedSearchFormProps = {
    metadata,
    onSubmit: handleSearchSubmit,
    onClear: handleClear, // Función interna para limpiar campos
    loading: isSubmitting || loading,
    dynamicDropdownOptions,
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Button variant='contained' onClick={handleOpenDialog} color='primary'>
          {buttonText}
        </Button>

        {hasResults && onClearResults && (
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<ClearAll />}
            onClick={onClearResults}
          >
            Limpiar Resultados
          </Button>
        )}
      </Box>

      <Dialog
        open={isSearchFormOpen}
        onClose={handleCancel}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <AdvancedSearchForm {...searchFormData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={isSubmitting}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchDialog;
