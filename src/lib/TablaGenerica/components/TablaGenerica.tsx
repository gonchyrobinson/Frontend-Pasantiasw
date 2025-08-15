import React, { useState, useMemo } from 'react';
import {
  DataGrid,
  GridRowParams,
  GridSortModel,
  GridFilterModel,
} from '@mui/x-data-grid';
import { SectionContainer } from '../../components/StyledContainers';
import { TablaGenericaProps } from '../types';
import {
  createColumnDefinitions,
  getRowId,
} from '../helpers/tablaGenericaHelper.tsx';
import { LoadingSpinner, EmptyState, TablePageHeader } from '../../components';
import { FieldMetadata } from '../../ElementCardGenerica/types';

const TablaGenerica: React.FC<TablaGenericaProps> = ({
  columns,
  data,
  title,
  subtitle,
  loading = false,
  onRowClick,
  onRowEdit,
  onRowDelete,
  extraButtons,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  disableSelection = false,
  disableSorting = false,
  disableFiltering = false,
  emptyStateTitle = 'No hay datos',
  emptyStateText = 'No se encontraron registros para mostrar',
  initialSortModel,
  initialFilterModel,
  metadata, // Soporte para metadata similar a ElementCardGenerica
  onRefresh,
  isRefreshing,
  onPageAction,
  pageActionText,
  headerVariant = 'default',
}) => {
  const [sortModel, setSortModel] = useState<GridSortModel>(
    initialSortModel || []
  );
  const [filterModel, setFilterModel] = useState<GridFilterModel>(
    initialFilterModel || { items: [] }
  );

  // Validar que se proporcione metadata o columns
  if (!metadata && !columns) {
    throw new Error('TablaGenerica requiere metadata o columns para funcionar');
  }

  // Si se proporciona metadata, convertirla a columns
  const finalColumns = useMemo(() => {
    if (metadata) {
      return metadata.map((field: FieldMetadata) => ({
        name: field.name,
        label: field.label,
        type: field.type,
        width: 150,
        sortable: true,
        filterable: true,
      }));
    }
    return columns || [];
  }, [metadata, columns]);

  const columnDefinitions = useMemo(
    () =>
      createColumnDefinitions(
        finalColumns,
        onRowEdit,
        onRowDelete,
        extraButtons
      ),
    [finalColumns, onRowEdit, onRowDelete, extraButtons]
  );

  const rowsWithIds = useMemo(
    () => data.map(row => ({ ...row, id: getRowId(row) })),
    [data]
  );

  const handleRowClick = (params: GridRowParams) => {
    if (onRowClick) {
      onRowClick(params.row);
    }
  };

  const handleSortModelChange = (newSortModel: GridSortModel) => {
    setSortModel(newSortModel);
  };

  const handleFilterModelChange = (newFilterModel: GridFilterModel) => {
    setFilterModel(newFilterModel);
  };

  if (loading) {
    return <LoadingSpinner message='Cargando datos...' />;
  }

  if (data.length === 0) {
    return <EmptyState title={emptyStateTitle} subtitle={emptyStateText} />;
  }

  return (
    <SectionContainer sx={{ height: 600, width: '100%' }}>
      <TablePageHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        onAction={onPageAction}
        actionButtonText={pageActionText}
      />

      <DataGrid
        rows={rowsWithIds}
        columns={columnDefinitions}
        initialState={{
          pagination: {
            paginationModel: { pageSize },
          },
        }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={!disableSelection}
        disableRowSelectionOnClick={!disableSelection}
        onRowClick={handleRowClick}
        sortModel={disableSorting ? undefined : sortModel}
        onSortModelChange={disableSorting ? undefined : handleSortModelChange}
        filterModel={disableFiltering ? undefined : filterModel}
        onFilterModelChange={
          disableFiltering ? undefined : handleFilterModelChange
        }
        disableColumnFilter={disableFiltering}
        disableColumnSorting={disableSorting}
        disableColumnMenu={disableFiltering && disableSorting}
        sx={{
          '& .MuiDataGrid-row:hover': onRowClick ? { cursor: 'pointer' } : {},
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'background.paper',
            borderBottom: '2px solid',
            borderColor: 'divider',
          },
        }}
      />
    </SectionContainer>
  );
};

export default TablaGenerica;
