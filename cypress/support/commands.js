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


Cypress.Commands.add('login', (email, password) => {
    cy.get('#email').type(email, { log: false });
    cy.get('#password').type(password, { log: false });
    cy.get('#login-btn').click();
    cy.get('#alert-container')
        .should('contain', 'Login realizado com sucesso!');
    cy.url().should('include', 'dashboard');
});

// Preenche o formulário na página de cadastro já aberta.
Cypress.Commands.add('preencherCadastro', (nome, email, telefone, senha, confirmacaoSenha) => {
    cy.get('#name').type(nome);
    cy.get('#email').type(email);
    cy.get('#phone').type(telefone);
    cy.get('#password').type(senha);
    cy.get('#confirm-password').type(confirmacaoSenha);
    cy.get('#terms-agreement').check();
});
