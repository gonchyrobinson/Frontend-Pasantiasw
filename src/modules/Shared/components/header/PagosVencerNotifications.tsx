import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import { Payment, Warning } from '@mui/icons-material';
import { usePagosPorVencer } from '../../../Pagos/hooks/usePagosPorVencer';
import { PagosDto } from '../../../Pagos/types';
import { LoadingSpinner } from '../../../../lib/components';
import {
  CardTitle,
  BodyText,
  CaptionText,
} from '../../../../lib/components/StyledText';
import {
  SectionContainer,
  FlexContainer,
} from '../../../../lib/components/StyledContainers';

interface PagosVencerNotificationsProps {
  onClose: () => void;
  onNavigateToPago?: (pagoId: number) => void;
}

const PagosVencerNotifications: React.FC<PagosVencerNotificationsProps> = ({
  onClose,
  onNavigateToPago,
}) => {
  const { data: pagos, isLoading, error } = usePagosPorVencer();

  if (isLoading) {
    return (
      <SectionContainer>
        <LoadingSpinner message='Cargando pagos por vencer...' size={30} />
      </SectionContainer>
    );
  }

  if (error) {
    return (
      <ListItem>
        <ListItemIcon>
          <Warning color='error' />
        </ListItemIcon>
        <ListItemText
          primary='Error al cargar notificaciones'
          secondary='No se pudieron cargar los pagos por vencer'
        />
      </ListItem>
    );
  }

  if (!pagos || pagos.length === 0) {
    return (
      <ListItem>
        <ListItemIcon>
          <Payment color='success' />
        </ListItemIcon>
        <ListItemText
          primary='No hay pagos por vencer'
          secondary='Todos los pagos están al día'
        />
      </ListItem>
    );
  }

  const getDiasRestantes = (fechaVencimiento: string) => {
    const hoy = new Date();
    const fechaVenc = new Date(fechaVencimiento);
    const diferencia = Math.ceil(
      (fechaVenc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diferencia;
  };

  const getColorChip = (dias: number) => {
    if (dias <= 0) return 'error';
    if (dias <= 7) return 'warning';
    return 'info';
  };

  const getTextoUrgencia = (dias: number) => {
    if (dias <= 0) return 'Vencido';
    if (dias === 1) return 'Vence hoy';
    if (dias <= 7) return `${dias} días`;
    return `${dias} días`;
  };

  return (
    <List dense>
      <ListItem>
        <CardTitle color='primary' sx={{ fontWeight: 'bold', mb: 0 }}>
          Pagos por Vencer ({pagos.length})
        </CardTitle>
      </ListItem>

      {pagos.slice(0, 5).map((pago: PagosDto) => {
        const diasRestantes = getDiasRestantes(pago.fechaVencimiento || '');

        return (
          <ListItem
            key={pago.idPago}
            button
            onClick={() => {
              onNavigateToPago?.(pago.idPago);
              onClose();
            }}
            sx={{
              borderLeft: 3,
              borderColor:
                getColorChip(diasRestantes) === 'error'
                  ? 'error.main'
                  : getColorChip(diasRestantes) === 'warning'
                    ? 'warning.main'
                    : 'info.main',
              mb: 0.5,
              borderRadius: 1,
            }}
          >
            <ListItemIcon>
              <Payment color={getColorChip(diasRestantes)} />
            </ListItemIcon>

            <ListItemText
              primary={
                <FlexContainer sx={{ justifyContent: 'space-between' }}>
                  <BodyText sx={{ fontWeight: 500 }}>
                    Pago ID: {pago.idPago}
                  </BodyText>
                  <Chip
                    size='small'
                    label={getTextoUrgencia(diasRestantes)}
                    color={getColorChip(diasRestantes)}
                    variant='outlined'
                  />
                </FlexContainer>
              }
              secondary={
                <FlexContainer
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 0.5,
                  }}
                >
                  <CaptionText>
                    Monto: ${pago.monto?.toLocaleString() || 'N/A'}
                  </CaptionText>
                  <CaptionText>
                    Vence:{' '}
                    {pago.fechaVencimiento
                      ? new Date(pago.fechaVencimiento).toLocaleDateString()
                      : 'N/A'}
                  </CaptionText>
                </FlexContainer>
              }
            />
          </ListItem>
        );
      })}

      {pagos.length > 5 && (
        <ListItem>
          <ListItemText>
            <CaptionText sx={{ textAlign: 'center', width: '100%' }}>
              Y {pagos.length - 5} pagos más por vencer...
            </CaptionText>
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default PagosVencerNotifications;
