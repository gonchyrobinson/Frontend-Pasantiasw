import React, { useState } from 'react';
import {
  CardContent,
  Button,
  Box,
  Chip,
  CardActionArea,
  IconButton,
} from '@mui/material';
import {
  CardTitle,
  Subtitle,
  CaptionText,
  BodyText,
} from '../../components/StyledText';
import {
  Edit as EditIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { ElementCardProps } from '../types';
import { formatValue, detectType } from '../helpers/elementCardHelper';
import { ElementCardStyled, CardActionsStyled } from './StyledComponents';

const ElementCard: React.FC<ElementCardProps> = ({
  metadata,
  data,
  onClick,
  onClickEdit,
  onClickEliminar,
  title,
  subtitle,
  extraButtons = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Solo mostrar los campos definidos en la metadata
  const fieldsToShow = metadata;

  const cardContent = (
    <CardContent>
      {title && (
        <CardTitle component='h2' gutterBottom>
          {title}
        </CardTitle>
      )}
      {subtitle && <Subtitle gutterBottom>{subtitle}</Subtitle>}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.25,
          maxHeight: isExpanded ? '1000px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        }}
      >
        {fieldsToShow.map((field, index) => {
          const value = data[field.name];
          const fieldType = field.type || detectType(value);

          return (
            <Box key={field.name}>
              <Box
                sx={{
                  p: 0.75,
                  backgroundColor: 'background.paper',
                }}
              >
                <CaptionText display='block' sx={{ mb: 0.25, fontWeight: 600 }}>
                  {field.label}
                </CaptionText>
                {fieldType === 'checkbox' ? (
                  <Chip
                    label={formatValue(value, field)}
                    size='small'
                    color={value ? 'success' : 'default'}
                    variant='outlined'
                  />
                ) : (
                  <BodyText fontWeight={500} sx={{ wordBreak: 'break-word' }}>
                    {formatValue(value, field)}
                  </BodyText>
                )}
              </Box>
              {index < fieldsToShow.length - 1 && <Box sx={{ height: 2 }} />}
            </Box>
          );
        })}
      </Box>
    </CardContent>
  );

  return (
    <ElementCardStyled hasClickHandler={!!onClick}>
      {onClick ? (
        <CardActionArea onClick={onClick} sx={{ flexGrow: 1 }}>
          {cardContent}
        </CardActionArea>
      ) : (
        cardContent
      )}

      <CardActionsStyled isExpanded={isExpanded}>
        {isExpanded && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {onClickEdit && (
              <Button
                size='small'
                startIcon={<EditIcon />}
                onClick={onClickEdit}
                color='primary'
                variant='outlined'
              >
                Editar
              </Button>
            )}
            {onClickEliminar && (
              <Button
                size='small'
                startIcon={<DeleteIcon />}
                onClick={onClickEliminar}
                color='error'
                variant='outlined'
              >
                Eliminar
              </Button>
            )}
            {extraButtons.map((button, index) => (
              <Button
                key={index}
                size='small'
                startIcon={button.icon}
                onClick={button.onClick}
                color={button.color || 'primary'}
                variant={button.variant || 'outlined'}
              >
                {button.label}
              </Button>
            ))}
          </Box>
        )}
        <IconButton
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}
          color='primary'
        >
          {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
        </IconButton>
      </CardActionsStyled>
    </ElementCardStyled>
  );
};

export default ElementCard;
