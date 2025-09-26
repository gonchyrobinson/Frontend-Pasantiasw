import axios from 'axios';

/**
 * Descarga el backup de la base de datos
 * Llama al endpoint GET /Backup y descarga el archivo SQL
 */
export const downloadBackup = async (): Promise<void> => {
  try {
    const response = await axios.get('/Backup', {
      responseType: 'blob',
      headers: {
        Accept: 'application/sql',
      },
    });

    // Extraer el nombre del archivo del header Content-Disposition si está disponible
    const contentDisposition = response.headers['content-disposition'];
    let fileName = `backup_pasantias_db_${new Date().toISOString().slice(0, 19).replace(/[:-]/g, '')}.sql`;

    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      );
      if (fileNameMatch && fileNameMatch[1]) {
        fileName = fileNameMatch[1].replace(/['"]/g, '');
      }
    }

    // Crear blob y enlace de descarga
    const blob = new Blob([response.data], { type: 'application/sql' });
    const url = window.URL.createObjectURL(blob);

    // Crear elemento anchor temporal y activar descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Error al descargar el backup';
      throw new Error(message);
    }
    throw new Error('Error inesperado al descargar el backup');
  }
};
