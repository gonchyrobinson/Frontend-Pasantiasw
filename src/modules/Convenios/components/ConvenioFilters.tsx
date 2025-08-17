import React from 'react';
import { Button, TextField, styled } from '@mui/material';
import {
  FlexContainer,
  GridContainer,
} from '../../../lib/components/StyledContainers';
import { Clear } from '@mui/icons-material';
import { Section } from '../../../lib/components/Section';
import { ConvenioFilters as ConvenioFiltersType } from '../types';

interface ConvenioFiltersProps {
  filters: ConvenioFiltersType;
  onFiltersChange: (filters: ConvenioFiltersType) => void;
  onClearFilters: () => void;
}

const FilterContainer = styled(FlexContainer)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ConvenioFilters: React.FC<ConvenioFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const handleChange = (field: keyof ConvenioFiltersType, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value || undefined,
    });
  };

  return (
    <Section>
      <FilterContainer>
        <TextField
          label='Buscar por expediente'
          value={filters.expediente || ''}
          onChange={e => handleChange('expediente', e.target.value)}
          size='small'
          sx={{ flexGrow: 1 }}
        />
        <TextField
          label='Buscar por empresa'
          value={filters.empresa || ''}
          onChange={e => handleChange('empresa', e.target.value)}
          size='small'
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant='outlined'
          startIcon={<Clear />}
          onClick={onClearFilters}
          size='small'
        >
          Limpiar
        </Button>
      </FilterContainer>

      <GridContainer container spacing={2}>
        <GridContainer item xs={12} sm={6} md={3}>
          <TextField
            label='Fecha de firma desde'
            type='date'
            value={filters.fechaFirmaDesde || ''}
            onChange={e => handleChange('fechaFirmaDesde', e.target.value)}
            size='small'
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </GridContainer>
        <GridContainer item xs={12} sm={6} md={3}>
          <TextField
            label='Fecha de firma hasta'
            type='date'
            value={filters.fechaFirmaHasta || ''}
            onChange={e => handleChange('fechaFirmaHasta', e.target.value)}
            size='small'
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </GridContainer>
        <GridContainer item xs={12} sm={6} md={3}>
          <TextField
            label='Fecha de caducidad desde'
            type='date'
            value={filters.fechaCaducidadDesde || ''}
            onChange={e => handleChange('fechaCaducidadDesde', e.target.value)}
            size='small'
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </GridContainer>
        <GridContainer item xs={12} sm={6} md={3}>
          <TextField
            label='Fecha de caducidad hasta'
            type='date'
            value={filters.fechaCaducidadHasta || ''}
            onChange={e => handleChange('fechaCaducidadHasta', e.target.value)}
            size='small'
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </GridContainer>
      </GridContainer>
    </Section>
  );
};

export default ConvenioFilters;
