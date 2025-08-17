import React, { useEffect } from 'react';
import { usePrefetchDropdowns } from '../hooks/useDropdownData';

interface DropdownDataProviderProps {
  children: React.ReactNode;
  prefetchOnMount?: boolean;
}

/**
 * Provider que permite hacer prefetch de datos de dropdowns
 * Para mejorar la experiencia de usuario al cargar formularios
 */
export const DropdownDataProvider: React.FC<DropdownDataProviderProps> = ({
  children,
  prefetchOnMount = false,
}) => {
  const { prefetchAll } = usePrefetchDropdowns();

  useEffect(() => {
    if (prefetchOnMount) {
      prefetchAll();
    }
  }, [prefetchOnMount, prefetchAll]);

  return <>{children}</>;
};

export default DropdownDataProvider;
