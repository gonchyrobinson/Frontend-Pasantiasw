import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useApiQuery } from '../../hooks/useApi';
import { useSnackbar } from '../../hooks/useSnackbar';
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
import LoadingSpinner from '../../components/LoadingSpinner';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { ROUTES } from '../../helpers/routesHelper';

const Empresas: React.FC = () => {
  const navigate = useNavigate();
  const { snackbar, showError, hideSnackbar } = useSnackbar();
  const [searchText, setSearchText] = useState('');
  const [vigenciaFilter, setVigenciaFilter] = useState('');
  const [tipoContratoFilter, setTipoContratoFilter] = useState('');

  const {
    data: empresasResponse,
    isLoading,
    error,
    refetch,
  } = useApiQuery<EmpresaDto[]>('/empresas');

  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleNuevaEmpresa = () => {
    navigate(ROUTES.EMPRESAS_CREAR);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      setIsRefreshing(true);
      await refetch();
    } catch (error) {
      showError('Error al actualizar las empresas. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleEditarEmpresa = (empresa: EmpresaDto) => {
    navigate(`${ROUTES.EMPRESAS_EDITAR}/${empresa.idEmpresa}`);
  };

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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title='Actualizar empresas'>
            <IconButton
              onClick={handleRefresh}
              disabled={isRefreshing}
              color='primary'
              size='large'
            >
              <Refresh
                sx={{
                  animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            </IconButton>
          </Tooltip>
          <BotonNuevaEmpresa onClick={handleNuevaEmpresa} />
        </Box>
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

      {isLoading || isRefreshing ? (
        <Box sx={{ py: 4 }}>
          <LoadingSpinner message='Cargando empresas...' />
        </Box>
      ) : (
        <EmpresasGrid
          empresas={filteredEmpresas}
          onEmpresaClick={() => {
            // TODO: Implementar vista detalle de empresa
          }}
          onEmpresaEdit={handleEditarEmpresa}
          onEmpresaDelete={() => {
            // TODO: Implementar eliminación de empresa
          }}
        />
      )}

      <FabNuevaEmpresa onClick={handleNuevaEmpresa} />

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </Container>
  );
};

export default Empresas;
