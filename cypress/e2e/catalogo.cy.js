import { faker } from '@faker-js/faker';

describe('Funcionalidade: Catálogo de livros', () => {
    beforeEach(() => {
        //Pagina de catalogo de livros
        cy.visit('catalog.html');
    });

    it('Deve clicar no botão adicionar a cesta', () => {
        cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()
        cy.get('#cart-count').should('contain', '1')
    });

    it('Deve clicar em todos os livros para adicionar à cesta', () => {
        cy.get('.btn-primary').click({ multiple: true })
    });

    it('Deve clicar no primeiro livro para adicioná-lo à cesta', () => {
        cy.get('.btn-primary').first().click()
        cy.get('#cart-count').should('contain', '1')
        cy.visit('basket.html')
        cy.get('#cart-list .card-title').should('contain.text', '1984')
    });

    it('Deve clicar no último livro para adicioná-lo à cesta', () => {
        cy.get('.btn-primary').last().click()
        cy.get('#cart-count').should('contain', '1')
        cy.visit('basket.html')
        cy.get('#cart-list .card-title').should('contain.text', 'O Alquimista')
    });

    it('Deve clicar no segundo livro para adicioná-lo à cesta', () => {
        cy.get('.btn-primary').eq(1).click()
        cy.get('#cart-count').should('contain', '1')
        cy.visit('basket.html')
        cy.get('#cart-list .card-title').should('contain.text', 'A Arte da Guerra')
    });

    it('Deve achar o livro Dom Casmurro e adicioná-lo à cesta', () => {
        cy.contains('#book-list .card', 'Dom Casmurro').find('.add-to-cart')
            .click()
        cy.get('#global-alert-container').should('contain', 'Dom Casmurro')
        cy.get('#cart-count').should('contain', '1')
        cy.visit('basket.html')
        cy.get('#cart-list .card-title').should('contain.text', 'Dom Casmurro')
    });

    it('Deve clicar no nome do livro e direcionar para a página do livro', () => {
        cy.contains('Dom Casmurro').click()
        cy.location('pathname').should('eq', '/book-details.html')
        cy.get('#book-title').should('contain.text', 'Dom Casmurro')
        cy.get('#book-author').should('contain.text', 'Machado de Assis')
        cy.get('#add-to-cart-btn').click()
        cy.get('#cart-count').should('contain', '1')
        cy.visit('basket.html')
        cy.get('#cart-list .card-title').should('contain.text', 'Dom Casmurro')
    });


});
