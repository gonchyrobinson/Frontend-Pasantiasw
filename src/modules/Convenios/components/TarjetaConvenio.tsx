import { Edit, Delete, Warning, Business } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { ConvenioEmpresaDto } from '../types';
import {
  TarjetaConvenioStyled,
  ContenidoTarjetaStyled,
  TituloExpedienteStyled,
  InfoEmpresaStyled,
  FechasConvenioStyled,
  FechaStyled,
  ChipEstadoStyled,
  ContenedorAccionesStyled,
  BotonAccionStyled,
} from './StyledComponents';

// Componente de tarjeta de convenio

export const TarjetaConvenio = ({
  convenio,
  onEdit,
  onDelete,
  onCaducar,
  onAsignarEmpresa,
}: {
  convenio: ConvenioEmpresaDto;
  onEdit: () => void;
  onDelete: () => void;
  onCaducar: () => void;
  onAsignarEmpresa: () => void;
}) => {
  const getChipColor = () => {
    if (!convenio.fechaCaducidad) return 'default';
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    const hoy = new Date();
    const diasRestantes = Math.ceil(
      (fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diasRestantes < 0) return 'error';
    if (diasRestantes <= 30) return 'warning';
    return 'success';
  };

  const getEstadoText = () => {
    if (!convenio.fechaCaducidad) return 'Sin fecha de caducidad';
    const fechaCaducidad = new Date(convenio.fechaCaducidad);
    const hoy = new Date();
    const diasRestantes = Math.ceil(
      (fechaCaducidad.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diasRestantes < 0) return 'Caducado';
    if (diasRestantes <= 30) return 'Por vencer';
    return 'Vigente';
  };

  return (
    <TarjetaConvenioStyled>
      <ContenidoTarjetaStyled>
        <TituloExpedienteStyled>
          {convenio.expediente || 'Sin expediente'}
        </TituloExpedienteStyled>

        <InfoEmpresaStyled>
          <strong>Empresa:</strong>{' '}
          {convenio.nombreEmpresa || 'Sin empresa asignada'}
        </InfoEmpresaStyled>

        <FechasConvenioStyled>
          <FechaStyled>
            <strong>Firma:</strong>{' '}
            {convenio.fechaFirma
              ? new Date(convenio.fechaFirma).toLocaleDateString()
              : 'No especificada'}
          </FechaStyled>
          <FechaStyled>
            <strong>Caducidad:</strong>{' '}
            {convenio.fechaCaducidad
              ? new Date(convenio.fechaCaducidad).toLocaleDateString()
              : 'No especificada'}
          </FechaStyled>
        </FechasConvenioStyled>

        <ChipEstadoStyled
          label={getEstadoText()}
          color={getChipColor()}
          size='small'
        />
      </ContenidoTarjetaStyled>

      <ContenedorAccionesStyled>
        <Tooltip title='Editar'>
          <BotonAccionStyled onClick={onEdit} color='primary'>
            <Edit />
          </BotonAccionStyled>
        </Tooltip>

        <Tooltip title='Eliminar'>
          <BotonAccionStyled onClick={onDelete} color='error'>
            <Delete />
          </BotonAccionStyled>
        </Tooltip>

        <Tooltip title='Caducar'>
          <BotonAccionStyled onClick={onCaducar} color='warning'>
            <Warning />
          </BotonAccionStyled>
        </Tooltip>

        <Tooltip title='Asignar Empresa'>
          <BotonAccionStyled onClick={onAsignarEmpresa} color='info'>
            <Business />
          </BotonAccionStyled>
        </Tooltip>
      </ContenedorAccionesStyled>
    </TarjetaConvenioStyled>
  );
};
