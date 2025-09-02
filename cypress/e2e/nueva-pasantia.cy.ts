// cypress/e2e/pasantias/nueva-pasantia.cy.ts
describe('Pasantías - Nueva pasantía', () => {
  const DNI_OBJETIVO = '20267106';

  beforeEach(() => {
    cy.login('gonzaloRobinson', '123456');
  });

  it('flujo completo de creación de pasantía', () => {
    cy.get('button[aria-label="Pasantías"]').click({ force: true });
    cy.url().should('include', '/pasantias');

    cy.contains(/nueva pasant[ií]a/i).click({ force: true });
    cy.url().should('match', /pasantias\/(nueva|crear|form)/i);

    // Estudiante
    cy.get('button[aria-label="Abrir"]').first().click({ force: true });
    cy.get('ul[role="listbox"]').contains(DNI_OBJETIVO).click({ force: true });
    cy.get('input[role="combobox"]').first().should('have.value', DNI_OBJETIVO);

    // Empresa
    cy.get('button[aria-label="Abrir"]').eq(1).click({ force: true });
    cy.get('ul[role="listbox"]')
      .contains(/Empresa/i)
      .first()
      .click({ force: true });

    // Asignación Mensual
    cy.get('input[name="asignacionMensual"]').type('50000');

    // Obra Social
    cy.get('input[name="obraSocial"]').type('OSDE');

    // ART
    cy.get('input[name="art"]').type('Prevención ART');

    // Tutor de la Empresa
    cy.get('input[name="tutorEmpresa"]').type('Juan Pérez');

    // Tutor de la Facultad
    cy.get('input[name="tutorFacultad"]').type('María López');

    // DNI Tutor Facultad
    cy.get('input[name="dniTutorFacultad"]').type('30111222');

    // Fechas
    cy.get('input[name="fechaInicio"]').type('2025-09-02');
    cy.get('input[name="fechaFin"]').type('2025-12-01');

    // Tipo de Acuerdo
    cy.get('button[aria-label="Abrir"]').eq(2).click({ force: true });
    cy.get('ul[role="listbox"]').contains('Pasantía').click({ force: true });

    // Frecuencia de Pago
    cy.get('button[aria-label="Abrir"]').eq(3).click({ force: true });
    cy.get('ul[role="listbox"]').contains('Mensual').click({ force: true });

    // Monto de Pago
    cy.get('input[name="montoPago"]').type('150000');

    // Sudocu
    cy.get('input[name="sudocu"]').type('12345');

    // Observaciones
    cy.get('textarea[name="observaciones"]').type(
      'Observación de prueba automatizada'
    );

    // Guardar
    cy.contains('button', /Guardar/i).click({ force: true });

    // Verificación (ajusta al mensaje de éxito real en tu app)
    cy.contains(/Guardado|Éxito|Pasant[ií]a creada/i).should('be.visible');
  });
});
