import { Add } from '@mui/icons-material';
import React from 'react';
import { ActionCardProps } from '../types';
import {
  ActionCardContainer,
  IconoEstadistica,
  TituloAccion,
  DescripcionAccion,
  BotonAccion,
} from './ComponentesGenericos';
import { CardContentStyled, BoxFlexStyled } from './StyledComponents';

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick,
}) => {
  return (
    <ActionCardContainer onClick={onClick}>
      <CardContentStyled>
        <BoxFlexStyled>
          <IconoEstadistica color={color} bgColor={color}>
            {icon}
          </IconoEstadistica>
          <TituloAccion>{title}</TituloAccion>
        </BoxFlexStyled>
        <DescripcionAccion>{description}</DescripcionAccion>
        <BotonAccion _icon={<Add />}>{title}</BotonAccion>
      </CardContentStyled>
    </ActionCardContainer>
  );
};

export default ActionCard;
