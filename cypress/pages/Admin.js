class AdminPage {

    constructor() {
        this.adminMenu = 'a.oxd-main-menu-item[href="/web/index.php/admin/viewAdminModule"]'; // Seletor do menu Admin
        this.searchGrid = '.oxd-table-filter';
        this.userRoleDropdown = 'div.oxd-select-wrapper:nth-of-type(1)';
        this.userInput = ':nth-child(2) > .oxd-input'; // Campo Username
        this.searchButton = '.oxd-form-actions > .oxd-button--secondary'; // Botão "Search"
        this.resultGrid = '.oxd-table-header > .oxd-table-row'; // Grid de resultados
        this.resultRow = '.oxd-table-card > .oxd-table-row'; 
        
    }

    acessarAdmin() {
        cy.get(this.adminMenu).should('be.visible').click(); // Aguarda e clica no menu Admin
    }

    validarCamposBusca() {
        cy.get(this.searchGrid).within(() => {
            cy.contains('Username').should('be.visible');
            cy.contains('User Role').should('be.visible');
            cy.contains('Employee Name').should('be.visible');
            cy.contains('Status').should('be.visible');
        });
    }

    // Valida se os campos são do tipo correto
    validarTipoCampo() {
        cy.get(this.userRoleDropdown).should('exist').and('be.visible');        

    }

    inserirUsuarioParaBusca(username) {
        cy.get(this.userInput).should('be.visible').type(username);
    }

    clicarBuscar() {
        cy.get(this.searchButton).should('be.visible').click();
    }

    validarResultadoBusca() {
        cy.get(this.resultGrid).within(() => {
            cy.contains('Username').should('be.visible');
            cy.contains('User Role').should('be.visible');
            cy.contains('Employee Name').should('be.visible');
            cy.contains('Status').should('be.visible');
            cy.contains('Actions').should('be.visible');
        });
    }

    validarDadosRetornados() {
        cy.get('.oxd-table-card > .oxd-table-row', { timeout: 10000 })
          .first() 
          .should('be.visible')
          .within(() => {
              cy.contains('Admin').should('be.visible'); // Username
              cy.contains('Admin').should('be.visible'); // User Role
              cy.contains('Enabled').should('be.visible'); // Status
          });
    }
    
    
    
}


export default new AdminPage();