// Arquivo contendo os casos de teste. São separados por describes (cenários) e dentro deles os casos de testes realacionados

import { CypressPromise } from 'cypress-promise'; // importando o cypress promise para validação da nova aba do compre online

describe('Acessar página inicial da VR', () => {
    context('Validação de acesso a página', { testIsolation: false }, () => {
        before(function() {
            cy.acessarHome({ timeout: 10000 }); // Timeout para dar tempo de carregamento da página
           
        });
        
// Caso de teste para verificar o acesso correto
it('Deve verificar se a página inicial carrega corretamente', () => {
    cy.url().should('eq', 'https://www.vr.com.br/');
});

// Caso de teste verificando a existência e visibilidade do elemento utilizando o comando personalizado
    it('Deve verificar a existência e visibilidade da opção "Compre online"', () => {
    cy.verificarVisibilidade('.vr-login__trigger-label', 'Compre online');
    });

// Caso de teste que efetua o clique na opção Compre online
it('Deve clicar na opção "Compre online" e verificar a URL da nova guia', () => {
    const urlEsperada = 'https://loja.vr.com.br/';

    // Solução para validar a abertura da nova tela Compre Online

    // Captura a função window.open para monitorar as chamadas
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');

        // Clica no link para abrir a nova guia
        cy.get('.vr-login__trigger-label')
            .contains('Compre online')
            .should('be.visible')
            .invoke('removeAttr', 'target') // Remove o atributo target para abrir o link na mesma aba
            .click(); 
    });

    // Verifica se a função window.open foi chamada com o URL esperado
    cy.get('@windowOpen').should('be.calledWith', urlEsperada);
});


});

// Cenário de acesso a loja e compra de benefício

describe('Fluxo de compra - VR Auto', () => {
    context('Seleção e compra - VR Auto', { testIsolation: false }, () => {
        before(function() {
            cy.visit('https://loja.vr.com.br/');
            cy.wait(2500);
        });

//Caso de teste para fechar o modal apresentado na tela de compra online
    it('Deve acessar a loja e fechar o modal', () => {
        
        // Verifica se o ícone de fechar está visível antes de clicar
        cy.get('.fas.fa-times')
            .should('be.visible')
            .click(); // Clica no ícone para fechar o modal
    });

     it('Deve verificar se o elemento está visível e contém o texto "Cartões VR"', () => {
       
        cy.get('[data-testid="shelf-product-container-modalidade-avulso"] > .lojavr-style-c-hhhcdu')
            .should('be.visible')
            .contains('Cartões VR');
    });

    it('Deve clicar no botão "Cartões VR" e seleciona o tipo VR Auto', () => {
        
        cy.get('#btn-selecionar-modalidade-avulso')
            .should('be.visible')
            .click({force: true});
    // Seleciona o VR Auto
        cy.get(':nth-child(4) > :nth-child(2) > .input-styled__input-holder > .plus-button')
            .should('be.visible')
            .click({force: true })
            .click({force: true }); 
    });

    it('Deve inserir o valor para o cartão selecionado no produto auto', () => {
        
        cy.get('#produto-auto-valor')
            .should('be.visible') 
            .click({force: true })
            .type('20000'); // Insere o valor 'R$200,00' no campo
        
    });
    
    it('Deve confirmar o valor inserido para o carrinho', () => {
        //Primeira confirmação
        cy.get('#btn-adicionar-carrinho-auto')
            .should('be.visible') 
            .click({force: true });
        //Confirma envio para o carrinho
        cy.get('[data-testid="btn-seguir-carrinho-auto"]')
        .should('be.visible') 
        .click({force: true });
        //Fecha modal do CNPJ da empresa
        cy.get('.close-button > .fa-solid')
        .click({force: true });
        //Clica e acesso ao carrinho
        cy.get('#btn-meu-carrinho > .fa-light')
        .click({force: true });
                
    });
//Caso de teste de validação dos dados adicionados
    it('Deve validar as informações do produto VR Auto adicionados ao carrinho', () => {
        cy.get('.lojavr-style-c-fUZzBt').should('be.visible').within(() => {
            cy.contains('Auto');
            cy.contains('Valor por cartão');
            cy.contains('R$ 200,00');
            cy.contains('Quantidade cartões');
            cy.contains('02');
        });
        cy.get('.footer__information').should('be.visible').within(() => {
            cy.contains('Total parcial');
            cy.contains('R$ 400,00');
        });
      });
});


});

});

