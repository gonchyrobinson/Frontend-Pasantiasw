import React from 'react';
import { Typography, Chip, Link, Avatar, Box } from '@mui/material';
import { Email, Phone, CheckCircle, Cancel } from '@mui/icons-material';
import { FieldDisplayMetadata } from '../types';
import { BodyText, CaptionText } from '../../components/StyledText';
import { FlexContainer } from '../../components/StyledContainers';

interface FieldDisplayProps {
  field: FieldDisplayMetadata;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

// Utilidades simples
const formatCurrency = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(numValue) ? 'N/A' : `$${numValue.toLocaleString()}`;
};

const formatDate = (value: string | Date | null | undefined): string => {
  if (!value) return 'N/A';
  try {
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  } catch {
    return 'N/A';
  }
};

const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(numValue) ? 'N/A' : numValue.toLocaleString();
};

// Componentes simplificados
export const TextDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  const displayValue = value || field.fallback || 'N/A';
  const finalValue = `${field.prefix || ''}${displayValue}${field.suffix || ''}`;

  return <BodyText>{finalValue}</BodyText>;
};

export const EmailDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  if (!value) return <CaptionText>{field.fallback || 'N/A'}</CaptionText>;

  return (
    <FlexContainer sx={{ alignItems: 'center', gap: 1 }}>
      <Email fontSize='small' color='primary' />
      <Link href={`mailto:${value}`}>{value}</Link>
    </FlexContainer>
  );
};

export const PhoneDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  if (!value) return <CaptionText>{field.fallback || 'N/A'}</CaptionText>;

  return (
    <FlexContainer sx={{ alignItems: 'center', gap: 1 }}>
      <Phone fontSize='small' color='primary' />
      <Link href={`tel:${value}`}>{value}</Link>
    </FlexContainer>
  );
};

export const CurrencyDisplayField: React.FC<FieldDisplayProps> = ({
  value,
}) => {
  return <BodyText sx={{ fontWeight: 600 }}>{formatCurrency(value)}</BodyText>;
};

export const NumberDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  const displayValue = formatNumber(value);
  const finalValue = `${field.prefix || ''}${displayValue}${field.suffix || ''}`;
  return <BodyText>{finalValue}</BodyText>;
};

export const DateDisplayField: React.FC<FieldDisplayProps> = ({ value }) => {
  return <BodyText>{formatDate(value)}</BodyText>;
};

export const BooleanDisplayField: React.FC<FieldDisplayProps> = ({ value }) => {
  const boolValue = Boolean(value);

  return (
    <FlexContainer sx={{ alignItems: 'center', gap: 1 }}>
      {boolValue ? (
        <CheckCircle color='success' fontSize='small' />
      ) : (
        <Cancel color='error' fontSize='small' />
      )}
      <BodyText>{boolValue ? 'Sí' : 'No'}</BodyText>
    </FlexContainer>
  );
};

export const BadgeDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  if (!value) return <CaptionText>{field.fallback || 'N/A'}</CaptionText>;

  const config = field.badgeConfig || {};

  return (
    <Chip
      label={value}
      variant={config.variant || 'filled'}
      color={config.color || 'primary'}
      size='small'
    />
  );
};

export const LinkDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  if (!value) return <CaptionText>{field.fallback || 'N/A'}</CaptionText>;

  const config = field.linkConfig || {};
  const href = config.href ? config.href.replace('{value}', value) : value;

  return (
    <Link href={href} target={config.target || '_self'}>
      {value}
    </Link>
  );
};

export const ImageDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  if (!value)
    return <CaptionText>{field.fallback || 'Sin imagen'}</CaptionText>;

  return (
    <Avatar src={value} alt={field.label} sx={{ width: 60, height: 60 }} />
  );
};

export const JsonDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  if (!value) return <CaptionText>{field.fallback || 'N/A'}</CaptionText>;

  const jsonString =
    typeof value === 'string' ? value : JSON.stringify(value, null, 2);

  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        p: 1,
        borderRadius: 1,
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        maxHeight: 150,
        overflow: 'auto',
      }}
    >
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{jsonString}</pre>
    </Box>
  );
};

export const ListDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
}) => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return <CaptionText>{field.fallback || 'Sin elementos'}</CaptionText>;
  }

  return (
    <Box>
      {value.map((item, index) => (
        <Typography key={index} variant='body2' sx={{ mb: 0.5 }}>
          • {typeof item === 'object' ? JSON.stringify(item) : String(item)}
        </Typography>
      ))}
    </Box>
  );
};

export const CustomDisplayField: React.FC<FieldDisplayProps> = ({
  field,
  value,
  data,
}) => {
  if (!field.render)
    return <CaptionText>Componente personalizado no configurado</CaptionText>;

  try {
    return <>{field.render(value, data)}</>;
  } catch (error) {
    return <CaptionText color='error'>Error en renderizado</CaptionText>;
  }
};
