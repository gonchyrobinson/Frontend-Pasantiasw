import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  CircularProgress,
  Fab,
} from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';
import { useApiQuery } from '../../hooks/useApi';
import { EmpresaDto } from './types';
import { filterEmpresas } from './helpers/empresaHelpers';
import EmpresasGrid from './components/EmpresasGrid';
import EmpresasFilters from './components/EmpresasFilters';
import EmpresasStats from './components/EmpresasStats';

const Empresas: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [vigenciaFilter, setVigenciaFilter] = useState('');
  const [tipoContratoFilter, setTipoContratoFilter] = useState('');

  const {
    data: empresasResponse,
    isLoading,
    error,
    refetch,
  } = useApiQuery<EmpresaDto[]>('/empresas');

  const empresas = useMemo(() => {
    if (!empresasResponse) return [];
    return Array.isArray(empresasResponse)
      ? empresasResponse
      : empresasResponse?.data && Array.isArray(empresasResponse.data)
        ? empresasResponse.data
        : [];
  }, [empresasResponse]);

  const filteredEmpresas = useMemo(() => {
    let filtered = filterEmpresas(empresas, searchText);
    if (vigenciaFilter)
      filtered = filtered.filter(e => e.vigencia === vigenciaFilter);
    if (tipoContratoFilter)
      filtered = filtered.filter(e => e.tipoContrato === tipoContratoFilter);
    return filtered;
  }, [empresas, searchText, vigenciaFilter, tipoContratoFilter]);

  const handleClearFilters = () => {
    setSearchText('');
    setVigenciaFilter('');
    setTipoContratoFilter('');
  };

  if (isLoading) {
    return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 400,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Alert
          severity='error'
          action={
            <Button color='inherit' size='small' onClick={() => refetch()}>
              <Refresh sx={{ mr: 1 }} />
              Reintentar
            </Button>
          }
        >
          Error al cargar las empresas: {error?.message || 'Error desconocido'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant='h4' component='h1' gutterBottom>
            Gestión de Empresas
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Administra las empresas del sistema de pasantías
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<Add />}
          onClick={() => {
            // TODO: Implementar creación de empresa
          }}
          sx={{ ml: 'auto' }}
        >
          Nueva Empresa
        </Button>
      </Box>

      <EmpresasStats empresas={empresas} />

      <EmpresasFilters
        searchText={searchText}
        onSearchChange={setSearchText}
        vigenciaFilter={vigenciaFilter}
        onVigenciaChange={setVigenciaFilter}
        tipoContratoFilter={tipoContratoFilter}
        onTipoContratoChange={setTipoContratoFilter}
        totalEmpresas={empresas.length}
        filteredEmpresas={filteredEmpresas.length}
        onClearFilters={handleClearFilters}
      />

      <EmpresasGrid
        empresas={filteredEmpresas}
        onEmpresaClick={() => {
          // TODO: Implementar vista detalle de empresa
        }}
        onEmpresaEdit={() => {
          // TODO: Implementar edición de empresa
        }}
        onEmpresaDelete={() => {
          // TODO: Implementar eliminación de empresa
        }}
      />

      <Fab
        color='primary'
        aria-label='add empresa'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => {
          // TODO: Implementar creación rápida de empresa
        }}
      >
        <Add />
      </Fab>
    </Container>
  );
};

export default Empresas;
