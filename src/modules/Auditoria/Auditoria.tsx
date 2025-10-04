import React, { useState } from 'react';

import {
  MainContainer,
  CenteredContainer,
  SectionContainer,
} from '../../lib/components/StyledContainers';
import { CardTitle, BodyText } from '../../lib/components/StyledText';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { AuditoriaDto } from './types';
import AuditoriaFilters from './components/AuditoriaFilters';
import AuditoriaTabla from './components/AuditoriaTabla';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { PageHeader, LoadingSpinner } from '../../lib/components';

const Auditoria: React.FC = () => {
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState<AuditoriaDto[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleClearSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
  };

  const handleSearchResults = (auditorias: AuditoriaDto[]) => {
    setSearchResults(auditorias);
    setHasSearched(true);

    if (auditorias.length === 0) {
      showSuccess('Búsqueda completada. No se encontraron registros.');
    } else {
      showSuccess(
        `Se encontraron ${auditorias.length} registros de auditoría.`
      );
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Limpiar resultados para forzar nueva búsqueda
      handleClearSearch();
      showSuccess('Vista actualizada. Realice una nueva búsqueda.');
    } catch (error) {
      showError('Error al actualizar la vista. Inténtalo de nuevo.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleVerDetalle = (auditoria: AuditoriaDto) => {
    // Por ahora solo mostramos un mensaje, se puede expandir para mostrar un modal con detalles
    showSuccess(`Registro de auditoría ID: ${auditoria.idAuditoria}`);
  };

  if (isRefreshing) {
    return (
      <MainContainer>
        <LoadingSpinner message='Actualizando vista...' />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <PageHeader
        title='Auditoría del Sistema'
        subtitle='Consulta los registros de auditoría y actividad del sistema'
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <AuditoriaFilters
        onSearchResults={handleSearchResults}
        onClearResults={handleClearSearch}
        loading={isRefreshing}
        hasResults={hasSearched && searchResults.length > 0}
      />

      {/* Vista principal con TablaGenerica */}
      {hasSearched && searchResults.length > 0 && (
        <SectionContainer sx={{ mb: 3 }}>
          <AuditoriaTabla
            auditorias={searchResults}
            loading={isRefreshing}
            onRowClick={handleVerDetalle}
          />
        </SectionContainer>
      )}

      {/* Estado vacío cuando no hay búsqueda */}
      {!hasSearched && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            Consulta de Auditoría
          </CardTitle>
          <BodyText color='text.secondary'>
            Utiliza los filtros de búsqueda para consultar los registros de
            auditoría del sistema
          </BodyText>
        </CenteredContainer>
      )}

      {/* Estado vacío cuando no hay resultados */}
      {hasSearched && searchResults.length === 0 && (
        <CenteredContainer sx={{ textAlign: 'center', py: 8 }}>
          <CardTitle color='text.secondary' gutterBottom>
            No se encontraron registros
          </CardTitle>
          <BodyText color='text.secondary'>
            Intenta con diferentes criterios de búsqueda (fechas, usuario,
            acción)
          </BodyText>
        </CenteredContainer>
      )}

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </MainContainer>
  );
};

export default Auditoria;
