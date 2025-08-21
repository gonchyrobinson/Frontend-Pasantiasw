import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { useEmpresasDropdown } from '../../../lib/hooks/useDropdownData';
import { useAsignarEmpresa } from '../hooks/useConvenios';
import { ConvenioEmpresaDto } from '../types';

interface AsignarAEmpresaDialogProps {
  open: boolean;
  onClose: () => void;
  convenio: ConvenioEmpresaDto | null;
}

const AsignarAEmpresaDialog: React.FC<AsignarAEmpresaDialogProps> = ({
  open,
  onClose,
  convenio,
}) => {
  const { showError, showSuccess } = useSnackbar();
  const {
    empresasParaAsignarOptions,
    isLoading: empresasLoading,
    error: empresasError,
  } = useEmpresasDropdown();
  const asignarEmpresaMutation = useAsignarEmpresa();

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!convenio) return;

    try {
      await asignarEmpresaMutation.mutateAsync({
        convenioId: convenio.idConvenio,
        empresaId: Number(data.empresaId),
      });
      showSuccess('Empresa asignada exitosamente');
      onClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error al asignar la empresa';
      showError(errorMessage);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>Asignar Empresa a Convenio</DialogTitle>
      <DialogContent>
        {empresasError ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Error al cargar las empresas disponibles</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        ) : (
          <FormularioGenerico
            metadata={{
              title: '',
              submitButtonText: 'Asignar',
              cancelButtonText: 'Cancelar',
              fields: [
                {
                  name: 'empresaId',
                  label: 'Empresa',
                  type: 'dynamicDropdown' as const,
                  validations: {
                    required: 'Este campo es requerido',
                  },
                  placeholder: empresasLoading
                    ? 'Cargando empresas...'
                    : empresasParaAsignarOptions.length > 0
                      ? 'Seleccione una empresa'
                      : 'No hay empresas disponibles',
                  gridSize: 12,
                },
              ],
            }}
            onSubmit={handleSubmit}
            onCancel={onClose}
            loading={asignarEmpresaMutation.isPending || empresasLoading}
            dynamicDropdownOptions={{
              empresaId: empresasParaAsignarOptions || [],
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AsignarAEmpresaDialog;
