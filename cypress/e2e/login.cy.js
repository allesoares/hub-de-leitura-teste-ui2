// As contas são lidas de cypress.env.json ou das variáveis CYPRESS_TEST_* do CI.

describe('Funcionalidade: Login no Hub de Leitura', () => {
    let user
    let admin
    beforeEach(() => {
        cy.env(['TEST_USER_EMAIL', 'TEST_USER_PASSWORD', 'TEST_ADMIN_EMAIL', 'TEST_ADMIN_PASSWORD']).then((contas) => {
            for (const nome of Object.keys(contas)) {
                if (typeof contas[nome] !== 'string' || !contas[nome].trim()) {
                    throw new Error('Configure ' + nome + ' em cypress.env.json ou no ambiente do CI.')
                }
            }
            user = { email: contas.TEST_USER_EMAIL, senha: contas.TEST_USER_PASSWORD }
            admin = { email: contas.TEST_ADMIN_EMAIL, senha: contas.TEST_ADMIN_PASSWORD }
        })
        //Pagina de login
        cy.visit('login.html');
    });


    it('Deve fazer login com sucesso', () => {
        cy.get('#email').type(user.email, { log: false });
        cy.get('#password').type(user.senha, { log: false });
        cy.get('#login-btn').click();
        cy.get('#alert-container').should('contain', 'Login realizado com sucesso!');
        cy.url().should('include', 'dashboard');
    });

    it('Deve fazer login com sucesso com conta Admin - usando o comando customizado', () => {
        cy.login(admin.email, admin.senha);
    });

    it('Deve fazer login com sucesso usando configuração local e o comando customizado', () => {
        cy.login(user.email, user.senha);
    });


});
