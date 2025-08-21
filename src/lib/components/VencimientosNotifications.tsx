import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import { Warning, ArrowForward } from '@mui/icons-material';
import { CardTitle, BodyText, CaptionText } from './StyledText';
import { SectionContainer, FlexContainer } from './StyledContainers';
import LoadingSpinner from './LoadingSpinner';

// Tipo genérico para elementos con vencimiento
export interface VencimientoItem {
  id: number;
  fechaVencimiento?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Propiedades adicionales específicas de cada tipo
}

// Configuración para cada tipo de notificación
export interface VencimientoConfig {
  title: string;
  icon: React.ReactNode;
  emptyMessage: string;
  emptySubtitle: string;
  getItemTitle: (item: VencimientoItem) => string;
  getItemSubtitle: (item: VencimientoItem) => string;
  onItemClick?: (item: VencimientoItem) => void;
  getDiasRestantes?: (fechaVencimiento: string) => number;
}

interface VencimientosNotificationsProps {
  items: VencimientoItem[];
  isLoading: boolean;
  error: Error | null;
  config: VencimientoConfig;
  onClose: () => void;
  maxItems?: number;
}

const VencimientosNotifications: React.FC<VencimientosNotificationsProps> = ({
  items,
  isLoading,
  error,
  config,
  onClose,
  maxItems = 100,
}) => {
  if (isLoading) {
    return (
      <SectionContainer>
        <LoadingSpinner message='Cargando notificaciones...' size={30} />
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
          secondary='No se pudieron cargar los datos'
        />
      </ListItem>
    );
  }

  if (!items || items.length === 0) {
    return (
      <ListItem>
        <ListItemIcon>{config.icon}</ListItemIcon>
        <ListItemText
          primary={config.emptyMessage}
          secondary={config.emptySubtitle}
        />
      </ListItem>
    );
  }

  // Función por defecto para calcular días restantes
  const getDiasRestantes =
    config.getDiasRestantes ||
    ((fechaVencimiento: string) => {
      const hoy = new Date();
      const fechaVenc = new Date(fechaVencimiento);
      const diferencia = Math.ceil(
        (fechaVenc.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diferencia;
    });

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

  const handleItemClick = (item: VencimientoItem) => {
    config.onItemClick?.(item);
    onClose();
  };

  return (
    <List dense>
      <ListItem>
        <CardTitle color='primary' sx={{ fontWeight: 'bold', mb: 0 }}>
          {config.title} ({items.length})
        </CardTitle>
      </ListItem>

      <ListItem>
        <CaptionText
          sx={{
            fontStyle: 'italic',
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          💡 Haz clic en cualquier elemento para ver sus detalles completos
        </CaptionText>
      </ListItem>

      {items.slice(0, maxItems).map((item: VencimientoItem) => {
        const diasRestantes = item.fechaVencimiento
          ? getDiasRestantes(item.fechaVencimiento)
          : 0;

        return (
          <ListItem
            key={item.id}
            button
            onClick={() => handleItemClick(item)}
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
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
                transform: 'translateX(2px)',
                transition: 'all 0.2s ease-in-out',
              },
            }}
          >
            <ListItemIcon>
              {React.cloneElement(config.icon as React.ReactElement, {
                color: getColorChip(diasRestantes),
              })}
            </ListItemIcon>

            <ListItemText
              primary={
                <FlexContainer sx={{ justifyContent: 'space-between' }}>
                  <BodyText sx={{ fontWeight: 500 }}>
                    {config.getItemTitle(item)}
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
                  <CaptionText>{config.getItemSubtitle(item)}</CaptionText>
                  {item.fechaVencimiento && (
                    <CaptionText>
                      Vence:{' '}
                      {new Date(item.fechaVencimiento).toLocaleDateString()}
                    </CaptionText>
                  )}
                </FlexContainer>
              }
            />
            <ArrowForward
              color='action'
              sx={{
                fontSize: 16,
                opacity: 0.6,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  opacity: 1,
                  transform: 'translateX(2px)',
                },
              }}
            />
          </ListItem>
        );
      })}

      {items.length > maxItems && (
        <ListItem>
          <ListItemText>
            <CaptionText sx={{ textAlign: 'center', width: '100%' }}>
              Y {items.length - maxItems} elementos más por vencer...
            </CaptionText>
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default VencimientosNotifications;
