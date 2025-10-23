describe('Fluxo de Cadastro - Studio Evelyn', () => {
    beforeEach(() => {
        // 1. Visita a página inicial da aplicação antes de cada cenário
        cy.visit('/'); // Usa a baseUrl que você configurou (http://localhost:3000)
    });
    it('Deve permitir que um novo usuário se cadastre com informações válidas', () => {
        
        cy.visit('/login')
        cy.get('a[href="/registro"]').click();
        
        cy.get('input[name="nome"]').type('Nome do Usuário');
        cy.get('input[name="cpf"]').type('12345678901');
        cy.get('input[name="email"]').type('usuario_teste@email.com');
        cy.get('input[name="password"]').type('senha_forte');

        cy.get('form').submit(); 
        cy.url().should('include', '/login');
        
        cy.on('window:alert', (str) => {
        
            expect(str).to.equal('Cadastro realizado com sucesso!');
        
        });
    });

    it('deve enviar uma mensagem caso algum campo esteja vazio', () => {
        
        cy.visit('/login')
        cy.get('a[href="/registro"]').click();
        cy.get('form').submit();
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Por favor, preencha todos os campos.');
        });
    });
});