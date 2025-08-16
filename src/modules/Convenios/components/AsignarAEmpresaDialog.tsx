import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FormularioGenerico } from '../../../FormularioGenerico';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { useEmpresasForDropdown } from '../hooks/useEmpresasForDropdown';
import { useAsignarEmpresa } from '../hooks/useAsignarEmpresa';
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
  const { empresasParaAsignarOptions, isLoading: empresasLoading } =
    useEmpresasForDropdown();
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
      showError('Error al asignar la empresa');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Asignar Empresa a Convenio</DialogTitle>
      <DialogContent>
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
                placeholder: 'Seleccione una empresa',
                gridSize: 12,
              },
            ],
          }}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={asignarEmpresaMutation.isPending || empresasLoading}
          dynamicDropdownOptions={{
            empresaId: empresasParaAsignarOptions,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AsignarAEmpresaDialog;
