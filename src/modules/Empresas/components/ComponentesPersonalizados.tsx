import React from 'react';
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search,
  Clear,
  Business,
  CheckCircle,
  Cancel,
  Category,
  Add,
} from '@mui/icons-material';
import {
  BotonNuevaEmpresaStyled,
  TarjetaEstadisticaStyled,
  CampoBusquedaStyled,
  ContenedorHeaderStyled,
} from './StyledComponents';
import {
  SectionContainer,
  FlexContainer,
  CenteredContainer,
  CardContainer,
} from '../../../lib/components/StyledContainers';
import { Vigencia, TipoContrato } from '../types';
import { FloatingActionButton } from '../../../lib/components/ComponentesGenericos';

// Re-export common components from central location
export {
  TituloPrincipal,
  TituloSecundario,
  Subtitulo,
  TextoPrincipal,
  TextoSecundario,
  ValorEstadistica,
  ChipEstadistica,
  ChipLimpiarFiltros,
} from '../../../lib/components/ComponentesGenericos';

// Grid Components
export const ContenedorGrid = ({ children }: { children: React.ReactNode }) => (
  <Grid container spacing={3}>
    {children}
  </Grid>
);

export const ItemGrid = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <Grid item {...props}>
    {children}
  </Grid>
);

export const ContenedorGridFiltros = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Grid container spacing={2} alignItems='center'>
    {children}
  </Grid>
);

// Box Components
export const ContenedorPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => <SectionContainer sx={{ marginBottom: 4 }}>{children}</SectionContainer>;

export const ContenedorFiltros = ({
  children,
}: {
  children: React.ReactNode;
}) => <CardContainer sx={{ mb: 3 }}>{children}</CardContainer>;

export const ContenedorEstadisticas = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <SectionContainer
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 2,
      mb: 3,
    }}
  >
    {children}
  </SectionContainer>
);

export const ContenedorIcono = ({
  children,
  color = 'primary',
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <CenteredContainer sx={{ marginBottom: 1 }}>
    <Box
      sx={{
        p: 1,
        borderRadius: '50%',
        backgroundColor: `${color}.light`,
        color: `${color}.main`,
      }}
    >
      {children}
    </Box>
  </CenteredContainer>
);

export const ContenedorChips = ({
  children,
}: {
  children: React.ReactNode;
}) => <FlexContainer sx={{ flexWrap: 'wrap' }}>{children}</FlexContainer>;

export const ContenedorFiltrosInfo = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <FlexContainer sx={{ alignItems: 'center', gap: 2 }}>
    {children}
  </FlexContainer>
);

// Paper Components
export const TarjetaEstadistica = ({
  children,
  color = 'primary',
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <TarjetaEstadisticaStyled elevation={2} color={color}>
    {children}
  </TarjetaEstadisticaStyled>
);

// Form Components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CampoBusqueda = ({ register }: { register: any }) => (
  <CampoBusquedaStyled
    fullWidth
    placeholder='Buscar empresas...'
    {...register}
    InputProps={{
      startAdornment: <Search />,
    }}
    size='small'
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectorVigencia = ({ field }: { field: any }) => (
  <FormControl fullWidth size='small'>
    <InputLabel>Vigencia</InputLabel>
    <Select {...field} label='Vigencia'>
      <MenuItem value=''>Todas</MenuItem>
      <MenuItem value={Vigencia.Vigente}>Vigente</MenuItem>
      <MenuItem value={Vigencia.NoVigente}>No Vigente</MenuItem>
    </Select>
  </FormControl>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectorTipoContrato = ({ field }: { field: any }) => (
  <FormControl fullWidth size='small'>
    <InputLabel>Tipo de Contrato</InputLabel>
    <Select {...field} label='Tipo de Contrato'>
      <MenuItem value=''>Todos</MenuItem>
      <MenuItem value={TipoContrato.Indefinido}>Indefinido</MenuItem>
      <MenuItem value={TipoContrato.Temporal}>Temporal</MenuItem>
      <MenuItem value={TipoContrato.Otro}>Otro</MenuItem>
    </Select>
  </FormControl>
);

// Icon Components
export const IconoEmpresa = () => <Business />;
export const IconoActivo = () => <CheckCircle />;
export const IconoInactivo = () => <Cancel />;
export const IconoCategoria = () => <Category />;
export const IconoBusqueda = () => <Search />;
export const IconoLimpiar = () => <Clear />;

// Componentes para el componente principal
export const ContenedorHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => <ContenedorHeaderStyled>{children}</ContenedorHeaderStyled>;

export const BotonNuevaEmpresa = ({ onClick }: { onClick: () => void }) => (
  <BotonNuevaEmpresaStyled
    variant='contained'
    startIcon={<Add />}
    onClick={onClick}
  >
    Nueva Empresa
  </BotonNuevaEmpresaStyled>
);

export const FabNuevaEmpresa = ({ onClick }: { onClick: () => void }) => (
  <FloatingActionButton onClick={onClick} tooltip='Crear nueva empresa' />
);
