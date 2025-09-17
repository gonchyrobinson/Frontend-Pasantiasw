describe('Gestión de Estudiantes - Búsqueda por Documento', () => {
  const DOCUMENTO = '22628362';

  beforeEach(() => {
    // Precondición: login
    cy.login('gonzaloRobinson', '123456');
  });

  it('debe buscar un estudiante por documento y validar sus datos', () => {
    // Entrar al menú de Estudiantes
    cy.get('button[aria-label="Estudiantes"]').click({ force: true });
    cy.url().should('include', '/students');

    // Abrir formulario de búsqueda avanzada
    cy.contains(/Búsqueda avanzada/i).click({ force: true });

    // Verificar que existan los campos Documento y Carrera
    cy.get('label').contains('Documento').should('exist');
    cy.get('label').contains('Carrera').should('exist');

    // Ingresar documento
    cy.get('input[role="combobox"][placeholder*="documento"]').should('exist');
    cy.get('input[role="combobox"][placeholder*="documento"]').type(DOCUMENTO);
    cy.get('input[role="combobox"][placeholder*="documento"]').should(
      'have.value',
      DOCUMENTO
    );

    cy.get('ul[role="listbox"]')
      .should('be.visible')
      .within(() => {
        cy.contains(DOCUMENTO).should('exist');
      });

    // Seleccionar el documento (autocomplete si aplica)
    cy.contains(DOCUMENTO).click({ force: true });
    cy.get('input[role="combobox"][placeholder*="documento"]').should(
      'have.value',
      '22628362'
    );
    // Click en Buscar
    cy.contains('button', /buscar/i).click({ force: true });

    // Validar que aparece la DataGrid con los datos del estudiante
    cy.get('.MuiDataGrid-root').should('exist');

    // Buscar la fila que contiene el documento
    cy.get('.MuiDataGrid-row')
      .contains(DOCUMENTO)
      .parents('.MuiDataGrid-row')
      .within(() => {
        // Validar que cada columna no esté vacía
        cy.get('[data-field="apellido"]').invoke('text').should('not.be.empty');
        cy.get('[data-field="nombre"]').invoke('text').should('not.be.empty');
        cy.get('[data-field="documento"]')
          .invoke('text')
          .should('contain', DOCUMENTO);
        cy.get('[data-field="carrera"]').invoke('text').should('not.be.empty');
      });
  });
});
