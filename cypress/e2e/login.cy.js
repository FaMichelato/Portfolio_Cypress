import LoginPage from '../pages/LoginPage';

describe('Teste de acesso no OrangeHRM', () => {
    it('Deve acessar a página de login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.url().should('include', 'orangehrmlive'); 
    });
});


describe('Teste de Login', () => {
    beforeEach(() => {
        LoginPage.visit();
    });
    

    it('Deve fazer login com sucesso', () => {
        LoginPage.loginSucesso;
    });

    it('Deve exibir mensagem de erro ao usar credenciais inválidas', () => {
        LoginPage.loginInsucesso;
    });

    it('Deve exibir mensagem de erro ao não inserir o usuário', () => {
            
        // Não preenche o usuário
        LoginPage.fillPassword('admins123'); // Apenas preenche a senha
        LoginPage.clickLogin(); 
    
        // Valida mensagem 
        cy.get('.oxd-input-group > .oxd-text')
          .should('be.visible')
          .and('contain', 'Required');
    });

    it('Deve exibir mensagem de erro ao não inserir a senha', () => {
            
        // Não preenche o usuário
        LoginPage.fillUsername('Admin'); // Apenas preenche a senha
        LoginPage.clickLogin(); 
    
        // Valida mensagem 
        cy.get('.oxd-input-group > .oxd-text')
          .should('be.visible')
          .and('contain', 'Required');
    });
});


describe('Teste Esqueci a senha', () => {
    beforeEach(() => {
        LoginPage.visit();
    });
    
    it('Deve acessar a página de recuperação de senha', () => {
        LoginPage.recuperacao
    });

    it('Validar a mensagem de solicitação de usuário', () => {
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.url().should('include', '/requestPasswordResetCode');

        cy.get('.orangehrm-card-note > .oxd-text', { timeout: 10000 })
          .should('be.visible')
          .and('contain', 'Please enter your username to identify your account to reset your password');
    });

    it('Deve inserir um usuário e cancelar a recuperação de senha', () => {
                
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.url().should('include', '/requestPasswordResetCode');
        cy.get('.oxd-text--h6').should('contain', 'Reset Password');
        
        cy.get('.oxd-button--ghost').click();
        cy.url().should('include', '/auth/login'); // Confirma retorno para a página de login
    });

    it('Deve recuperar a senha com sucesso', () => {
        cy.get('.orangehrm-login-forgot > .oxd-text').click();
        cy.url().should('include', '/requestPasswordResetCode');
        cy.get('.oxd-text--h6').should('contain', 'Reset Password');

        LoginPage.inserirUsuarioParaRecuperacao('UsuarioTeste'); // Insere um usuário de teste
        LoginPage.recuperarSenha(); // Clica no botão "Reset Password"
        LoginPage.verificarMensagemSucesso(); // Valida as mensagens de sucesso
    });
    
});
