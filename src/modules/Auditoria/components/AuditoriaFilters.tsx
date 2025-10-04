import React, { useState } from 'react';
import { Grid, TextField, Box } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

import { SectionContainer } from '../../../lib/components/StyledContainers';
import { CardTitle } from '../../../lib/components/StyledText';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../../lib/components/StyledButtons';
import { useBuscarAuditoria } from '../hooks/useAuditoria';
import { AuditoriaFiltersProps, AuditoriaBuscarDto } from '../types';

const AuditoriaFilters: React.FC<AuditoriaFiltersProps> = ({
  onSearchResults,
  onClearResults,
  loading = false,
  hasResults = false,
}) => {
  const [fechaDesde, setFechaDesde] = useState<Dayjs | null>(null);
  const [fechaHasta, setFechaHasta] = useState<Dayjs | null>(null);
  const [usuarioNombre, setUsuarioNombre] = useState('');
  const [accion, setAccion] = useState('');

  const { mutate: buscarAuditoria, isPending } = useBuscarAuditoria();

  const handleSearch = async () => {
    const filtros: AuditoriaBuscarDto = {};

    if (fechaDesde) {
      filtros.fechaDesde = fechaDesde.format('YYYY-MM-DD');
    }
    if (fechaHasta) {
      filtros.fechaHasta = fechaHasta.format('YYYY-MM-DD');
    }
    if (usuarioNombre.trim()) {
      filtros.usuarioNombre = usuarioNombre.trim();
    }
    if (accion.trim()) {
      filtros.accion = accion.trim();
    }

    buscarAuditoria(filtros, {
      onSuccess: data => {
        onSearchResults(data || []);
      },
      onError: error => {
        console.error('Error al buscar auditorías:', error);
        onSearchResults([]);
      },
    });
  };

  const handleClear = () => {
    setFechaDesde(null);
    setFechaHasta(null);
    setUsuarioNombre('');
    setAccion('');
    onClearResults();
  };

  const isSearching = loading || isPending;

  return (
    <SectionContainer sx={{ mb: 3 }}>
      <CardTitle gutterBottom>Filtros de Búsqueda</CardTitle>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label='Fecha Desde'
              value={fechaDesde}
              onChange={setFechaDesde}
              format='DD/MM/YYYY'
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label='Fecha Hasta'
              value={fechaHasta}
              onChange={setFechaHasta}
              format='DD/MM/YYYY'
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size='small'
              label='Usuario'
              value={usuarioNombre}
              onChange={e => setUsuarioNombre(e.target.value)}
              placeholder='Nombre del usuario'
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size='small'
              label='Acción'
              value={accion}
              onChange={e => setAccion(e.target.value)}
              placeholder='Tipo de operación'
            />
          </Grid>
        </Grid>
      </LocalizationProvider>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        {hasResults && (
          <SecondaryButton
            startIcon={<Clear />}
            onClick={handleClear}
            disabled={isSearching}
          >
            Limpiar
          </SecondaryButton>
        )}

        <PrimaryButton
          startIcon={<Search />}
          onClick={handleSearch}
          loading={isSearching}
        >
          Buscar
        </PrimaryButton>
      </Box>
    </SectionContainer>
  );
};

export default AuditoriaFilters;
