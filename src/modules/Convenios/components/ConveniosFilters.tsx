import React, { useState, useEffect } from 'react';
import { SearchDialog } from '../../../lib/ElementCardGenerica';
import {
  getConvenioSearchMetadata,
  formatConvenioSearchFilters,
} from '../helpers/convenioSearchHelpers';
import { ConvenioEmpresaDto } from '../types';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { apiClient } from '../../Shared/apis/apiClient';
import { useEmpresasDropdown } from '../../../lib/hooks/useDropdownData';
import AsignarAEmpresaDialog from './AsignarAEmpresaDialog';

interface ConveniosFiltersProps {
  onSearchResults: (convenios: ConvenioEmpresaDto[]) => void;
  onClearResults: () => void;
  loading?: boolean;
  hasResults?: boolean;
}

const ConveniosFilters: React.FC<ConveniosFiltersProps> = ({
  onSearchResults,
  onClearResults,
  hasResults = false,
}) => {
  const { showError, showSuccess } = useSnackbar();
  const { empresasOptions, isLoading: empresasLoading } = useEmpresasDropdown();
  const [asignarEmpresaOpen, setAsignarEmpresaOpen] = React.useState(false);
  const [selectedConvenio, setSelectedConvenio] =
    React.useState<ConvenioEmpresaDto | null>(null);
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, Array<{ value: string | number; label: string }>>
  >({});

  // Cargar sugerencias al montar el componente
  useEffect(() => {
    const cargarSugerencias = async () => {
      try {
        // Cargar números de acuerdo marco únicos
        const numerosAcuerdoMarco = await apiClient.get<string[]>(
          '/convenios/sugerencias-acuerdos-marco'
        );

        setDynamicOptions({
          nombreEmpresa: empresasOptions || [],
          numeroAcuerdoMarco: numerosAcuerdoMarco.map(numero => ({
            value: numero,
            label: numero,
          })),
        });
      } catch (error) {
        console.error('Error al cargar sugerencias:', error);
        // Si falla la carga de números de acuerdo marco, al menos cargar empresas
        setDynamicOptions({
          nombreEmpresa: empresasOptions || [],
        });
      }
    };

    cargarSugerencias();
  }, [empresasOptions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchSubmit = async (filters: Record<string, any>) => {
    try {
      const searchFilters = formatConvenioSearchFilters(filters);
      const convenios = await apiClient.post<ConvenioEmpresaDto[]>(
        '/convenios/conEmpresa',
        searchFilters as Record<string, unknown>
      );
      onSearchResults(convenios);
      showSuccess('Búsqueda completada exitosamente');
    } catch (error) {
      showError('Error al realizar la búsqueda de convenios');
      throw error; // Re-lanzar para que SearchDialog maneje el cierre
    }
  };

  const handleCloseAsignarEmpresa = () => {
    setAsignarEmpresaOpen(false);
    setSelectedConvenio(null);
  };

  return (
    <>
      <SearchDialog
        title='Búsqueda Avanzada de Convenios'
        buttonText='Búsqueda Avanzada'
        metadata={getConvenioSearchMetadata()}
        onSubmit={handleSearchSubmit}
        onClearResults={onClearResults}
        hasResults={hasResults}
        dynamicDropdownOptions={dynamicOptions}
        loading={empresasLoading}
      />

      <AsignarAEmpresaDialog
        open={asignarEmpresaOpen}
        onClose={handleCloseAsignarEmpresa}
        convenio={selectedConvenio}
      />
    </>
  );
};

export default ConveniosFilters;
