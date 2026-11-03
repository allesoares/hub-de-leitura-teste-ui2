import catalogo from '../fixtures/livros.json';

describe('Funcionalidade: Busca no catálogo do Hub de Leitura', () => {
    beforeEach(() => {
        cy.visit('catalog.html');
    });

    //Testando percorrer lista de livros e verificar se os títulos não estão
    // vazios. Agora que tem o arquivo especifico de busca, achei melhor 
    // colocar o teste de busca aqui. 
    it('Deve exibir os livros do catálogo com sucesso', () => {
        cy.get('#book-list .card-title').each(($titulo) => {
            expect($titulo.text().trim()).not.to.be.empty;
        });
    });

    it('Deve buscar o livro 1984 com sucesso', () => {
        cy.get('#search-input').type('1984');
        cy.get('.card-title').should('contain', '1984');
    });

    it('Deve buscar um livro usando o arquivo de massa de dados', () => {
        cy.get('#search-input').type(catalogo[1].livro);
        cy.get('.card-title').should('contain', catalogo[1].livro);
    });

    it('Deve buscar um livro usando o fixture', () => {

        cy.fixture('livros').then((cat) => {
            cy.get('#search-input').type(cat[2].livro);
            cy.get('.card-title').should('contain', cat[2].livro);
        });
    });

    it('Deve buscar e validar todos os livros usando fixture', () => {
        cy.fixture('livros').then((livros) => {
            livros.forEach((item) => {
                cy.get('#search-input').clear().type(item.livro);
                cy.get('.card-title').should('contain', item.livro);
            });
        });
    });

    it('Deve buscar e validar todos os livros usando wrap', () => {
        //Uma outra forma pra percorrer os itens.
        cy.wrap(catalogo).each((item) => {
            cy.get('#search-input').clear().type(item.livro);
            cy.get('.card-title').should('contain', item.livro);
        });
    });

});
