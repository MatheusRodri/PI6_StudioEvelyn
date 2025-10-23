describe('Fluxo de Agendamento - Studio Evelyn', () => {
    beforeEach(() => {
        // 1. Visita a página inicial da aplicação antes de cada cenário
        cy.visit('/'); // Usa a baseUrl que você configurou (http://localhost:3000)
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

    it('Deve permitir que um usuário agende um serviço com informações válidas', () => {
        cy.get('a[href="/agendamento"]').click();
        cy.get('input[name="data"]').type('2023-10-01');
        cy.get('input[name="hora"]').type('10:00');
        cy.get('input[name="servico"]').check('Brasileiro');
        cy.get('#btn-agendar').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Agendamento realizado com sucesso!');
        });
    });

    it('deve enviar uma mensagem caso algum campo esteja vazio', () => {
        cy.get('a[href="/agendamento"]').click();
        cy.get('#btn-agendar').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, preencha todos os campos.');
        });
    });


   


});