class LoginPage {
    constructor() {
        this.usernameField = 'input[name="username"]'; // Seletor pelo atributo name
        this.passwordField = 'input[name="password"]'; // Ajuste também para senha
        this.loginButton = '.oxd-button'; // Ajuste para o botão de login (confirme no DevTools)
        this.resetInput = '.oxd-input';
    }

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get(this.usernameField, { timeout: 10000 }).should('be.visible'); 
    }
    

    fillUsername(username) {
        cy.get(this.usernameField).type(username);
    }

    fillPassword(password) {
        cy.get(this.passwordField).type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    login(username, password) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickLogin();
    }

    loginSucesso(username, password) {
        LoginPage.login('Admin', 'admin123');
        cy.url().should('include', '/dashboard');
    }

    loginInsucesso(username, password) {
        LoginPage.login('Admin', 'senhaErrada');
        cy.get('.oxd-alert-content > .oxd-text').should('contain', 'Invalid credentials');
    }

    usuarioRecuperacao() {
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.url().should('include', '/requestPasswordResetCode');

        cy.get('.oxd-input').type('UsuarioTeste');
    }

    recuperacao(){
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.url().should('include', '/requestPasswordResetCode');
        cy.get('.oxd-text--h6').should('contain', 'Reset Password');
    }

    recuperarSenha() {
        cy.get('.oxd-button--secondary').click();
    }
    
    verificarMensagemSucesso() {
        cy.get('.oxd-text--h6')
          .should('be.visible')
          .and('contain', 'Reset Password link sent successfully');
    
        cy.get('.orangehrm-card-note--background')
          .should('be.visible')
          .and('contain', 'Note: If the email does not arrive, please contact your OrangeHRM Administrator.');
    }

    inserirUsuarioParaRecuperacao(username) {
        cy.get(this.resetInput).type(username);
    }
    
}

export default new LoginPage();
