import React from 'react';
import {
  Typography,
  Grid,
  Container,
  Alert,
  SpeedDial,
  SpeedDialAction,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Business,
  School,
  Payment,
  Add,
} from '@mui/icons-material';
import { useApiQuery } from '../../hooks/useApi';
import { Convenio, Pasantia, Pago } from '../../types';
import {
  WelcomeSection,
  StatsCard,
  ProgressSection,
  ActionCard,
} from './components';
import {
  calculateStats,
  getQuickActions,
  getSpeedDialActions,
  getProgressItems,
  hasErrors,
} from './helpers/statsHelpers';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const Home: React.FC = () => {
  // Example API calls - replace with actual endpoints
  const { data: conveniosData, isLoading: conveniosLoading, error: conveniosError } = 
    useApiQuery<Convenio[]>('/convenios');
  const { data: pasantiasData, isLoading: pasantiasLoading, error: pasantiasError } = 
    useApiQuery<Pasantia[]>('/pasantias');
  const { data: pagosData, isLoading: pagosLoading, error: pagosError } = 
    useApiQuery<Pago[]>('/pagos');

  // Icons
  const icons = {
    business: <Business />,
    school: <School />,
    payment: <Payment />,
    add: <Add />,
  };

  // Calculate stats using helper
  const stats = calculateStats(
    conveniosData?.data,
    pasantiasData?.data,
    pagosData?.data,
    conveniosLoading,
    pasantiasLoading,
    pagosLoading,
    !!conveniosError,
    !!pasantiasError,
    !!pagosError,
    icons
  );

  // Get quick actions using helper
  const quickActions = getQuickActions(icons);

  // Get speed dial actions using helper
  const speedDialActions = getSpeedDialActions(icons);

  // Get progress items using helper
  const progressItems = getProgressItems();

  return (
    <StyledContainer maxWidth="lg">
      <WelcomeSection
        title="Bienvenido al Sistema de Gestión de Pasantías"
        subtitle="Secretaría de Bienestar Estudiantil"
        statusLabel="Sistema Activo"
        statusColor="success"
      />

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatsCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              bgColor={stat.bgColor}
              loading={stat.loading}
              error={stat.error}
              trend={stat.trend}
              trendDirection={stat.trendDirection}
            />
          </Grid>
        ))}
      </Grid>

      {/* Progress Section */}
      <ProgressSection
        title="Progreso del Sistema"
        items={progressItems}
      />

      {/* Quick Actions */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Acciones Rápidas
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ActionCard
              title={action.title}
              description={action.description}
              icon={action.icon}
              color={action.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Error Display */}
      {hasErrors(!!conveniosError, !!pasantiasError, !!pagosError) && (
        <Alert severity="error" sx={{ mt: 3 }}>
          Error al cargar los datos. Por favor, intente nuevamente.
        </Alert>
      )}

      {/* Speed Dial for Quick Actions */}
      <SpeedDial
        ariaLabel="Acciones rápidas"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<Add />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </StyledContainer>
  );
};

export default Home; 