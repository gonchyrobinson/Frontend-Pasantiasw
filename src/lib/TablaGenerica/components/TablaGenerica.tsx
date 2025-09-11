import React, { useState, useMemo } from 'react';
import {
  DataGrid,
  GridRowParams,
  GridSortModel,
  GridFilterModel,
  GridColDef,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  SectionContainer,
  ActionContainer,
} from '../../components/StyledContainers';
import { BodyText } from '../../components/StyledText';
import { TablaGenericaProps, ColumnMetadata } from '../types';
import { LoadingSpinner, EmptyState, TablePageHeader } from '../../components';
import { FieldMetadata } from '../../ElementCardGenerica/types';
import { formatValue } from '../../../helpers/formatHelper';

/**
 * Obtiene el ID de una fila de la tabla
 * Busca primero 'id', luego '_id', y lanza error si no encuentra ninguno
 * @throws {Error} Si la fila no tiene un ID válido
 */
const getRowId = (row: Record<string, unknown>): string | number => {
  const id = (row.id as string | number) || (row._id as string | number);

  if (!id) {
    throw new Error(`Fila sin ID válido: ${JSON.stringify(row)}`);
  }

  return id;
};

/**
 * Crea las definiciones de columnas para la DataGrid
 * Incluye columnas de datos y columna de acciones si es necesario
 */
const createColumnDefinitions = (
  columns: ColumnMetadata[],
  onRowEdit?: (row: Record<string, unknown>) => void,
  onRowDelete?: (row: Record<string, unknown>) => void,
  extraButtons?: Array<{
    label: string;
    onClick: (row: Record<string, unknown>) => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: React.ReactNode;
  }>
): GridColDef[] => {
  const dataColumns: GridColDef[] = columns.map(column => ({
    field: column.name,
    headerName: column.label,
    width: column.width || 150,
    sortable: column.sortable !== false,
    filterable: column.filterable !== false,
    renderCell: params => {
      if (column.renderCell) {
        return column.renderCell(params.value);
      }

      const field = {
        name: column.name,
        label: column.label,
        type: column.type,
      };
      const formattedValue = formatValue(params.value, field);

      return (
        <BodyText fontWeight={500} sx={{ wordBreak: 'break-word' }}>
          {formattedValue}
        </BodyText>
      );
    },
  }));

  // Agregar columna de acciones si hay acciones disponibles
  if (onRowEdit || onRowDelete || extraButtons?.length) {
    // Calcular el ancho necesario basado en la cantidad de botones
    const totalButtons =
      (onRowEdit ? 1 : 0) + (onRowDelete ? 1 : 0) + (extraButtons?.length || 0);
    const buttonWidth = 120; // Ancho aproximado de cada botón
    const gap = 8; // Espacio entre botones
    const padding = 16; // Padding de la celda
    const minWidth = Math.max(
      300,
      totalButtons * buttonWidth + (totalButtons - 1) * gap + padding
    );

    dataColumns.push({
      field: 'actions',
      headerName: 'Acciones',
      width: minWidth,
      sortable: false,
      filterable: false,
      renderCell: params => (
        <ActionContainer>
          {onRowEdit && (
            <Button
              size='small'
              startIcon={<EditIcon />}
              onClick={e => {
                e.stopPropagation();
                onRowEdit(params.row);
              }}
              color='primary'
              variant='outlined'
              sx={{
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Editar
            </Button>
          )}

          {onRowDelete && (
            <Button
              size='small'
              startIcon={<DeleteIcon />}
              onClick={e => {
                e.stopPropagation();
                onRowDelete(params.row);
              }}
              color='error'
              variant='outlined'
              sx={{
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Eliminar
            </Button>
          )}

          {extraButtons?.map((button, index) => (
            <Button
              key={index}
              size='small'
              startIcon={button.icon}
              onClick={e => {
                e.stopPropagation();
                button.onClick(params.row);
              }}
              color={button.color || 'primary'}
              variant={button.variant || 'outlined'}
              sx={{
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {button.label}
            </Button>
          ))}
        </ActionContainer>
      ),
    });
  }

  return dataColumns;
};

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
