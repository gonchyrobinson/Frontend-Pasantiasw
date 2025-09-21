import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { safeParseInt } from '../../../helpers/formatHelper';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { usePasantia, useUpdatePasantia } from '../hooks/usePasantias';
import { useEmpresasConvenioDropdown } from '../../../lib/hooks/useDropdownData';
import { getPasantiaEditMetadata } from '../helpers/pasantiaHelpers';
import { useEstudiante } from '../../Estudiantes/hooks/useEstudiantes';
import { PasantiaUpdateDto, PasantiaDto } from '../types';
import { LoadingSpinner } from '../../../lib/components';

const EditarPasantia: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pasantiaId = safeParseInt(id);
  const navigate = useNavigate();
  const { showSuccess } = useSnackbar();

  const { data: pasantiaData, isLoading, error } = usePasantia(pasantiaId);
  const { mutate: updatePasantia, isPending: isUpdating } = useUpdatePasantia();
  const { empresasConvenioOptions, isLoading: empresasConvenioLoading } =
    useEmpresasConvenioDropdown('Pasantias y PPS');

  // Obtener datos del estudiante para mostrar información readonly
  const { data: estudianteData, isLoading: estudianteLoading } = useEstudiante(
    pasantiaData?.idEstudiante || 0
  );

  const metadata = getPasantiaEditMetadata();

  // Crear valores iniciales con DNI del estudiante y nombre de empresa
  const [initialValues, setInitialValues] = React.useState<
    Record<string, unknown>
  >({});

  React.useEffect(() => {
    if (!pasantiaData) return;

    const newInitialValues: Record<string, unknown> = { ...pasantiaData };

    if (estudianteData?.documento) {
      newInitialValues.dniEstudiante = estudianteData.documento;
    }

    if (pasantiaData.idConvenio && empresasConvenioOptions.length > 0) {
      const empresaOption = empresasConvenioOptions.find(
        option => option.value === pasantiaData.idConvenio
      );
      if (empresaOption) {
        newInitialValues.idConvenio = empresaOption.label;
      }
    }

    setInitialValues(newInitialValues);
  }, [pasantiaData, estudianteData, empresasConvenioOptions]);

  const handleSubmit = async (formData: Record<string, unknown>) => {
    if (!pasantiaId || !pasantiaData) return;
    const updateData = {
      ...formData,
      idPasantia: pasantiaId,
      dniEstudiante: estudianteData?.documento,
      idConvenio: pasantiaData.idConvenio,
    };

    await new Promise<PasantiaDto>((resolve, reject) => {
      updatePasantia(updateData as unknown as PasantiaUpdateDto, {
        onSuccess: resolve,
        onError: reject,
      });
    });

    showSuccess('Pasantía actualizada exitosamente');
    navigate(`${ROUTES.PASANTIAS_DETALLE}/${pasantiaId}`);
  };

  const handleCancel = () => navigate(ROUTES.PASANTIAS);

  if (isLoading || empresasConvenioLoading || estudianteLoading) {
    return <LoadingSpinner message='Cargando datos...' />;
  }

  if (error) {
    return <div>Error al cargar la pasantía: {error.message}</div>;
  }

  if (!pasantiaData) {
    return <div>No se encontró la pasantía.</div>;
  }

  return (
    <FormularioGenerico
      metadata={metadata}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      loading={isUpdating}
      dynamicDropdownOptions={{ idConvenio: empresasConvenioOptions || [] }}
    />
  );
};

export default EditarPasantia;
