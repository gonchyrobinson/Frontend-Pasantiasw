import React from 'react';
import { Chip, TextField } from '@mui/material';
import {
  CardTitle,
  Subtitle,
  BodyText,
  StatValue,
} from '../../../lib/components/StyledText';
import { Search, Clear, School, Person, Add } from '@mui/icons-material';
import {
  GridContainer,
  FlexContainer,
} from '../../../lib/components/StyledContainers';
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
  ContenedorHeaderStyled,
  BotonNuevoEstudianteStyled,
  FabStyled,
} from './StyledComponents';

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
  <GridContainer container spacing={3}>
    {children}
  </GridContainer>
);

export const ItemGrid = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: unknown;
}) => (
  <GridContainer item {...props}>
    {children}
  </GridContainer>
);

export const ContenedorGridFiltros = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <GridContainer container spacing={2} alignItems='center'>
    {children}
  </GridContainer>
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
    <FlexContainer
      sx={{
        p: 1,
        borderRadius: '50%',
        backgroundColor: `${color}.light`,
        color: `${color}.main`,
      }}
    >
      {children}
    </FlexContainer>
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
    placeholder='Buscar estudiantes...'
    {...register}
    InputProps={{
      startAdornment: <Search />,
    }}
    size='small'
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectorCarrera = ({ field }: { field: any }) => (
  <TextField
    {...field}
    label='Carrera'
    size='small'
    fullWidth
    placeholder='Filtrar por carrera'
  />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectorAreaTrabajo = ({ field }: { field: any }) => (
  <TextField
    {...field}
    label='Área de Trabajo'
    size='small'
    fullWidth
    placeholder='Filtrar por área de trabajo'
  />
);

// Icon Components
export const IconoEstudiante = () => <School />;
export const IconoPersona = () => <Person />;
export const IconoBusqueda = () => <Search />;
export const IconoLimpiar = () => <Clear />;

// Componentes para el componente principal
export const ContenedorHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => <ContenedorHeaderStyled>{children}</ContenedorHeaderStyled>;

export const BotonNuevoEstudiante = ({ onClick }: { onClick: () => void }) => (
  <BotonNuevoEstudianteStyled
    variant='contained'
    startIcon={<Add />}
    onClick={onClick}
  >
    Nuevo Estudiante
  </BotonNuevoEstudianteStyled>
);

export const FabNuevoEstudiante = ({ onClick }: { onClick: () => void }) => (
  <FabStyled color='primary' aria-label='add estudiante' onClick={onClick}>
    <Add />
  </FabStyled>
);
