import { styled } from '@mui/material/styles';
import {
  Card,
  CardActions,
  Box,
  Typography,
  Chip,
  Grid,
  TextField,
} from '@mui/material';

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

// Stats Component Styled Components
export const StatsContainerStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const StatsTitleStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: theme.spacing(3),
}));

export const StatCardStyled = styled(Card)<{ color?: string }>(
  ({ theme, color: _color = 'primary' }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    padding: theme.spacing(2),
    transition: 'box-shadow 0.2s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[4],
    },
  })
);

export const StatIconContainerStyled = styled(Box)<{ color?: string }>(
  ({ theme, color = 'primary' }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    '& > div': {
      padding: theme.spacing(1),
      borderRadius: '50%',
      backgroundColor: (() => {
        switch (color) {
          case 'primary':
            return theme.palette.primary.light;
          case 'success':
            return theme.palette.success.light;
          case 'error':
            return theme.palette.error.light;
          case 'warning':
            return theme.palette.warning.light;
          case 'info':
            return theme.palette.info.light;
          default:
            return theme.palette.primary.light;
        }
      })(),
      color: (() => {
        switch (color) {
          case 'primary':
            return theme.palette.primary.main;
          case 'success':
            return theme.palette.success.main;
          case 'error':
            return theme.palette.error.main;
          case 'warning':
            return theme.palette.warning.main;
          case 'info':
            return theme.palette.info.main;
          default:
            return theme.palette.primary.main;
        }
      })(),
    },
  })
);

export const StatValueStyled = styled(Typography)<{ color?: string }>(
  ({ theme, color = 'primary' }) => ({
    fontSize: '2rem',
    fontWeight: 'bold',
    color: (() => {
      switch (color) {
        case 'primary':
          return theme.palette.primary.main;
        case 'success':
          return theme.palette.success.main;
        case 'error':
          return theme.palette.error.main;
        case 'warning':
          return theme.palette.warning.main;
        case 'info':
          return theme.palette.info.main;
        default:
          return theme.palette.primary.main;
      }
    })(),
    marginBottom: theme.spacing(0.5),
  })
);

export const StatTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export const DistributionSectionStyled = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const DistributionTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
}));

export const DistributionChipsContainerStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const DistributionChipStyled = styled(Chip)(({ theme: _theme }) => ({
  fontSize: '0.75rem',
}));

// Grids Component Styled Components
export const GridContainerStyled = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(3),
}));

export const GridItemStyled = styled(Grid)(() => ({}));

export const EmptyStateStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  textAlign: 'center',
  minHeight: '200px',
}));

export const EmptyStateTitleStyled = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const EmptyStateTextStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

// FiltersForm Component Styled Components
export const FiltersContainerStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

export const FiltersGridStyled = styled(Grid)(({ theme: _theme }) => ({
  alignItems: 'center',
}));

export const FiltersInfoStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
}));

export const SearchFieldStyled = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.default,
  },
}));

export const FilterFieldStyled = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.default,
  },
}));

export const FiltersInfoTextStyled = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export const ClearFiltersChipStyled = styled(Chip)(({ theme: _theme }) => ({
  fontSize: '0.75rem',
}));
