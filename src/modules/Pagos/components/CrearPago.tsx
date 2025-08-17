import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Link } from '@mui/material';
import { SectionContainer } from '../../../lib/components/StyledContainers';
import { PageTitle, BodyText } from '../../../lib/components/StyledText';
import { NavigateNext, ArrowBack } from '@mui/icons-material';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { useCreatePago } from '../hooks/usePagos';
import { usePasantiasDropdown } from '../../../lib/hooks/useDropdownData';
import { getPagosFormMetadata } from '../helpers/pagosHelpers';
import { PagosFormData } from '../types';
import { LoadingSpinner } from '../../../lib/components';

const CrearPago: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();
  const createMutation = useCreatePago();
  const { pasantiasOptions, isLoading: pasantiasLoading } =
    usePasantiasDropdown();

  const handleSubmit = (data: Record<string, unknown>) => {
    createMutation.mutate(data as PagosFormData & Record<string, unknown>, {
      onSuccess: () => {
        showSuccess('Pago creado exitosamente');
        navigate(ROUTES.PAGOS);
      },
      onError: () => {
        showError('Error al crear el pago');
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTES.PAGOS);
  };

  // Las opciones ya vienen formateadas desde el hook
  const dynamicDropdownOptions = {
    idPasantia: pasantiasOptions || [],
  };

  if (pasantiasLoading) {
    return <LoadingSpinner message='Cargando opciones...' />;
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
          <BodyText color='text.primary'>Crear Nuevo Pago</BodyText>
        </Breadcrumbs>
      </SectionContainer>

      <PageTitle component='h1' gutterBottom>
        Crear Nuevo Pago
      </PageTitle>

      <FormularioGenerico
        metadata={getPagosFormMetadata()}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={createMutation.isPending || pasantiasLoading}
        dynamicDropdownOptions={dynamicDropdownOptions}
      />
    </div>
  );
};

export default CrearPago;
