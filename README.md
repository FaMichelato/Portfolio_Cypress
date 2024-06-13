# Desafio técnico

Este é um projeto de testes automatizados utilizando Cypress para testar a aplicação VR-Front.


##Pré-requisitos
Certifique-se de ter o seguinte instalado em sua máquina:

Node.js (recomendado a versão LTS)
Passos para Instalação

bash

npm install
Este comando instala todas as dependências listadas no arquivo package.json.

Executando os Testes
Para executar os testes automatizados, utilize o seguinte comando:

bash

npx cypress run
Isso executará os testes em modo headless (sem interface gráfica) no Cypress.

Para abrir a interface do Cypress e executar manualmente os testes, use o comando:

bash

npx cypress open
Selecione os testes que deseja executar na interface do Cypress.

Estrutura do Projeto
cypress/e2e: Contém os arquivos de teste organizados em pastas e arquivos.
cypress/support: Arquivos de suporte para comandos personalizados e configuração do Cypress.
cypress.json: Arquivo de configuração do Cypress.# Area_Cliente - cypress tests

## Execução

Instalação das dependências

```bash
npm install
```

Para abrir o cypress e gerenciar os testes pela interface:

```bash
npm run cypress:open
```

Para rodar os testes do cypress no terminal:

```bash
npm run cypress:run
```
