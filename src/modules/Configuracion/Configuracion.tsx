import React, { useState } from 'react';
import { PageContainer } from '../../lib/components';
import { PrimaryButton } from '../../lib/components/StyledButtons';
import { Section } from '../../lib/components/Section';
import { useSnackbar } from '../../lib/hooks/useSnackbar';
import PersonalizedSnackbar from '../Shared/components/PersonalizedSnackbar';
import { downloadBackup } from './helpers/configuracionHelpers';

const Configuracion: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const handleDownloadBackup = async () => {
    setIsDownloading(true);
    try {
      await downloadBackup();
      showSuccess('Backup descargado correctamente');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error al descargar el backup';
      showError(message);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <PageContainer title='Configuración del Sistema'>
        <Section title='Respaldo de Datos'>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ marginBottom: '16px', color: '#666' }}>
              Descarga un backup completo de la base de datos del sistema de
              Acuerdos Individuales.
            </p>
            <PrimaryButton
              onClick={handleDownloadBackup}
              disabled={isDownloading}
            >
              {isDownloading ? 'Generando backup...' : 'Descargar Backup'}
            </PrimaryButton>
          </div>
        </Section>
      </PageContainer>

      <PersonalizedSnackbar snackbar={snackbar} onClose={hideSnackbar} />
    </>
  );
};

export default Configuracion;
