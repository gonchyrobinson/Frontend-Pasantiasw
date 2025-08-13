import React from 'react';
import { TablaGenerica, TablaGenericaProps } from '../index';
import { FieldMetadata } from '../../ElementCardGenerica/types';

export interface TablaGenericaWrapperProps
  extends Omit<TablaGenericaProps, 'columns'> {
  metadata: FieldMetadata[];
  data: Record<string, unknown>[];
}

/**
 * Wrapper de TablaGenerica que usa metadata similar a ElementCardGenerica
 * Permite usar el mismo formato de metadata para consistencia
 */
const TablaGenericaWrapper: React.FC<TablaGenericaWrapperProps> = ({
  metadata,
  data,
  ...props
}) => {
  return <TablaGenerica metadata={metadata} data={data} {...props} />;
};

export default TablaGenericaWrapper;
