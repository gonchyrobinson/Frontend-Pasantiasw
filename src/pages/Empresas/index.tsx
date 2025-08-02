function isErrorWithMessage(e: unknown): e is { message: string } {
  return (
    typeof e === 'object' &&
    e !== null &&
    'message' in e &&
    typeof (e as { message: unknown }).message === 'string'
  );
}
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchEmpresas,
  deleteEmpresa,
  buscarEmpresasAvanzado,
} from './helpers/api';
import { Empresa } from './types/empresa';
import EmpresaList from './components/EmpresaList';
import EmpresaForm from './components/EmpresaForm';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import './empresas-filtros.css';

const Empresas: React.FC = () => {
  const queryClient = useQueryClient();
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({ open: false, message: '', severity: 'success' });
  const [editEmpresa, setEditEmpresa] = React.useState<Empresa | null>(null);
  const [formOpen, setFormOpen] = React.useState(false);

  const [filtro, setFiltro] = React.useState<{
    nombre: string;
    vigencia: string;
    tipoContrato: string;
    fechaInicioDesde: string;
    fechaInicioHasta: string;
    fechaFinDesde: string;
    fechaFinHasta: string;
  }>({
    nombre: '',
    vigencia: '',
    tipoContrato: '',
    fechaInicioDesde: '',
    fechaInicioHasta: '',
    fechaFinDesde: '',
    fechaFinHasta: '',
  });
  const [nombreBusqueda, setNombreBusqueda] = React.useState('');
  const { data, isLoading, isError, isFetching } = useQuery<Empresa[]>({
    queryKey: ['empresas', { ...filtro, nombre: nombreBusqueda }],
    queryFn: async () => {
      // Si hay algún filtro activo, usar búsqueda avanzada
      if (
        nombreBusqueda ||
        filtro.vigencia ||
        filtro.tipoContrato ||
        filtro.fechaInicioDesde ||
        filtro.fechaInicioHasta ||
        filtro.fechaFinDesde ||
        filtro.fechaFinHasta
      ) {
        return buscarEmpresasAvanzado({
          nombre: nombreBusqueda,
          vigencia: filtro.vigencia,
          tipoContrato: filtro.tipoContrato,
          fechaInicioDesde: filtro.fechaInicioDesde,
          fechaInicioHasta: filtro.fechaInicioHasta,
          fechaFinDesde: filtro.fechaFinDesde,
          fechaFinHasta: filtro.fechaFinHasta,
        });
      }
      return fetchEmpresas();
    },
  });

  const handleEdit = (empresa: Empresa) => {
    setEditEmpresa(empresa);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditEmpresa(null);
  };

  const handleFormSave = async (empresaData: Partial<Empresa>) => {
    try {
      if (editEmpresa) {
        // Editar existente, asegurando que el idEmpresa nunca se sobrescriba
        const empresaToUpdate = {
          ...editEmpresa,
          ...empresaData,
          idEmpresa: editEmpresa.idEmpresa,
        };
        await import('./helpers/api').then(({ updateEmpresa }) =>
          updateEmpresa(empresaToUpdate)
        );
        setSnackbar({
          open: true,
          message: 'Empresa actualizada',
          severity: 'success',
        });
      } else {
        // Crear nueva empresa
        await import('./helpers/api').then(({ createEmpresa }) =>
          createEmpresa(empresaData as Omit<Empresa, 'idEmpresa'>)
        );
        setSnackbar({
          open: true,
          message: 'Empresa creada',
          severity: 'success',
        });
      }
      setFormOpen(false);
      setEditEmpresa(null);
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
    } catch (e: unknown) {
      let errorMsg = 'Error al guardar';
      if (isErrorWithMessage(e)) {
        errorMsg = e.message;
      } else if (typeof e === 'string') {
        errorMsg = e;
      }
      setSnackbar({ open: true, message: errorMsg, severity: 'error' });
    }
  };

  const handleDelete = async (empresa: Empresa) => {
    try {
      await deleteEmpresa(empresa.idEmpresa);
      setSnackbar({
        open: true,
        message: 'Empresa eliminada',
        severity: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['empresas'] });
    } catch (e) {
      setSnackbar({
        open: true,
        message: 'Error al eliminar',
        severity: 'error',
      });
    }
  };

  return (
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Box display='flex' flexDirection='column' gap={2} mb={3}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4' fontWeight={600}>
            Empresas
          </Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setEditEmpresa(null);
              setFormOpen(true);
            }}
          >
            Nueva Empresa
          </Button>
        </Box>
        <Box display='flex' gap={2} flexWrap='wrap'>
          <form
            onSubmit={e => {
              e.preventDefault();
              setNombreBusqueda(filtro.nombre.trim());
            }}
            className='filtros-form'
          >
            <input
              type='text'
              placeholder='Buscar por nombre'
              value={filtro.nombre}
              onChange={e => setFiltro(f => ({ ...f, nombre: e.target.value }))}
              className='filtros-input'
            />
            <Button
              type='submit'
              variant='outlined'
              size='small'
              disabled={!filtro.nombre.trim()}
              sx={{ minWidth: 80 }}
            >
              Buscar
            </Button>
          </form>
          <select
            value={filtro.vigencia}
            onChange={e => {
              setFiltro(f => ({ ...f, vigencia: e.target.value }));
            }}
            className='filtros-input'
          >
            <option value=''>Vigencia</option>
            <option value='vigente'>Vigente</option>
            <option value='no_vigente'>No vigente</option>
          </select>
          <select
            value={filtro.tipoContrato}
            onChange={e => {
              setFiltro(f => ({ ...f, tipoContrato: e.target.value }));
            }}
            className='filtros-input'
          >
            <option value=''>Tipo Contrato</option>
            <option value='temporal'>Temporal</option>
            <option value='indefinido'>Indefinido</option>
            <option value='otro'>Otro</option>
          </select>
          <div className='filtros-fechas-group'>
            <label className='filtros-label' htmlFor='fecha-inicio-desde'>
              Rango de fechas de inicio:
            </label>
            <div className='filtros-fechas-row'>
              <input
                id='fecha-inicio-desde'
                type='date'
                aria-label='Fecha Inicio Desde'
                value={filtro.fechaInicioDesde}
                onChange={e => {
                  setFiltro(f => ({ ...f, fechaInicioDesde: e.target.value }));
                }}
                className='filtros-input'
              />
              <span className='filtros-separador'>a</span>
              <input
                id='fecha-inicio-hasta'
                type='date'
                aria-label='Fecha Inicio Hasta'
                value={filtro.fechaInicioHasta}
                onChange={e => {
                  setFiltro(f => ({ ...f, fechaInicioHasta: e.target.value }));
                }}
                className='filtros-input'
              />
            </div>
          </div>
          <div className='filtros-fechas-group'>
            <label className='filtros-label' htmlFor='fecha-fin-desde'>
              Rango de fechas de fin:
            </label>
            <div className='filtros-fechas-row'>
              <input
                id='fecha-fin-desde'
                type='date'
                aria-label='Fecha Fin Desde'
                value={filtro.fechaFinDesde}
                onChange={e => {
                  setFiltro(f => ({ ...f, fechaFinDesde: e.target.value }));
                }}
                className='filtros-input'
              />
              <span className='filtros-separador'>a</span>
              <input
                id='fecha-fin-hasta'
                type='date'
                aria-label='Fecha Fin Hasta'
                value={filtro.fechaFinHasta}
                onChange={e => {
                  setFiltro(f => ({ ...f, fechaFinHasta: e.target.value }));
                }}
                className='filtros-input'
              />
            </div>
          </div>
          {(filtro.nombre ||
            filtro.vigencia ||
            filtro.tipoContrato ||
            filtro.fechaInicioDesde ||
            filtro.fechaInicioHasta ||
            filtro.fechaFinDesde ||
            filtro.fechaFinHasta ||
            nombreBusqueda) && (
            <Button
              onClick={() => {
                setFiltro({
                  nombre: '',
                  vigencia: '',
                  tipoContrato: '',
                  fechaInicioDesde: '',
                  fechaInicioHasta: '',
                  fechaFinDesde: '',
                  fechaFinHasta: '',
                });
                setNombreBusqueda('');
              }}
              size='small'
            >
              Limpiar
            </Button>
          )}
        </Box>
      </Box>
      {isLoading || isFetching ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          minHeight={200}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Alert severity='error'>Error al cargar empresas</Alert>
      ) : (
        <EmpresaList
          empresas={data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <EmpresaForm
        open={formOpen}
        initialData={editEmpresa}
        onClose={handleFormClose}
        onSave={handleFormSave}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Empresas;
