import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Grid } from '@mui/material';
import { VigenciaType } from '../types';
import {
  ContenedorFiltros,
  ContenedorGridFiltros,
  ContenedorFiltrosInfo,
  CampoBusqueda,
  SelectorVigencia,
  SelectorTipoContrato,
  TextoSecundario,
  ChipLimpiarFiltros,
} from './ComponentesPersonalizados';

interface EmpresasFiltersProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  vigenciaFilter: string;
  onVigenciaChange: (vigencia: string) => void;
  tipoContratoFilter: string;
  onTipoContratoChange: (tipo: string) => void;
  totalEmpresas: number;
  filteredEmpresas: number;
  onClearFilters: () => void;
}

interface FiltersFormData {
  searchText: string;
  vigenciaFilter: VigenciaType | '';
  tipoContratoFilter: string;
}

const EmpresasFilters: React.FC<EmpresasFiltersProps> = ({
  searchText,
  onSearchChange,
  vigenciaFilter,
  onVigenciaChange,
  tipoContratoFilter,
  onTipoContratoChange,
  totalEmpresas,
  filteredEmpresas,
  onClearFilters,
}) => {
  const { control, register, watch, reset, setValue } =
    useForm<FiltersFormData>({
      defaultValues: {
        searchText: searchText || '',
        vigenciaFilter: (vigenciaFilter as VigenciaType) || '',
        tipoContratoFilter: tipoContratoFilter || '',
      },
    });

  const watchedValues = watch();

  useEffect(() => {
    setValue('searchText', searchText || '');
    setValue('vigenciaFilter', (vigenciaFilter as VigenciaType) || '');
    setValue('tipoContratoFilter', tipoContratoFilter || '');
  }, [searchText, vigenciaFilter, tipoContratoFilter, setValue]);

  useEffect(() => {
    onSearchChange(watchedValues.searchText || '');
  }, [watchedValues.searchText, onSearchChange]);
  useEffect(() => {
    onVigenciaChange(watchedValues.vigenciaFilter || '');
  }, [watchedValues.vigenciaFilter, onVigenciaChange]);
  useEffect(() => {
    onTipoContratoChange(watchedValues.tipoContratoFilter || '');
  }, [watchedValues.tipoContratoFilter, onTipoContratoChange]);

  const handleClearFilters = () => {
    reset({ searchText: '', vigenciaFilter: '', tipoContratoFilter: '' });
    onClearFilters();
  };

  const hasActiveFilters =
    watchedValues.searchText ||
    watchedValues.vigenciaFilter ||
    watchedValues.tipoContratoFilter;

  return (
    <ContenedorFiltros>
      <ContenedorGridFiltros>
        <Grid item xs={12} md={4}>
          <CampoBusqueda register={register('searchText')} />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Controller
            name='vigenciaFilter'
            control={control}
            render={({ field }) => <SelectorVigencia field={field} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Controller
            name='tipoContratoFilter'
            control={control}
            render={({ field }) => <SelectorTipoContrato field={field} />}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ContenedorFiltrosInfo>
            <TextoSecundario>
              {filteredEmpresas} de {totalEmpresas} empresas
            </TextoSecundario>
            {hasActiveFilters && (
              <ChipLimpiarFiltros onDelete={handleClearFilters} />
            )}
          </ContenedorFiltrosInfo>
        </Grid>
      </ContenedorGridFiltros>
    </ContenedorFiltros>
  );
};

export default EmpresasFilters;
