import React from 'react';
import { Empresa } from '../types/empresa';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';

interface EmpresaFormProps {
  open: boolean;
  initialData?: Empresa | null;
  onClose: () => void;
  onSave: (empresa: Partial<Empresa>) => void;
}

const EmpresaForm: React.FC<EmpresaFormProps> = ({
  open,
  initialData,
  onClose,
  onSave,
}) => {
  const [form, setForm] = React.useState<Partial<Empresa>>(initialData || {});

  React.useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>
        {form.idEmpresa ? 'Editar Empresa' : 'Nueva Empresa'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Nombre'
                name='nombre'
                value={form.nombre || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label='Vigencia'
                name='vigencia'
                value={form.vigencia || ''}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value='vigente'>Vigente</MenuItem>
                <MenuItem value='no_vigente'>No vigente</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Fecha Inicio'
                name='fechaInicio'
                type='date'
                value={form.fechaInicio || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Fecha Fin'
                name='fechaFin'
                type='date'
                value={form.fechaFin || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label='Tipo Contrato'
                name='tipoContrato'
                value={form.tipoContrato || ''}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value='temporal'>Temporal</MenuItem>
                <MenuItem value='indefinido'>Indefinido</MenuItem>
                <MenuItem value='otro'>Otro</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Encargado'
                name='encargado'
                value={form.encargado || ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Celular'
                name='celular'
                value={form.celular || ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Correo Electrónico'
                name='correoElectronico'
                value={form.correoElectronico || ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Sudocu'
                name='sudocu'
                type='date'
                value={form.sudocu || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type='submit' variant='contained' color='primary'>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmpresaForm;
