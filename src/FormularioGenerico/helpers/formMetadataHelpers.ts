import { FormMetadata, FieldMetadata, DropdownOption } from '../types';
import {
  createEmailValidation,
  createRequiredValidation,
} from './validationHelpers';

// Helper para crear opciones de dropdown
export const createDropdownOptions = (
  items: Array<{ id: string | number; name: string }>
): DropdownOption[] => {
  return items.map(item => ({
    value: item.id,
    label: item.name,
  }));
};

// Helper para crear metadata de campos comunes
export const createTextField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'text',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createEmailField = (
  name = 'email',
  label = 'Email',
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'email',
  gridSize,
  validations: createEmailValidation(),
});

export const createDateField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'date',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createCurrencyField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'currency',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createDropdownField = (
  name: string,
  label: string,
  options: DropdownOption[],
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'dropdown',
  options,
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

export const createDynamicDropdownField = (
  name: string,
  label: string,
  required = false,
  gridSize = 6
): FieldMetadata => ({
  name,
  label,
  type: 'dynamicDropdown',
  gridSize,
  validations: required ? createRequiredValidation(label) : undefined,
});

// Ejemplos de formularios para las entidades del proyecto
export const createConvenioFormMetadata = (): FormMetadata => ({
  title: 'Convenio',
  fields: [
    createDynamicDropdownField('empresa', 'Empresa', true, 6),
    createTextField('representanteEmpresa', 'Representante Empresa', true, 6),
    createTextField('nroAcuerdoMarco', 'Nro. Acuerdo Marco', false, 6),
    createTextField('domicilioLegal', 'Domicilio Legal', true, 6),
    createTextField('expediente', 'Expediente', false, 6),
    createTextField(
      'docRepresentanteEmpresa',
      'Doc. Representante Empresa',
      true,
      6
    ),
    createTextField('representanteFacultad', 'Representante Facultad', true, 6),
    createTextField(
      'docRepresentanteFacultad',
      'Doc. Representante Facultad',
      true,
      6
    ),
    createDateField('fechaFirma', 'Fecha Firma', true, 6),
    createDateField('fechaCaducidad', 'Fecha Caducidad', true, 6),
  ],
});

export const createEmpresaFormMetadata = (): FormMetadata => ({
  title: 'Empresa',
  fields: [
    createTextField('nombre', 'Nombre', true, 6),
    createTextField('vigencia', 'Vigencia', false, 6),
    createDateField('fechaInicio', 'Fecha Inicio', false, 6),
    createDateField('fechaFin', 'Fecha Fin', false, 6),
    createTextField('tipoContrato', 'Tipo Contrato', false, 6),
    createTextField('encargado', 'Encargado', false, 6),
    createTextField('celular', 'Celular', false, 6),
    createEmailField('correoElectronico', 'Correo Electrónico', 6),
    createDateField('sudocu', 'SUDOCU', false, 6),
  ],
});

export const createEstudianteFormMetadata = (): FormMetadata => ({
  title: 'Estudiante',
  fields: [
    createTextField('apellido', 'Apellido', true, 6),
    createTextField('nombre', 'Nombre', true, 6),
    createTextField('documento', 'Documento', true, 6),
    createTextField('domicilio', 'Domicilio', false, 6),
    createTextField('libreta', 'Libreta', false, 6),
    createTextField('carrera', 'Carrera', true, 6),
    createTextField('areaTrabajo', 'Área de Trabajo', false, 6),
    createEmailField('email', 'Email', 6),
  ],
});
