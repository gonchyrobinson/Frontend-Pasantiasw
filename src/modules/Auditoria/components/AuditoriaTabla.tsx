import React from 'react';
import dayjs from 'dayjs';

import { TablaGenericaWrapper } from '../../../lib/TablaGenerica';
import { AuditoriaTablaProps } from '../types';
import { FieldMetadata } from '../../../lib/ElementCardGenerica/types';

const AuditoriaTabla: React.FC<AuditoriaTablaProps> = ({
  auditorias,
  loading = false,
  onRowClick,
}) => {
  const metadata: FieldMetadata[] = [
    { name: 'fechaOperacion', label: 'Fecha', type: 'text' },
    { name: 'usuarioNombre', label: 'Usuario', type: 'text' },
    { name: 'tipoOperacion', label: 'Operación', type: 'text' },
    { name: 'tablaAfectada', label: 'Tabla', type: 'text' },
    { name: 'funcionLlamada', label: 'Función', type: 'text' },
    { name: 'datosAnteriores', label: 'Datos Anteriores', type: 'text' },
    { name: 'datosNuevos', label: 'Datos Nuevos', type: 'text' },
  ];

  const auditoriaData = auditorias.map(auditoria => ({
    ...auditoria,
    id: auditoria.idAuditoria,
    fechaOperacion: auditoria.fechaOperacion
      ? dayjs(auditoria.fechaOperacion).format('DD/MM/YYYY HH:mm')
      : '-',
    usuarioNombre: auditoria.usuarioNombre || '-',
    tipoOperacion: auditoria.tipoOperacion || '-',
    tablaAfectada: auditoria.tablaAfectada || '-',
    funcionLlamada: auditoria.funcionLlamada || '-',
    datosAnteriores: auditoria.datosAnteriores
      ? auditoria.datosAnteriores.length > 50
        ? `${auditoria.datosAnteriores.substring(0, 50)}...`
        : auditoria.datosAnteriores
      : '-',
    datosNuevos: auditoria.datosNuevos
      ? auditoria.datosNuevos.length > 50
        ? `${auditoria.datosNuevos.substring(0, 50)}...`
        : auditoria.datosNuevos
      : '-',
  }));

  const handleRowClick = (row: Record<string, unknown>) => {
    const auditoria = auditorias.find(a => a.idAuditoria === row.id);
    if (auditoria && onRowClick) onRowClick(auditoria);
  };

  return (
    <TablaGenericaWrapper
      metadata={metadata}
      data={auditoriaData}
      title='Registros de Auditoría'
      subtitle='Historial de operaciones realizadas en el sistema'
      loading={loading}
      onRowClick={handleRowClick}
      pageSize={15}
      pageSizeOptions={[10, 15, 25, 50]}
      initialSortModel={[{ field: 'fechaOperacion', sort: 'desc' }]}
    />
  );
};

export default AuditoriaTabla;
