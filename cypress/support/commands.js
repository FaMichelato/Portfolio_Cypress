// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Aqui eu crio comando personalizados para reutilização no código

Cypress.Commands.add('acessarHome', () => {
  cy.visit('/');
});

// verificaElemento - comando que vai verificar a existência do campo
Cypress.Commands.add('verificarElemento', (seletor, texto) => {
  cy.get(seletor).should('exist').and('contain.text', texto);
});


// verificarVisibilidade - comando que vai verificar se o elemento está visível
Cypress.Commands.add('verificarVisibilidade', (seletor, texto) => {
  cy.get(seletor).contains(texto).should('be.visible');
});
