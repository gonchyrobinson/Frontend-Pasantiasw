import React from 'react';
import { Grid } from '@mui/material';
import { ElementCard } from '../index';
import { GridsProps } from '../types';
import {
  EmptyStateStyled,
  EmptyStateTitleStyled,
  EmptyStateTextStyled,
} from './StyledComponents';

const Grids: React.FC<GridsProps> = ({
  items,
  metadata,
  getCardTitle,
  getCardSubtitle,
  onItemClick,
  onItemEdit,
  onItemDelete,
  getExtraButtons,
  emptyStateTitle,
  emptyStateText,
}) => {
  if (items.length === 0) {
    return (
      <EmptyStateStyled>
        <EmptyStateTitleStyled variant='h6' gutterBottom>
          {emptyStateTitle}
        </EmptyStateTitleStyled>
        <EmptyStateTextStyled variant='body2'>
          {emptyStateText}
        </EmptyStateTextStyled>
      </EmptyStateStyled>
    );
  }

  return (
    <Grid container spacing={3}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <ElementCard
            metadata={metadata}
            data={item as Record<string, unknown>}
            title={getCardTitle(item)}
            subtitle={getCardSubtitle(item)}
            onClick={onItemClick ? () => onItemClick(item) : undefined}
            onClickEdit={onItemEdit ? () => onItemEdit(item) : undefined}
            onClickEliminar={
              onItemDelete ? () => onItemDelete(item) : undefined
            }
            extraButtons={getExtraButtons ? getExtraButtons(item) : undefined}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Grids;
