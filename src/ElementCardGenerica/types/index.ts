export interface FieldMetadata {
  name: string;
  label: string;
  type?: 'string' | 'number' | 'date' | 'currency' | 'boolean' | 'email';
}

export interface ElementCardProps {
  metadata: FieldMetadata[];
  data: Record<string, unknown>;
  onClick?: () => void;
  onClickEdit?: () => void;
  onClickEliminar?: () => void;
  title?: string;
  subtitle?: string;
}
