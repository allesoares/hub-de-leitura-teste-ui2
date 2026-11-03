class CadastroPage {

    //Seletores
    campoNome() {
        return cy.get('#name');
    }

    campoEmail() {
        return cy.get('#email');
    }

    campoTelefone() {
        return cy.get('#phone');
    }

    campoSenha() {
        return cy.get('#password');
    }

    campoConfirmacaoSenha() {
        return cy.get('#confirm-password');
    }

    checkboxTermos() {
        return cy.get('#terms-agreement');
    }

    botaoCadastrar() {
        return cy.get('#register-btn');
    }


    //Métodos
    visitarPaginaCadastro() {
        cy.visit('register.html');
    }

    preencherCadastro(nome, email, telefone, senha, confirmacaoSenha) {
        if(nome) this.campoNome().type(nome);
        if(email) this.campoEmail().type(email);
        this.campoTelefone().type(telefone);
        this.campoSenha().type(senha);
        this.campoConfirmacaoSenha().type(confirmacaoSenha);
        this.checkboxTermos().check();
    }


}

export default new CadastroPage();
