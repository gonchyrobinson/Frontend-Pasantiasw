/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login a user
     * @example cy.login('gonzaloRobinson', '123456')
     */
    login(username: string, password: string): Chainable<void>;
  }
}
