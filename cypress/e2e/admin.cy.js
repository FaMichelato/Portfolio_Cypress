import LoginPage from '../pages/LoginPage';
import AdminPage from '../pages/Admin';

describe('Testes da funcionalidade Admin - Acesso e validação de campos', { testIsolation: false }, () => {
    before(() => {
        LoginPage.visit();
        LoginPage.login('Admin', 'admin123'); // Faz login antes de cada teste
        AdminPage.acessarAdmin(); // Acessa a página Admin
    });

    it('Deve acessar a funcionalidade Admin com sucesso', () => {
        AdminPage.acessarAdmin();

        // Verifica se a URL mudou para a seção "Admin"
        cy.url().should('include', '/web/index.php/admin/viewSystemUsers');

        // Valida se o título da página de Admin está visível
        cy.get('.oxd-table-filter-header-title > .oxd-text').should('contain', 'System Users');
    });

    it('Deve validar a presença dos campos de busca na grid de Admin', () => {
        AdminPage.validarCamposBusca(); // Chama o método de validação
    });

    it('Deve validar que os campos "User Role" e "Status" são combobox', () => {
        AdminPage.validarTipoCampo(); // Chama o método de validação dos dropdowns
    });

    describe('Testes da funcionalidade Consulta Admin', { testIsolation: false },() => {
          
        it('Deve buscar um usuário pelo nome', () => {
            AdminPage.inserirUsuarioParaBusca('Admin'); // Insere "Admin" no campo de busca
            AdminPage.clicarBuscar(); // Clica no botão "Search"
        });
    
        it('Deve validar os campos da grid de resultados após a busca', () => {
           
            AdminPage.validarResultadoBusca(); // Valida a grid
        });

        it('Deve validar os dados retornados na grid após a busca', () => {
            AdminPage.validarDadosRetornados(); // Valida os valores na grid
        });
    });

    
});
