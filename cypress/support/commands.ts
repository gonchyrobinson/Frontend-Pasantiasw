/// <reference types="cypress" />
// cypress/support/commands.ts

// Definimos un custom command "login"
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/login');

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.contains('button', 'Iniciar Sesión').click();

  // Ajusta la URL esperada después del login
  cy.url().should('include', '/dashboard');
});
