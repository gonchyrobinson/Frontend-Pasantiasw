// cypress/e2e/Estudiantes/Eliminar-Estudiante.cy.ts
describe('Gestión de Estudiantes - Eliminar Estudiante', () => {
  const DOCUMENTO = '44703066';

  beforeEach(() => {
    // Precondición: login
    cy.login('gonzaloRobinson', '123456');
  });

  it('debe eliminar un estudiante existente', () => {
    // Entrar al menú de Estudiantes
    cy.get('button[aria-label="Estudiantes"]').click({ force: true });
    cy.url().should('include', '/students');

    // Abrir formulario de búsqueda avanzada
    cy.contains(/Búsqueda avanzada/i).click({ force: true });

    // Ingresar documento usando selectall + backspace en lugar de clear()
    cy.get('input[role="combobox"][placeholder*="documento"]')
      .should('exist')
      .type('{selectall}{backspace}')
      .type(DOCUMENTO);

    // Seleccionar el documento en el desplegable
    cy.get('ul[role="listbox"]').should('be.visible');
    cy.contains('li', DOCUMENTO).click({ force: true });

    // Verificar que el valor quedó cargado en el input
    cy.get('input[role="combobox"][placeholder*="documento"]').should(
      'have.value',
      DOCUMENTO
    );

    // Click en Buscar
    cy.contains('button', /buscar/i).click({ force: true });

    // Verificar que aparece la grilla con el estudiante
    cy.get('.MuiDataGrid-root').should('exist');
    cy.get('.MuiDataGrid-row').contains(DOCUMENTO).should('exist');

    // Click en Eliminar
    cy.contains('button', /eliminar/i).click({ force: true });

    // Confirmación: debería abrir el modal
    cy.contains('div[role="dialog"]', 'Confirmar eliminación').within(() => {
      cy.contains('button', /^Eliminar$/i).click({ force: true });
    });

    // Validar que vuelve a la gestión de estudiantes
    cy.url().should('include', '/students');

    // Abrir búsqueda avanzada otra vez
    cy.contains(/Búsqueda avanzada/i).click({ force: true });

    // Esperar a que el input de documento esté visible y listo
    cy.get('input[role="combobox"]')
      .filter('[id]')
      .should('be.visible')
      .first()
      .focus()
      .clear({ force: true })
      .type(DOCUMENTO, { force: true });

    // Validar que aparece el mensaje de "no encontrado"
    cy.contains(/No se encontraron estudiantes/i).should('be.visible');
  });
});
