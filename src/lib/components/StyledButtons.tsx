import React from 'react';
import {
  Button,
  IconButton,
  Fab,
  Tooltip,
  CircularProgress,
  ButtonProps,
  IconButtonProps,
  FabProps,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Refresh,
  Save,
  Cancel,
  Send,
  Clear,
  Check,
} from '@mui/icons-material';

// ===== BUTTON INTERFACES =====

interface BaseButtonProps extends Omit<ButtonProps, 'children'> {
  children: React.ReactNode;
  loading?: boolean;
  tooltip?: string;
}

interface IconButtonExtendedProps extends Omit<IconButtonProps, 'children'> {
  loading?: boolean;
  tooltip?: string;
  children?: React.ReactNode;
}

interface ActionButtonProps extends BaseButtonProps {
  icon?: React.ReactNode;
}

interface FloatingActionButtonExtendedProps extends Omit<FabProps, 'children'> {
  tooltip?: string;
  icon?: React.ReactNode;
}

// ===== PRIMARY BUTTONS =====

export const PrimaryButton: React.FC<BaseButtonProps> = ({
  children,
  loading = false,
  tooltip,
  disabled,
  ...props
}) => {
  const button = (
    <Button
      variant='contained'
      color='primary'
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} /> : undefined}
      {...props}
    >
      {loading ? 'Procesando...' : children}
    </Button>
  );

  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
};

export const SecondaryButton: React.FC<BaseButtonProps> = ({
  children,
  loading = false,
  tooltip,
  disabled,
  ...props
}) => {
  const button = (
    <Button
      variant='outlined'
      color='primary'
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} /> : undefined}
      {...props}
    >
      {loading ? 'Procesando...' : children}
    </Button>
  );

  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
};

// ===== ACTION BUTTONS =====

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  icon,
  loading = false,
  tooltip,
  disabled,
  variant = 'outlined',
  color = 'primary',
  size = 'small',
  ...props
}) => {
  const button = (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} /> : icon}
      sx={{
        minWidth: 'auto',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
      {...props}
    >
      {loading ? 'Procesando...' : children}
    </Button>
  );

  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
};

export const EditButton: React.FC<
  Omit<ActionButtonProps, 'icon' | 'children'>
> = ({ loading = false, tooltip = 'Editar', ...props }) => (
  <ActionButton
    icon={<Edit />}
    loading={loading}
    tooltip={tooltip}
    color='primary'
    {...props}
  >
    Editar
  </ActionButton>
);

export const DeleteButton: React.FC<
  Omit<ActionButtonProps, 'icon' | 'children'>
> = ({ loading = false, tooltip = 'Eliminar', ...props }) => (
  <ActionButton
    icon={<Delete />}
    loading={loading}
    tooltip={tooltip}
    color='error'
    {...props}
  >
    Eliminar
  </ActionButton>
);

export const CreateButton: React.FC<Omit<ActionButtonProps, 'icon'>> = ({
  children = 'Crear',
  loading = false,
  tooltip = 'Crear nuevo',
  variant = 'contained',
  ...props
}) => (
  <ActionButton
    icon={<Add />}
    loading={loading}
    tooltip={tooltip}
    variant={variant}
    color='primary'
    {...props}
  >
    {children}
  </ActionButton>
);

// ===== FORM BUTTONS =====

export const SubmitButton: React.FC<BaseButtonProps> = ({
  children = 'Guardar',
  loading = false,
  tooltip,
  ...props
}) => (
  <PrimaryButton
    type='submit'
    loading={loading}
    tooltip={tooltip}
    startIcon={loading ? undefined : <Save />}
    {...props}
  >
    {children}
  </PrimaryButton>
);

export const CancelButton: React.FC<BaseButtonProps> = ({
  children = 'Cancelar',
  loading = false,
  tooltip,
  ...props
}) => (
  <SecondaryButton
    type='button'
    loading={loading}
    tooltip={tooltip}
    startIcon={<Cancel />}
    {...props}
  >
    {children}
  </SecondaryButton>
);

export const ClearButton: React.FC<BaseButtonProps> = ({
  children = 'Limpiar',
  loading = false,
  tooltip = 'Limpiar campos',
  ...props
}) => (
  <SecondaryButton
    type='button'
    loading={loading}
    tooltip={tooltip}
    startIcon={<Clear />}
    color='secondary'
    {...props}
  >
    {children}
  </SecondaryButton>
);

export const ConfirmButton: React.FC<BaseButtonProps> = ({
  children = 'Confirmar',
  loading = false,
  tooltip,
  ...props
}) => (
  <PrimaryButton
    loading={loading}
    tooltip={tooltip}
    startIcon={loading ? undefined : <Check />}
    {...props}
  >
    {children}
  </PrimaryButton>
);

// ===== ICON BUTTONS =====

export const RefreshButton: React.FC<IconButtonExtendedProps> = ({
  loading = false,
  tooltip = 'Actualizar datos',
  disabled,
  color = 'primary',
  size = 'large',
  ...props
}) => (
  <Tooltip title={tooltip}>
    <IconButton
      disabled={disabled || loading}
      color={color}
      size={size}
      {...props}
    >
      <Refresh
        sx={{
          animation: loading ? 'spin 1s linear infinite' : 'none',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      />
    </IconButton>
  </Tooltip>
);

export const EditIconButton: React.FC<IconButtonExtendedProps> = ({
  tooltip = 'Editar',
  color = 'primary',
  size = 'small',
  ...props
}) => (
  <Tooltip title={tooltip}>
    <IconButton color={color} size={size} {...props}>
      <Edit />
    </IconButton>
  </Tooltip>
);

export const DeleteIconButton: React.FC<IconButtonExtendedProps> = ({
  tooltip = 'Eliminar',
  color = 'error',
  size = 'small',
  ...props
}) => (
  <Tooltip title={tooltip}>
    <IconButton color={color} size={size} {...props}>
      <Delete />
    </IconButton>
  </Tooltip>
);

// ===== FLOATING ACTION BUTTONS =====

export const FloatingActionButton: React.FC<
  FloatingActionButtonExtendedProps
> = ({
  tooltip = 'Crear nuevo',
  icon = <Add />,
  color = 'primary',
  onClick,
  sx,
  ...props
}) => (
  <Tooltip title={tooltip}>
    <Fab
      color={color}
      onClick={onClick}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        ...sx,
      }}
      {...props}
    >
      {icon}
    </Fab>
  </Tooltip>
);

export const CreateFab: React.FC<
  Omit<FloatingActionButtonExtendedProps, 'icon'>
> = ({ tooltip = 'Crear nuevo', ...props }) => (
  <FloatingActionButton tooltip={tooltip} icon={<Add />} {...props} />
);

// ===== SPECIALIZED BUTTONS =====

export const SendButton: React.FC<BaseButtonProps> = ({
  children = 'Enviar',
  loading = false,
  tooltip,
  ...props
}) => (
  <PrimaryButton
    loading={loading}
    tooltip={tooltip}
    startIcon={loading ? undefined : <Send />}
    {...props}
  >
    {children}
  </PrimaryButton>
);

// ===== BUTTON GROUPS =====

interface FormButtonGroupProps {
  onSubmit?: () => void;
  onCancel?: () => void;
  onClear?: () => void;
  loading?: boolean;
  submitText?: string;
  cancelText?: string;
  clearText?: string;
  showClear?: boolean;
}

export const FormButtonGroup: React.FC<FormButtonGroupProps> = ({
  onSubmit,
  onCancel,
  onClear,
  loading = false,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
  clearText = 'Limpiar',
  showClear = false,
}) => (
  <div
    style={{
      display: 'flex',
      gap: 16,
      justifyContent: 'flex-end',
      marginTop: 24,
    }}
  >
    {showClear && onClear && (
      <ClearButton onClick={onClear} disabled={loading}>
        {clearText}
      </ClearButton>
    )}
    {onCancel && (
      <CancelButton onClick={onCancel} disabled={loading}>
        {cancelText}
      </CancelButton>
    )}
    {onSubmit && (
      <SubmitButton onClick={onSubmit} loading={loading}>
        {submitText}
      </SubmitButton>
    )}
  </div>
);

interface ActionButtonGroupProps {
  onEdit?: () => void;
  onDelete?: () => void;
  extraButtons?: Array<{
    label: string;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: React.ReactNode;
  }>;
  loading?: boolean;
}

export const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({
  onEdit,
  onDelete,
  extraButtons = [],
  loading = false,
}) => (
  <div
    style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}
  >
    {onEdit && <EditButton onClick={onEdit} disabled={loading} />}
    {onDelete && <DeleteButton onClick={onDelete} disabled={loading} />}
    {extraButtons.map((button, index) => (
      <ActionButton
        key={index}
        icon={button.icon}
        onClick={button.onClick}
        color={button.color || 'primary'}
        variant={button.variant || 'outlined'}
        disabled={loading}
      >
        {button.label}
      </ActionButton>
    ))}
  </div>
);

// Export all button types for convenience
export type {
  BaseButtonProps,
  IconButtonExtendedProps,
  ActionButtonProps,
  FloatingActionButtonExtendedProps,
  FormButtonGroupProps,
  ActionButtonGroupProps,
};
