import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Work } from '@mui/icons-material';
import { VisualizadorGenerico, DisplayMetadata } from '../../lib/components';
import { SecondaryButton } from '../../lib/components/StyledButtons';
import {
  FlexContainer,
  StatusBadgeContainer,
} from '../../lib/components/StyledContainers';
import { useApiQuery } from '../../lib/hooks/useApi';
import { PagosDto } from './types';
import { ROUTES } from '../../helpers/routesHelper';

const DetallePago: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: pago,
    isLoading,
    error,
    refetch,
  } = useApiQuery<PagosDto>(`${ROUTES.PAGOS}/${id}`);

  const handleVerPasantia = () => {
    if (pago?.data?.idPasantia) {
      navigate(`${ROUTES.PASANTIAS_DETALLE}/${pago.data.idPasantia}`);
    }
  };

  const metadata: DisplayMetadata = {
    title: 'Detalle del Pago',
    subtitle: 'Información completa del pago',
    showEditButton: true,
    showCopyButton: true,
    editButtonText: 'Editar',
    onEdit: () => navigate(`${ROUTES.PAGOS_EDITAR}/${id}`),
    sections: [
      {
        title: 'Información General',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'idPago',
            label: 'ID del Pago',
            type: 'number',
            gridSize: 6,
            prefix: 'PAGO-',
          },
          {
            name: 'monto',
            label: 'Monto',
            type: 'currency',
            gridSize: 6,
          },
          {
            name: 'pagado',
            label: 'Estado del Pago',
            type: 'custom',
            gridSize: 12,
            render: value => (
              <StatusBadgeContainer success={value}>
                {value ? 'Pagado' : 'No Pagado'}
              </StatusBadgeContainer>
            ),
          },
        ],
      },
      {
        title: 'Fechas Importantes',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'fechaPago',
            label: 'Fecha de Pago',
            type: 'date',
            gridSize: 6,
          },
          {
            name: 'fechaVencimiento',
            label: 'Fecha de Vencimiento',
            type: 'date',
            gridSize: 6,
          },
        ],
      },
      {
        title: 'Información Adicional',
        gridContainer: true,
        collapsible: true,
        defaultExpanded: true,
        fields: [
          {
            name: 'observaciones',
            label: 'Observaciones',
            type: 'text',
            gridSize: 12,
          },
        ],
      },
    ],
  };

  return (
    <>
      <VisualizadorGenerico
        metadata={metadata}
        data={pago?.data || {}}
        loading={isLoading}
        error={error?.message}
        onRetry={refetch}
      />

      {/* Botón Ver Pasantía */}
      {pago?.data?.idPasantia && (
        <FlexContainer sx={{ mt: 2, justifyContent: 'center' }}>
          <SecondaryButton
            startIcon={<Work />}
            onClick={handleVerPasantia}
            size='large'
          >
            Ver Pasantía
          </SecondaryButton>
        </FlexContainer>
      )}
    </>
  );
};

export default DetallePago;
