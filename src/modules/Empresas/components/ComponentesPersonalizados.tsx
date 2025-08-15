import React from 'react';
import {
  Grid,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  CardTitle,
  Subtitle,
  BodyText,
  StatValue,
} from '../../../lib/components/StyledText';
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
  TituloPrincipalStyled,
  BotonNuevaEmpresaStyled,
} from './StyledComponents';
import {
  ContenedorEstadisticasStyled,
  TarjetaEstadisticaStyled,
  CampoBusquedaStyled,
  ContenedorHeaderStyled,
  FabStyled,
  ContenedorFiltrosStyled,
} from '../../../lib/components/StyledComponents';
import {
  SectionContainer,
  FlexContainer,
  CenteredContainer,
} from '../../../lib/components/StyledContainers';
import { Vigencia, TipoContrato } from '../types';

// Typography Components
export const TituloPrincipal = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <TituloPrincipalStyled variant='h6' gutterBottom>
    {children}
  </TituloPrincipalStyled>
);

export const TituloSecundario = ({
  children,
}: {
  children: React.ReactNode;
}) => <CardTitle gutterBottom>{children}</CardTitle>;

export const Subtitulo = ({ children }: { children: React.ReactNode }) => (
  <Subtitle gutterBottom>{children}</Subtitle>
);

export const TextoPrincipal = ({ children }: { children: React.ReactNode }) => (
  <BodyText>{children}</BodyText>
);

export const TextoSecundario = ({
  children,
}: {
  children: React.ReactNode;
}) => <BodyText color='text.secondary'>{children}</BodyText>;

export const ValorEstadistica = ({
  children,
  color = 'primary',
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <StatValue component='div' color={`${color}.main`} fontWeight='bold'>
    {children}
  </StatValue>
);

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
}) => <ContenedorFiltrosStyled>{children}</ContenedorFiltrosStyled>;

export const ContenedorEstadisticas = ({
  children,
}: {
  children: React.ReactNode;
}) => <ContenedorEstadisticasStyled>{children}</ContenedorEstadisticasStyled>;

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

// Chip Components
export const ChipEstadistica = ({ label }: { label: string }) => (
  <Chip label={label} variant='outlined' size='small' color='primary' />
);

export const ChipLimpiarFiltros = ({ onDelete }: { onDelete: () => void }) => (
  <Chip
    label='Limpiar filtros'
    size='small'
    variant='outlined'
    deleteIcon={<Clear />}
    onDelete={onDelete}
    onClick={onDelete}
  />
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
  <FabStyled color='primary' aria-label='add empresa' onClick={onClick}>
    <Add />
  </FabStyled>
);
