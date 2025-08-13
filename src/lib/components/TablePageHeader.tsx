import React from 'react';
import { PageHeader } from './PageHeader';
import { TableHeader } from './TableHeader';

interface TablePageHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  showDivider?: boolean;
  variant?: 'default' | 'compact' | 'detailed' | 'page';
  onRefresh?: () => void;
  isRefreshing?: boolean;
  onAction?: () => void;
  actionButtonText?: string;
}

export const TablePageHeader: React.FC<TablePageHeaderProps> = ({
  title,
  subtitle,
  children,
  showDivider = true,
  variant = 'default',
  onRefresh,
  isRefreshing,
  onAction,
  actionButtonText,
}) => {
  // Si es variant 'page' y tenemos acciones, usar PageHeader
  if (variant === 'page' && (onRefresh || onAction)) {
    return (
      <PageHeader
        title={title || 'Tabla'}
        subtitle={subtitle || ''}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        onAction={onAction}
        actionButtonText={actionButtonText}
      />
    );
  }

  // En otros casos, usar TableHeader
  return (
    <TableHeader
      title={title}
      subtitle={subtitle}
      showDivider={showDivider}
      variant={variant}
    >
      {children}
    </TableHeader>
  );
};
