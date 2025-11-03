import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormularioGenerico } from '../../lib/FormularioGenerico';
import { UpdateUsuarioDto, UsuarioDto } from './types';
import { getEdicionUsuarioMetadata } from './helpers/usuarioHelpers';
import { ROUTES } from '../../helpers/routesHelper';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import { safeParseInt } from '../../helpers/formatHelper';
import { useUsuario, useUpdateUsuario } from './hooks/useUsuarios';
import {
  ContenedorPrincipal,
  TarjetaRegistro,
} from './components/ComponentesGenericos';

const EditarUsuario: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const usuarioId = safeParseInt(id);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const { data: usuarioData, isLoading, error } = useUsuario(usuarioId);

  const { mutate: updateUsuario, isPending: isUpdating } = useUpdateUsuario();

  const handleSubmit = async (formData: Record<string, unknown>) => {
    if (usuarioId) {
      try {
        await new Promise<UsuarioDto>((resolve, reject) => {
          updateUsuario(
            {
              idUsuario: usuarioId,
              nombreUsuario: formData.username as string,
              correo: formData.email as string,
              rol: formData.role as string,
            } as UpdateUsuarioDto,
            {
              onSuccess: resolve,
              onError: reject,
            }
          );
        });
        showSuccess('Usuario actualizado exitosamente');
        setTimeout(() => {
          navigate(`${ROUTES.PERFIL}/${usuarioId}`);
        }, 2000);
      } catch (err) {
        showError((err as Error).message);
      }
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.DASHBOARD);
  };

  if (isLoading) {
    return (
      <ContenedorPrincipal>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          Cargando datos del usuario...
        </div>
      </ContenedorPrincipal>
    );
  }

  if (error) {
    return (
      <ContenedorPrincipal>
        <div>Error al cargar el usuario: {error.message}</div>
      </ContenedorPrincipal>
    );
  }

  if (!usuarioData) {
    return (
      <ContenedorPrincipal>
        <div>No se encontró el usuario.</div>
      </ContenedorPrincipal>
    );
  }

  return (
    <ContenedorPrincipal>
      <TarjetaRegistro>
        <FormularioGenerico
          metadata={getEdicionUsuarioMetadata()}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={isUpdating}
          initialValues={usuarioData as unknown as Record<string, unknown>}
        />
      </TarjetaRegistro>

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </ContenedorPrincipal>
  );
};

export default EditarUsuario;
