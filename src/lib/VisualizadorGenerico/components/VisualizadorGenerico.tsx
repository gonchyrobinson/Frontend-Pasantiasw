import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Alert,
  Box,
} from '@mui/material';
import {
  Edit,
  Print,
  ContentCopy,
  ExpandMore,
  ExpandLess,
  ArrowBack,
} from '@mui/icons-material';

import { VisualizadorGenericoProps, FieldDisplayMetadata } from '../types';
import {
  SectionTitle,
  PageTitle,
  Subtitle,
  CaptionText,
} from '../../components/StyledText';
import {
  PrimaryButton,
  SecondaryButton,
  RefreshButton,
} from '../../components/StyledButtons';
import {
  MainContainer,
  FlexContainer,
  GridLayoutContainer,
  FieldContainer,
  DisplaySectionCard,
} from '../../components/StyledContainers';
import LoadingSpinner from '../../components/LoadingSpinner';

import {
  TextDisplayField,
  EmailDisplayField,
  PhoneDisplayField,
  CurrencyDisplayField,
  NumberDisplayField,
  DateDisplayField,
  BooleanDisplayField,
  BadgeDisplayField,
  LinkDisplayField,
  ImageDisplayField,
  JsonDisplayField,
  ListDisplayField,
  CustomDisplayField,
} from './FieldDisplayComponents';

const VisualizadorGenerico: React.FC<VisualizadorGenericoProps> = ({
  metadata,
  data,
  loading = false,
  error = null,
  onRetry,
}) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<
    Record<number, boolean>
  >({});

  const toggleSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderField = (field: FieldDisplayMetadata) => {
    if (field.hidden) return null;

    const value = data[field.name];
    const fieldProps = { field, value, data };

    const components = {
      text: TextDisplayField,
      email: EmailDisplayField,
      phone: PhoneDisplayField,
      currency: CurrencyDisplayField,
      number: NumberDisplayField,
      date: DateDisplayField,
      datetime: DateDisplayField,
      boolean: BooleanDisplayField,
      badge: BadgeDisplayField,
      link: LinkDisplayField,
      image: ImageDisplayField,
      json: JsonDisplayField,
      list: ListDisplayField,
      custom: CustomDisplayField,
    };

    const FieldComponent = components[field.type] || TextDisplayField;

    return (
      <GridLayoutContainer
        item
        xs={12}
        sm={6}
        md={field.gridSize || 6}
        key={field.name}
      >
        <FieldContainer>
          <CaptionText sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
            {field.label}
          </CaptionText>
          <FieldComponent {...fieldProps} />
        </FieldContainer>
      </GridLayoutContainer>
    );
  };

  const handleCopyData = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al copiar:', error);
    }
  };

  if (loading) {
    return (
      <MainContainer>
        <LoadingSpinner />
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
        {onRetry && <RefreshButton onClick={onRetry}>Reintentar</RefreshButton>}
      </MainContainer>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <MainContainer>
        <Alert severity='info'>No hay datos disponibles</Alert>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {/* Header */}
      {metadata.title && (
        <Box sx={{ mb: 3 }}>
          <PageTitle>{metadata.title}</PageTitle>
          {metadata.subtitle && <Subtitle>{metadata.subtitle}</Subtitle>}

          {/* Botones de acción */}
          {(metadata.showEditButton ||
            metadata.showCopyButton ||
            metadata.showPrintButton) && (
            <FlexContainer sx={{ gap: 1, mt: 2 }}>
              {metadata.showCopyButton && (
                <SecondaryButton
                  startIcon={<ContentCopy />}
                  onClick={handleCopyData}
                >
                  Copiar
                </SecondaryButton>
              )}
              {metadata.showPrintButton && (
                <SecondaryButton
                  startIcon={<Print />}
                  onClick={() => window.print()}
                >
                  Imprimir
                </SecondaryButton>
              )}
              {metadata.showEditButton && metadata.onEdit && (
                <PrimaryButton startIcon={<Edit />} onClick={metadata.onEdit}>
                  {metadata.editButtonText || 'Editar'}
                </PrimaryButton>
              )}
            </FlexContainer>
          )}
        </Box>
      )}

      {/* Secciones */}
      {metadata.sections.map((section, sectionIndex) => (
        <DisplaySectionCard key={sectionIndex}>
          {/* Header de sección */}
          {section.title && (
            <CardActions>
              <Box>
                <SectionTitle variant='h6'>{section.title}</SectionTitle>
                {section.subtitle && (
                  <CaptionText>{section.subtitle}</CaptionText>
                )}
              </Box>
              {section.collapsible && (
                <IconButton
                  onClick={() => toggleSection(sectionIndex)}
                  size='small'
                >
                  {expandedSections[sectionIndex] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton>
              )}
            </CardActions>
          )}

          {/* Contenido */}
          <Collapse
            in={!section.collapsible || expandedSections[sectionIndex]}
            timeout='auto'
          >
            <CardContent>
              {section.gridContainer ? (
                <GridLayoutContainer container spacing={2}>
                  {section.fields.map(renderField)}
                </GridLayoutContainer>
              ) : (
                <FlexContainer sx={{ flexDirection: 'column', gap: 2 }}>
                  {section.fields.map(renderField)}
                </FlexContainer>
              )}
            </CardContent>
          </Collapse>
        </DisplaySectionCard>
      ))}

      {/* Botones de navegación */}
      {(metadata.navigationButtons?.length || window.history.length > 1) && (
        <FlexContainer sx={{ mt: 3, justifyContent: 'center', gap: 2 }}>
          {/* Botón volver automático */}
          {window.history.length > 1 && (
            <SecondaryButton
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              size='large'
            >
              Volver
            </SecondaryButton>
          )}

          {/* Botones personalizados */}
          {metadata.navigationButtons
            ?.filter(button => button.condition !== false)
            .map((button, index) => (
              <SecondaryButton
                key={index}
                startIcon={button.icon}
                onClick={button.onClick}
                size='large'
              >
                {button.label}
              </SecondaryButton>
            ))}
        </FlexContainer>
      )}
    </MainContainer>
  );
};

export default VisualizadorGenerico;
