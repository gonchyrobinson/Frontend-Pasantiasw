// cypress/e2e/Estudiantes/Crear-Estudiante.cy.ts
describe('Gestión de Estudiantes - Crear Estudiante', () => {
  beforeEach(() => {
    // Precondición: login
    cy.login('gonzaloRobinson', '123456');
  });

  it('debe crear un nuevo estudiante y redirigir al detalle', () => {
    // Entrar al menú de Estudiantes
    cy.get('button[aria-label="Estudiantes"]').click({ force: true });
    cy.url().should('include', '/students');

    // Abrir formulario de creación
    cy.contains(/Nuevo estudiante/i).click({ force: true });
    cy.url().should('include', '/students/crear');

    // Llenar campos
    cy.get('input[name="apellido"]').type('Mir');
    cy.get('input[name="nombre"]').type('Iván');
    cy.get('input[name="documento"]').type('44703066');
    cy.get('input[name="domicilio"]').type('balcarce 100');
    // Seleccionar carrera (autocomplete)
    cy.get('input[role="combobox"]').eq(0).type('INGENIERÍA EN INFORMÁTICA');
    cy.get('ul[role="listbox"]').contains('INGENIERÍA EN INFORMÁTICA').click();

    // Campo mail
    cy.get('input[name="email"]').type('ivan.mir@gmail.com');

    // Click en Crear Estudiante
    cy.contains('button', /crear estudiante/i).click({ force: true });

    // Validar redirección al detalle
    cy.url().should('match', /\/detalle\/\d+/);

    // Opcional: validar que los datos aparecen en el detalle
    cy.contains('Mir').should('exist');
    cy.contains('Iván').should('exist');
    cy.contains('44703066').should('exist');
    cy.contains('balcarce 100').should('exist');
    cy.contains('INGENIERÍA EN INFORMÁTICA').should('exist');
    cy.contains('ivan.mir@gmail.com').should('exist');
  });
});
