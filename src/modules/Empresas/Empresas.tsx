import React, { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useApiQuery } from '../../hooks/useApi';
import { EmpresaDto } from './types';
import {
  processEmpresasResponse,
  applyEmpresasFilters,
} from './helpers/empresaHelpers';
import EmpresasGrid from './components/EmpresasGrid';
import EmpresasFilters from './components/EmpresasFilters';
import EmpresasStats from './components/EmpresasStats';
import {
  ContenedorHeader,
  BotonNuevaEmpresa,
  FabNuevaEmpresa,
} from './components/ComponentesPersonalizados';
import { ContenedorLoading } from './components/StyledComponents';

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
    return processEmpresasResponse(empresasResponse);
  }, [empresasResponse]);

  const filteredEmpresas = useMemo(() => {
    return applyEmpresasFilters(
      empresas,
      searchText,
      vigenciaFilter,
      tipoContratoFilter
    );
  }, [empresas, searchText, vigenciaFilter, tipoContratoFilter]);

  const handleClearFilters = () => {
    setSearchText('');
    setVigenciaFilter('');
    setTipoContratoFilter('');
  };

  if (isLoading) {
    return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <ContenedorLoading>
          <CircularProgress size={60} />
        </ContenedorLoading>
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
      <ContenedorHeader>
        <Box>
          <Typography variant='h4' component='h1' gutterBottom>
            Gestión de Empresas
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Administra las empresas del sistema de pasantías
          </Typography>
        </Box>
        <BotonNuevaEmpresa
          onClick={() => {
            // TODO: Implementar creación de empresa
          }}
        />
      </ContenedorHeader>

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

      <FabNuevaEmpresa
        onClick={() => {
          // TODO: Implementar creación rápida de empresa
        }}
      />
    </Container>
  );
};

export default Empresas;
