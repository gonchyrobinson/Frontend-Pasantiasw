// cypress/e2e/Estudiantes/Editar-Estudiante.cy.ts
describe('Gestión de Estudiantes - Editar Estudiante', () => {
  const DOC_INICIAL = '44703066';
  const DOC_EDITADO = '44703067';

  beforeEach(() => {
    // Precondición: login
    cy.login('gonzaloRobinson', '123456');
  });

  it('debe editar un estudiante y validar cambios', () => {
    // Entrar al menú de Estudiantes
    cy.get('button[aria-label="Estudiantes"]').click({ force: true });
    cy.url().should('include', '/students');

    // Abrir búsqueda avanzada
    cy.contains(/Búsqueda avanzada/i).click({ force: true });

    // 👉 Buscar por documento inicial (usamos el input de Documento, no el de Carrera)
    cy.get('input[role="combobox"][placeholder*="documento"]')
      .should('exist')
      .type(DOC_INICIAL);

    // Esperar que aparezca en el dropdown y seleccionarlo
    cy.get('ul[role="listbox"]').should('be.visible');
    cy.contains('li', DOC_INICIAL).click({ force: true });

    // Click en Buscar
    cy.contains('button', /buscar/i).click({ force: true });

    // Validar que aparece el estudiante correcto
    cy.get('.MuiDataGrid-row').contains(DOC_INICIAL).should('exist');

    // Hacer click en Editar
    cy.get('.MuiDataGrid-row')
      .contains(DOC_INICIAL)
      .parents('.MuiDataGrid-row')
      .within(() => {
        cy.contains('Editar').click({ force: true });
      });

    // Redirige al formulario de edición
    cy.url().should('match', /\/students\/editar\/\d+/);

    // Editar campos
    cy.get('input[name="apellido"]').clear().type('Mir1');
    cy.get('input[name="nombre"]').clear().type('Iván1');
    cy.get('input[name="documento"]').clear().type(DOC_EDITADO);
    cy.get('input[name="domicilio"]').clear().type('balcarce 101');

    // Carrera (autocomplete)
    cy.get('label')
      .contains('Carrera')
      .invoke('attr', 'for')
      .then(id => {
        // Usamos selector por atributo en lugar de #id
        cy.get(`[id="${id}"]`).clear().type('INGENIERÍA QUÍMICA');

        // Seleccionar la opción en el dropdown
        cy.get('ul[role="listbox"]').contains('INGENIERÍA QUÍMICA').click();
      });

    // Validar que el valor quedó actualizado
    cy.get('label')
      .contains('Carrera')
      .invoke('attr', 'for')
      .then(id => {
        cy.get(`[id="${id}"]`).should('have.value', 'INGENIERÍA QUÍMICA');
      });

    // Email
    cy.get('input[name="email"]').clear().type('ivan.mir123@gmail.com');

    // Guardar cambios
    cy.contains('button', /actualizar estudiante/i).click({ force: true });

    // Validar redirección al detalle
    cy.url().should('match', /\/detalle\/\d+/);

    // Validar que los cambios se reflejan en el detalle
    cy.contains('Mir1').should('exist');
    cy.contains('Iván1').should('exist');
    cy.contains(DOC_EDITADO).should('exist');
    cy.contains('balcarce 101').should('exist');
    cy.contains('INGENIERÍA QUÍMICA').should('exist');
    cy.contains('ivan.mir123@gmail.com').should('exist');
  });
});
