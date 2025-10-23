// cypress/e2e/login.cy.js

// O `describe` agrupa testes relacionados, como testes da tela de login
describe('Fluxo de Login - Studio Evelyn', () => {

  // O `beforeEach` executa um comando antes de CADA teste (`it`) dentro deste `describe`
  beforeEach(() => {
    // 1. Visita a página inicial da aplicação antes de cada cenário
    cy.visit('/'); // Usa a baseUrl que você configurou (http://localhost:3000)
  });

  // Primeiro cenário: Login com sucesso
  it('Deve permitir que um usuário faça login com credenciais válidas', () => {
    // 2. Encontra o elemento que leva para a página de login e clica nele
    //    (AJUSTE o seletor para corresponder ao seu HTML. Usar data-cy é o ideal)
    cy.get('a[href="/login"]').click(); // Exemplo: Clica num link que vai para /login

    // 3. Verifica se a URL mudou para a página de login (opcional, mas bom)
    cy.url().should('include', '/login');

    // 4. Encontra o campo de email, digita o email de teste
    //    (AJUSTE o seletor 'input[name="email"]' para o seu campo de email)
    cy.get('input[name="email"]').type('ADM@ADM.COM');

    // 5. Encontra o campo de senha, digita a senha de teste
    //    (AJUSTE o seletor 'input[name="senha"]' para o seu campo de senha)
    cy.get('input[name="password"]').type('123');

    // 6. Encontra o formulário de login e o envia
    //    (AJUSTE o seletor 'form' se necessário)
    cy.get('form').submit();

    // 7. Verifica se o login foi bem-sucedido.
    cy.url().should('include', '/agendamentos');

  });

// Teste 02: Login com falha
  it('Deve exibir uma mensagem de erro ao tentar fazer login com credenciais inválidas', () => {
    // Navega para a página de login
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    // Preenche o formulário de login com credenciais inválidas
    cy.get('input[name="email"]').type('usuario_teste@email.com');
    cy.get('input[name="password"]').type('senha_incorreta');
    cy.get('form').submit();
    // Verifica se a mensagem de erro é exibida
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Erro ao efetuar login. Verifique suas credenciais e tente novamente.');
    });
  });

});