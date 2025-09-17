import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../lib/hooks/useSnackbar';
import { ROUTES } from '../../../helpers/routesHelper';
import { FormularioGenerico } from '../../../lib/FormularioGenerico';
import { useCreatePasantia } from '../hooks/usePasantias';
import { useEmpresasConvenioDropdown } from '../../../lib/hooks/useDropdownData';
import { getPasantiaFormMetadata } from '../helpers/pasantiaHelpers';
import { getSugerenciasDocumentos } from '../../Estudiantes/helpers/estudianteHelpers';
import { PasantiaCreateDto } from '../types';
import { LoadingSpinner } from '../../../lib/components';
import { PasantiaDto } from '../types';

const CrearPasantia: React.FC = () => {
  const navigate = useNavigate();
  const { showSuccess } = useSnackbar();
  const [documentosEstudiantes, setDocumentosEstudiantes] = React.useState<
    { value: string; label: string }[]
  >([]);

  const { mutate: createPasantia, isPending: isCreating } = useCreatePasantia();
  const { empresasConvenioOptions, isLoading: empresasConvenioLoading } =
    useEmpresasConvenioDropdown();

  const metadata = getPasantiaFormMetadata();

  // Cargar sugerencias de documentos de estudiantes
  React.useEffect(() => {
    const cargarDocumentos = async () => {
      try {
        const documentos = await getSugerenciasDocumentos();
        setDocumentosEstudiantes(documentos);
      } catch (error) {
        console.error('Error al cargar documentos de estudiantes:', error);
        setDocumentosEstudiantes([]);
      }
    };

    cargarDocumentos();
  }, []);

  const handleSubmit = async (formData: Record<string, unknown>) => {
    const response = await new Promise<PasantiaDto>((resolve, reject) => {
      createPasantia(formData as PasantiaCreateDto, {
        onSuccess: resolve,
        onError: reject,
      });
    });
    showSuccess('Pasantía creada exitosamente');
    if (response && response.idPasantia) {
      navigate(`${ROUTES.PASANTIAS_DETALLE}/${response.idPasantia}`);
    } else {
      navigate(ROUTES.PASANTIAS);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.PASANTIAS);
  };

  // Las opciones ya vienen formateadas desde los hooks
  const dynamicDropdownOptions = {
    dniEstudiante: documentosEstudiantes,
    idConvenio: empresasConvenioOptions || [],
  };

  if (empresasConvenioLoading) {
    return <LoadingSpinner message='Cargando opciones...' />;
  }

  return (
    <FormularioGenerico
      metadata={metadata}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      loading={isCreating}
      dynamicDropdownOptions={dynamicDropdownOptions}
    />
  );
};

export default CrearPasantia;
