// cypress/e2e/Estudiantes/Busqueda-Carrera.cy.ts
describe('Gestión de Estudiantes - Búsqueda por Carrera', () => {
  const CARRERA = 'INGENIERÍA EN COMPUTACIÓN';

  beforeEach(() => {
    // Precondición: login
    cy.login('gonzaloRobinson', '123456');
  });

  it('debe buscar estudiantes por carrera y validar resultados', () => {
    // Entrar al menú de Estudiantes
    cy.get('button[aria-label="Estudiantes"]').click({ force: true });
    cy.url().should('include', '/students');

    // Abrir formulario de búsqueda avanzada
    cy.contains(/Búsqueda avanzada/i).click({ force: true });

    // Verificar que el campo "Carrera" existe
    cy.get('label').contains('Carrera').should('exist');

    // Buscar el input asociado al label Carrera (combobox)
    cy.get('input[role="combobox"]')
      .eq(1)
      .should('exist')
      .click({ force: true });

    // Escribir y seleccionar la carrera
    cy.get('input[role="combobox"]').eq(1).type(CARRERA);
    cy.get('ul[role="listbox"]').should('be.visible');
    cy.get('ul[role="listbox"]').contains(CARRERA).click({ force: true });

    // Validar que la carrera quedó seleccionada
    cy.get('input[role="combobox"]').eq(1).should('have.value', CARRERA);

    // Click en Buscar
    cy.contains('button', /buscar/i).click({ force: true });

    // Validar que aparece la DataGrid con resultados
    cy.get('.MuiDataGrid-root').should('exist');

    // Verificar que todos los estudiantes listados tienen la carrera buscada
    cy.get('.MuiDataGrid-row [data-field="carrera"]').each($celda => {
      cy.wrap($celda).invoke('text').should('contain', CARRERA);
    });
  });
});
