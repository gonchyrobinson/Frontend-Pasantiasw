import React from 'react';
import { Chip } from '@mui/material';
import { FormMetadata } from '../../../lib/FormularioGenerico';
import { DisplayMetadata } from '../../../lib/VisualizadorGenerico';

/**
 * Helper para el módulo de CreacionUsuarios
 *
 * Contiene funciones utilitarias para:
 * - Generación de metadata del formulario de edición
 * - Generación de metadata de visualización de detalles
 */

// ==================== CONSTANTES ====================

/** Patrón de validación para emails */
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/** Opciones de roles disponibles */
const ROLES_OPTIONS = [
  { value: 'admin', label: 'Administrador' },
  { value: 'coordinador', label: 'Coordinador' },
];

// ==================== METADATA DE FORMULARIO ====================

/**
 * Genera la metadata para el formulario de edición de usuarios
 * Define los campos, validaciones y configuración del formulario
 *
 * @returns Configuración completa del formulario de edición
 */
export const getEdicionUsuarioMetadata = (): FormMetadata => ({
  title: 'Editar Usuario',
  submitButtonText: 'Actualizar Usuario',
  cancelButtonText: 'Cancelar',
  fields: [
    {
      name: 'username',
      type: 'text',
      label: 'Usuario',
      placeholder: 'Nombre de usuario',
      validations: {
        required: 'Usuario es requerido',
        minLength: {
          value: 3,
          message: 'Usuario debe tener al menos 3 caracteres',
        },
      },
      gridSize: 12,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Correo electrónico',
      validations: {
        required: 'Email es requerido',
        pattern: {
          value: EMAIL_PATTERN,
          message: 'Email inválido',
        },
      },
      gridSize: 12,
    },
    {
      name: 'role',
      type: 'dropdown',
      label: 'Rol',
      options: ROLES_OPTIONS,
      validations: {
        required: 'Rol es requerido',
      },
      gridSize: 12,
      readonly: true,
    },
  ],
});

// ==================== METADATA DE VISUALIZACIÓN ====================

/**
 * Genera la metadata para la visualización de detalles del usuario
 * Define las secciones y campos a mostrar en el perfil
 *
 * @param onEdit - Función callback para el botón de editar
 * @returns Configuración completa de visualización del perfil
 */
export const getDetalleUsuarioMetadata = (
  onEdit: () => void
): DisplayMetadata => ({
  title: 'Perfil de Usuario',
  subtitle: 'Información completa del usuario',
  showEditButton: true,
  showCopyButton: true,
  editButtonText: 'Editar',
  onEdit,
  sections: [
    {
      title: 'Información Personal',
      gridContainer: true,
      collapsible: true,
      defaultExpanded: true,
      fields: [
        {
          name: 'id',
          label: 'ID de Usuario',
          type: 'text',
          gridSize: 6,
        },
        {
          name: 'username',
          label: 'Nombre de Usuario',
          type: 'text',
          gridSize: 6,
        },
        {
          name: 'email',
          label: 'Correo Electrónico',
          type: 'email',
          gridSize: 12,
        },
      ],
    },
    {
      title: 'Permisos',
      gridContainer: true,
      collapsible: true,
      defaultExpanded: true,
      fields: [
        {
          name: 'role',
          label: 'Rol',
          type: 'badge',
          gridSize: 12,
          render: (value: string) => {
            const roleMap: Record<
              string,
              { label: string; color: 'error' | 'info' }
            > = {
              admin: { label: 'Administrador', color: 'error' },
              coordinador: { label: 'Coordinador', color: 'info' },
            };

            const roleConfig = roleMap[value] || {
              label: value,
              color: 'info' as const,
            };

            return React.createElement(Chip, {
              label: roleConfig.label,
              color: roleConfig.color,
              variant: 'filled',
              size: 'small',
            });
          },
        },
      ],
    },
  ],
});
