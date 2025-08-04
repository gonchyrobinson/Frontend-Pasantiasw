import React from 'react';
import {
  Typography,
  Grid,
  Box,
  Chip,
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
} from '@mui/icons-material';
import {
  TituloPrincipalStyled,
  ContenedorPrincipalStyled,
  ContenedorFiltrosStyled,
  ContenedorEstadisticasStyled,
  ContenedorIconoStyled,
  ContenedorChipsStyled,
  ContenedorFiltrosInfoStyled,
  TarjetaEstadisticaStyled,
  CampoBusquedaStyled,
} from './StyledComponents';
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
}) => (
  <Typography variant='h6' gutterBottom>
    {children}
  </Typography>
);

export const Subtitulo = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='subtitle2' gutterBottom>
    {children}
  </Typography>
);

export const TextoPrincipal = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='body2'>{children}</Typography>
);

export const TextoSecundario = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Typography variant='body2' color='text.secondary'>
    {children}
  </Typography>
);

export const ValorEstadistica = ({
  children,
  color = 'primary',
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <Typography
    variant='h4'
    component='div'
    color={`${color}.main`}
    fontWeight='bold'
  >
    {children}
  </Typography>
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
}) => <ContenedorPrincipalStyled>{children}</ContenedorPrincipalStyled>;

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
  <ContenedorIconoStyled>
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
  </ContenedorIconoStyled>
);

export const ContenedorChips = ({
  children,
}: {
  children: React.ReactNode;
}) => <ContenedorChipsStyled>{children}</ContenedorChipsStyled>;

export const ContenedorFiltrosInfo = ({
  children,
}: {
  children: React.ReactNode;
}) => <ContenedorFiltrosInfoStyled>{children}</ContenedorFiltrosInfoStyled>;

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
