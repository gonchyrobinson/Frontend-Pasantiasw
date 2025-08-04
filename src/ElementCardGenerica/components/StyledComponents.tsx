import { styled } from '@mui/material/styles';
import { Card, CardActions } from '@mui/material';

export const ElementCardStyled = styled(Card)<{ hasClickHandler?: boolean }>(
  ({ theme, hasClickHandler }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.2s ease-in-out',
    ...(hasClickHandler && {
      '&:hover': {
        boxShadow: theme.shadows[4],
        cursor: 'pointer',
      },
    }),
  })
);

export const CardActionsStyled = styled(CardActions)<{ isExpanded?: boolean }>(
  ({ theme, isExpanded }) => ({
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    paddingTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
    gap: theme.spacing(1),
    justifyContent: isExpanded ? 'space-between' : 'center',
  })
);
