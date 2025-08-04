import { Business, School, Payment, Add } from '@mui/icons-material';
import React from 'react';

import { useApiQuery } from '../../hooks/useApi';
import { Convenio, Pasantia, Pago } from '../../types';

import WelcomeSection from './components/WelcomeSection';
import StatsCard from './components/StatsCard';
import ProgressSection from './components/ProgressSection';
import ActionCard from './components/ActionCard';
import {
  calculateStats,
  getQuickActions,
  getSpeedDialActions,
  getProgressItems,
  hasErrors,
} from './helpers/statsHelpers';
import {
  ContenedorPrincipal,
  ContenedorGrid,
  ItemGrid,
  TituloSeccion,
  AlertaError,
  SpeedDialRapido,
} from './components/ComponentesGenericos';

const Inicio: React.FC = () => {
  // Example API calls - replace with actual endpoints
  const {
    data: conveniosData,
    isLoading: conveniosLoading,
    error: conveniosError,
  } = useApiQuery<Convenio[]>('/convenios');
  const {
    data: pasantiasData,
    isLoading: pasantiasLoading,
    error: pasantiasError,
  } = useApiQuery<Pasantia[]>('/pasantias');
  const {
    data: pagosData,
    isLoading: pagosLoading,
    error: pagosError,
  } = useApiQuery<Pago[]>('/pagos');

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
    <ContenedorPrincipal>
      <WelcomeSection
        title='Bienvenido al Sistema de Gestión de Pasantías'
        subtitle='Secretaría de Bienestar Estudiantil'
        statusLabel='Sistema Activo'
        statusColor='success'
      />

      {/* Stats Cards */}
      <ContenedorGrid>
        {stats.map((stat, index) => (
          <ItemGrid key={index}>
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
          </ItemGrid>
        ))}
      </ContenedorGrid>

      {/* Progress Section */}
      <ProgressSection title='Progreso del Sistema' items={progressItems} />

      {/* Quick Actions */}
      <TituloSeccion>Acciones Rápidas</TituloSeccion>
      <ContenedorGrid>
        {quickActions.map((action, index) => (
          <ItemGrid key={index}>
            <ActionCard
              title={action.title}
              description={action.description}
              icon={action.icon}
              color={action.color}
            />
          </ItemGrid>
        ))}
      </ContenedorGrid>

      {/* Error Display */}
      {hasErrors(!!conveniosError, !!pasantiasError, !!pagosError) && (
        <AlertaError mensaje='Error al cargar los datos. Por favor, intente nuevamente.' />
      )}

      {/* Speed Dial for Quick Actions */}
      <SpeedDialRapido actions={speedDialActions} icon={<Add />} />
    </ContenedorPrincipal>
  );
};

export default Inicio;
