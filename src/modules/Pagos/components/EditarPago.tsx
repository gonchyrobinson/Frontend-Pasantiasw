import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Breadcrumbs, Link } from '@mui/material';
import { SectionContainer } from '../../../lib/components/StyledContainers';
import { PageTitle, BodyText } from '../../../lib/components/StyledText';
import { NavigateNext, ArrowBack } from '@mui/icons-material';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { useUpdatePago, usePago } from '../hooks/usePagos';
import { usePasantiasDropdown } from '../../../lib/hooks/useDropdownData';
import { getPagosFormMetadata } from '../helpers/pagosHelpers';
import { LoadingSpinner } from '../../../lib/components';
import { PagosDto } from '../types';

const EditarPago: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showSuccess } = useSnackbar();
  const updateMutation = useUpdatePago();
  const { pasantiasOptions, isLoading: pasantiasLoading } =
    usePasantiasDropdown();
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
        fechaVencimiento:
          pago.fechaVencimiento && typeof pago.fechaVencimiento === 'string'
            ? pago.fechaVencimiento.split('T')[0]
            : '', // Formatear fecha para input date
        monto: pago.monto || '',
        observaciones: pago.observaciones || '',
      });
    }
  }, [pagoResponse]);

  const handleSubmit = async (data: Record<string, unknown>) => {
    if (!id) return;
    const updateData = {
      ...data,
      idPago: Number(id),
    };
    await updateMutation.mutateAsync(updateData as unknown as PagosDto);
    showSuccess('Pago actualizado exitosamente');
    navigate(`${ROUTES.PAGOS_DETALLE}/${id}`);
  };

  const handleCancel = () => {
    navigate(ROUTES.PAGOS);
  };

  // Las opciones ya vienen formateadas desde el hook
  const dynamicDropdownOptions = {
    idPasantia: pasantiasOptions || [],
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
      <SectionContainer sx={{ mb: 3 }}>
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
          <BodyText color='text.primary'>Editar Pago #{id}</BodyText>
        </Breadcrumbs>
      </SectionContainer>

      <PageTitle component='h1' gutterBottom>
        Editar Pago #{id}
      </PageTitle>

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
