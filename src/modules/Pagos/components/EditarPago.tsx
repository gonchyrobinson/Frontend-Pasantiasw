import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Alert, Breadcrumbs, Link, Box } from '@mui/material';
import { NavigateNext, ArrowBack } from '@mui/icons-material';
import { useSnackbar } from '../../../hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../FormularioGenerico';
import { useUpdatePago, usePago } from '../hooks/usePagos';
import { getPagosFormMetadata } from '../helpers/pagosHelpers';
import { PagosFormData } from '../types';
import { usePasantias } from '../../Pasantias/hooks/usePasantias';
import { LoadingSpinner } from '../../../lib/components';

const EditarPago: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showSuccess, showError } = useSnackbar();
  const updateMutation = useUpdatePago();
  const { data: pasantiasResponse, isLoading: pasantiasLoading } =
    usePasantias();
  const {
    data: pagoResponse,
    isLoading: pagoLoading,
    error: pagoError,
  } = usePago(Number(id));

  const [initialValues, setInitialValues] = useState<Record<string, unknown>>(
    {}
  );

  // Preparar valores iniciales cuando se cargan los datos del pago
  useEffect(() => {
    if (pagoResponse?.data) {
      const pago = pagoResponse.data;
      setInitialValues({
        idPasantia: pago.idPasantia || '',
        fechaPago: pago.fechaPago ? pago.fechaPago.split('T')[0] : '', // Formatear fecha para input date
        fechaVencimiento: pago.fechaVencimiento
          ? pago.fechaVencimiento.split('T')[0]
          : '', // Formatear fecha para input date
        monto: pago.monto || '',
        observaciones: pago.observaciones || '',
      });
    }
  }, [pagoResponse]);

  const handleSubmit = (data: PagosFormData) => {
    if (!id) return;

    const updateData = {
      ...data,
      idPago: Number(id),
    };

    updateMutation.mutate(
      updateData as PagosFormData & Record<string, unknown>,
      {
        onSuccess: () => {
          showSuccess('Pago actualizado exitosamente');
          navigate(ROUTES.PAGOS);
        },
        onError: () => {
          showError('Error al actualizar el pago');
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(ROUTES.PAGOS);
  };

  // Preparar opciones para el dropdown de pasantías
  const pasantias = pasantiasResponse || [];
  const dynamicDropdownOptions = {
    idPasantia: pasantias.map(pasantia => ({
      value: pasantia.idPasantia,
      label: `${pasantia.expediente}`,
    })),
  };

  if (pagoLoading || pasantiasLoading) {
    return <LoadingSpinner message='Cargando datos...' />;
  }

  if (pagoError) {
    return (
      <Alert severity='error' sx={{ mt: 2 }}>
        Error al cargar el pago: {pagoError.message}
      </Alert>
    );
  }

  if (!pagoResponse?.data) {
    return (
      <Alert severity='warning' sx={{ mt: 2 }}>
        No se encontró el pago especificado
      </Alert>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize='small' />}
          aria-label='breadcrumb'
        >
          <Link
            color='inherit'
            href='#'
            onClick={e => {
              e.preventDefault();
              navigate(ROUTES.PAGOS);
            }}
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <ArrowBack sx={{ mr: 0.5 }} fontSize='small' />
            Pagos
          </Link>
          <Typography color='text.primary'>Editar Pago #{id}</Typography>
        </Breadcrumbs>
      </Box>

      <Typography variant='h4' component='h1' gutterBottom>
        Editar Pago #{id}
      </Typography>

      <FormularioGenerico
        metadata={getPagosFormMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={updateMutation.isPending}
        dynamicDropdownOptions={dynamicDropdownOptions}
        initialValues={initialValues}
      />
    </div>
  );
};

export default EditarPago;
