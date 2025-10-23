describe('Agendamento de Consulta', () => {
    beforeEach(() => {
        // Supondo que o usuário já esteja logado e na página de agendamento
        cy.visit('/');
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

    it('Deve exibir os agendamentos na página de agendamentos', () => {
        cy.contains('01/10/2023');
        cy.contains('10:00');
        cy.contains('Brasileiro');
    });
}); 