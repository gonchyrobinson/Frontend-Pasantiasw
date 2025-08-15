import { GridColDef } from '@mui/x-data-grid';
import { ColumnMetadata } from '../types';
import { formatValue } from '../../ElementCardGenerica/helpers/elementCardHelper';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ActionContainer } from '../../components/StyledContainers';
import { BodyText } from '../../components/StyledText';

export const createColumnDefinitions = (
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

      // Renderizado especial para ciertos tipos (igual que ElementCard)
      // Note: checkbox/boolean types are not supported in ColumnMetadata

      return (
        <BodyText fontWeight={500} sx={{ wordBreak: 'break-word' }}>
          {formattedValue}
        </BodyText>
      );
    },
  }));

  // Agregar columna de acciones si hay acciones disponibles (igual que ElementCard)
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

export const getRowId = (row: Record<string, unknown>): string | number => {
  return (
    (row.id as string | number) ||
    (row._id as string | number) ||
    Math.random().toString(36).substr(2, 9)
  );
};
