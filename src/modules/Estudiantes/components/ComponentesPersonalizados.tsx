import React from 'react';
import { TextField } from '@mui/material';
import { Search, Clear, School, Person } from '@mui/icons-material';
import {
  GridContainer,
  FlexContainer,
  SectionContainer,
  CenteredContainer,
  CardContainer,
} from '../../../lib/components/StyledContainers';
import { FloatingActionButton } from '../../../lib/components/ComponentesGenericos';
import { CreateButton } from '../../../lib/components/StyledButtons';

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
  <CardContainer elevation={2} color={color}>
    {children}
  </CardContainer>
);

// Form Components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CampoBusqueda = ({ register }: { register: any }) => (
  <TextField
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
}) => <SectionContainer>{children}</SectionContainer>;

export const BotonNuevoEstudiante = ({ onClick }: { onClick: () => void }) => (
  <CreateButton onClick={onClick}>Nuevo Estudiante</CreateButton>
);

export const FabNuevoEstudiante = ({ onClick }: { onClick: () => void }) => (
  <FloatingActionButton onClick={onClick} tooltip='Crear nuevo estudiante' />
);
