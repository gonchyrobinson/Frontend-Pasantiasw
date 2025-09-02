describe('Login', () => {
  beforeEach(() => {
    // Ajusta la ruta si el login no está en "/login"
    cy.visit('/login');
  });

  it('debería mostrar errores si los campos están vacíos', () => {
    cy.contains('Iniciar Sesión').click();

    cy.contains('El usuario es requerido').should('be.visible');
    cy.contains('La contraseña es requerida').should('be.visible');
  });

  it('debería iniciar sesión correctamente con credenciales válidas', () => {
    // Escribe en el campo usuario
    cy.get('input[name="username"]').type('gonzaloRobinson');

    // Escribe en el campo contraseña
    cy.get('input[name="password"]').type('123456');

    // Clic en el botón Iniciar Sesión
    cy.contains('button', 'Iniciar Sesión').click();

    // Verificar redirección (ajusta la URL real de tu dashboard)
    cy.url().should('include', '/dashboard');

    // Verificar que aparece algo del home
    cy.contains(/bienvenido|dashboard/i).should('be.visible');
  });

  // it("debería mostrar error con credenciales inválidas", () => {
  //   cy.get('input[name="username"]').type("usuarioInvalido");
  //   cy.get('input[name="password"]').type("claveIncorrecta");
  //   cy.contains("button", "Iniciar Sesión").click();

  //   // Usa el mensaje de error que devuelve tu backend
  //   cy.contains("Credenciales inválidas").should("be.visible");
  // });
});
