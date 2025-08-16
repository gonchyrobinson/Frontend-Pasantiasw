import React from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getPasantiaSearchMetadata,
  formatPasantiaSearchFilters,
} from '../helpers/pasantiaSearchHelpers';
import { PasantiaDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';

interface PasantiaFiltersProps {
  pasantias: PasantiaDto[];
  onSearchResults: (pasantias: PasantiaDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

const PasantiaFilters: React.FC<PasantiaFiltersProps> = ({
  pasantias,
  onSearchResults,
  onClearResults,
  hasResults = false,
}) => {
  const { showSuccess } = useSnackbar();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatPasantiaSearchFilters(filters);
      const filteredPasantias = filterPasantiasLocally(
        pasantias,
        searchFilters
      );
      onSearchResults(filteredPasantias);
      showSuccess(
        `Búsqueda completada: ${filteredPasantias.length} pasantías encontradas`
      );
    } catch (error) {
      console.error('Error en búsqueda local:', error);
      showSuccess('Búsqueda completada');
    }
  };

  // Función para filtrar pasantías localmente
  const filterPasantiasLocally = (
    pasantias: PasantiaDto[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filters: Record<string, any>
  ): PasantiaDto[] => {
    return pasantias.filter(pasantia => {
      // Filtro por expediente
      if (
        filters.expediente &&
        !pasantia.expediente
          ?.toLowerCase()
          .includes(filters.expediente.toLowerCase())
      ) {
        return false;
      }

      // Filtro por obra social
      if (
        filters.obraSocial &&
        !pasantia.obraSocial
          ?.toLowerCase()
          .includes(filters.obraSocial.toLowerCase())
      ) {
        return false;
      }

      // Filtro por ART
      if (
        filters.art &&
        !pasantia.art?.toLowerCase().includes(filters.art.toLowerCase())
      ) {
        return false;
      }

      // Filtro por tutor empresa
      if (
        filters.tutorEmpresa &&
        !pasantia.tutorEmpresa
          ?.toLowerCase()
          .includes(filters.tutorEmpresa.toLowerCase())
      ) {
        return false;
      }

      // Filtro por tutor facultad
      if (
        filters.tutorFacultad &&
        !pasantia.tutorFacultad
          ?.toLowerCase()
          .includes(filters.tutorFacultad.toLowerCase())
      ) {
        return false;
      }

      // Filtro por tipo de acuerdo
      if (filters.tipoAcuerdo && pasantia.tipoAcuerdo !== filters.tipoAcuerdo) {
        return false;
      }

      // Filtros de fecha de inicio
      if (filters.fechaInicioDesde) {
        const fechaInicio = new Date(pasantia.fechaInicio);
        const fechaDesde = new Date(filters.fechaInicioDesde);
        if (fechaInicio < fechaDesde) {
          return false;
        }
      }

      if (filters.fechaInicioHasta) {
        const fechaInicio = new Date(pasantia.fechaInicio);
        const fechaHasta = new Date(filters.fechaInicioHasta);
        if (fechaInicio > fechaHasta) {
          return false;
        }
      }

      // Filtros de fecha de fin
      if (filters.fechaFinDesde) {
        const fechaFin = new Date(pasantia.fechaFin);
        const fechaDesde = new Date(filters.fechaFinDesde);
        if (fechaFin < fechaDesde) {
          return false;
        }
      }

      if (filters.fechaFinHasta) {
        const fechaFin = new Date(pasantia.fechaFin);
        const fechaHasta = new Date(filters.fechaFinHasta);
        if (fechaFin > fechaHasta) {
          return false;
        }
      }

      // Filtros de asignación mensual
      if (
        filters.asignacionMensualMin &&
        pasantia.asignacionMensual < Number(filters.asignacionMensualMin)
      ) {
        return false;
      }

      if (
        filters.asignacionMensualMax &&
        pasantia.asignacionMensual > Number(filters.asignacionMensualMax)
      ) {
        return false;
      }

      return true;
    });
  };

  return (
    <SearchDialog
      title='Búsqueda Avanzada de Pasantías'
      buttonText='Búsqueda Avanzada'
      metadata={getPasantiaSearchMetadata()}
      onSubmit={handleSearchSubmit}
      onClearResults={onClearResults}
      hasResults={hasResults}
    />
  );
};

export default PasantiaFilters;
