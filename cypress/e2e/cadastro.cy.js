import { faker } from '@faker-js/faker';
import cadastroPage  from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve preencher o formulário de cadastro com sucesso, usando JS', () => {
        let timestamp = Date.now()
        let email = `alexandre+${timestamp}@teste.com`
        cy.get('#name').type('Alexandre')
        cy.get('#email').type(email)
        cy.get('#phone').type('11999999999')
        cy.get('#password').type('senha123')
        cy.get('#confirm-password').type('senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', '/dashboard.html')
    });

    it('Deve preencher o formulário de cadastro com sucesso, usando Faker', () => {
        let email = faker.internet.email()
        let name = faker.person.fullName()
        cy.get('#name').type(name)
        cy.get('#email').type(email)
        cy.get('#phone').type('11999999999')
        cy.get('#password').type('senha123')
        cy.get('#confirm-password').type('senha123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado: redirecionamento para a página de dashboard
        cy.url().should('include', '/dashboard.html')
        cy.get('#user-name').should('contain.text', name)
    });

    it('Não deve cadastrar quando as senhas forem diferentes', () => {
        cy.get('#name').type('Alexandre')
        cy.get('#email').type('alexandre@teste.com')
        cy.get('#phone').type('11999999999')
        cy.get('#password').type('senha123')
        cy.get('#confirm-password').type('senha456')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        // Resultado esperado: mensagem de erro e permanência no cadastro
        cy.contains('Senhas não coincidem').should('be.visible')
        cy.url().should('include', '/register.html')
    });

    it('Deve cadastrar com sucesso usando o comando customizado', () => {
        let email = faker.internet.email()
        let name = faker.person.fullName()
        cy.preencherCadastro(name, email, '11999999999', 'senha123', 'senha123')
        cy.get('#register-btn').click()
        cy.url().should('include', '/dashboard.html')
        cy.get('#user-name').should('contain.text', name)
    });

    it('Deve cadastrar com sucesso usando cadastro-page', () => {
        let email = faker.internet.email()
        let name = faker.person.fullName()
        cadastroPage.preencherCadastro(name, email, '11999999999', 'senha123', 'senha123')
        cadastroPage.botaoCadastrar().click()
        //Resultado esperado: redirecionamento para a página de dashboard
        cy.url().should('include', '/dashboard.html')
        cy.get('#user-name').should('contain.text', name)
    });

    it('Não deve cadastrar quando o nome não for preenchido', () => {
        let email = faker.internet.email()
        cadastroPage.preencherCadastro('', email, '11999999999', 'senha123', 'senha123')
        cadastroPage.botaoCadastrar().click()
        cadastroPage.campoNome().should('have.class', 'is-invalid')
        cy.contains('Nome deve ter pelo menos 2 caracteres').should('be.visible')
        cy.url().should('include', '/register.html')
    });

    it('Não deve cadastrar quando o email for inválido', () => {
        cadastroPage.preencherCadastro('Alexandre', 'alexandre@teste', '11999999999', 'senha123', 'senha123')
        cadastroPage.botaoCadastrar().click()
        cadastroPage.campoEmail().should('have.class', 'is-invalid')
        cy.contains('Email válido é obrigatório').should('be.visible')
        cy.url().should('include', '/register.html')
    });

});
