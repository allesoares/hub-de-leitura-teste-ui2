describe('Funncionalidade: Contato no Hub de Leitura', () => {

  beforeEach(() => {
    cy.visit('index.html')
  });

  it('Deve preencher o formulário de contato com sucesso', () => {

    cy.get('[name="name"]').type('Alexandre')
    cy.get('[name="email"]').type('alexandre@teste.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Gostaria de saber mais sobre parcerias.')
    cy.get('#btn-submit').click()
    // resultado esperado
    cy.contains('Contato enviado com sucesso!').should('exist')
  });

  it('Deve validar mensagem de erro sem preencher nome', () => {

    cy.get('[name="name"]').clear()
    cy.get('[name="email"]').type('alexandre@teste.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Gostaria de saber mais sobre parcerias.')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain.text', 'Por favor, preencha o campo Nome.')


  });

  it('Deve validar mensagem de erro sem preencher email', () => {

    cy.get('[name="name"]').type('Alexandre')
    cy.get('[name="email"]').clear()
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Gostaria de saber mais sobre parcerias.')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain.text', 'Por favor, preencha o campo E-mail.')
  });

  it('Deve validar mensagem de erro sem preencher assunto', () => {

    cy.get('[name="name"]').type('Alexandre')
    cy.get('[name="email"]').type('Alexandre@teste.com')
    //cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Gostaria de saber mais sobre parcerias.')
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain.text', 'Por favor, selecione o Assunto.')
  });

  it('Deve validar mensagem de erro sem preencher mensagem', () => {

    cy.get('[name="name"]').type('Alexandre')
    cy.get('[name="email"]').type('Alexandre@teste.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').clear()
    cy.get('#btn-submit').click()
    cy.get('#alert-container').should('contain.text', 'Por favor, escreva sua Mensagem.')
  });
});
