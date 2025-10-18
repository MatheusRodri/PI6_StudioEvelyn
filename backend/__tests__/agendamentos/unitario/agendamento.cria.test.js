// Importa o Jest para criar mocks
import { jest } from '@jest/globals';
import { criarAgendamento } from '../../../src/repository/agendamento.js';
import { con } from '../../../src/connection.js';


// Mock do módulo de conexão com o banco de dados
jest.mock('../../../src/connection.js', () => ({
  con: {
    query: jest.fn()
  }
}));

// Describe o conjunto de testes para a função criarAgendamento
describe('Teste Unitário: criarAgendamento', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste para verificar se a função cria um agendamento com sucesso
  it('deve cadastrar um agendamento com sucesso e retornar a mensagem de sucesso', async () => {
    
    const agendamentoMock = {DATA: '2023-10-10', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };
    

    con.query.mockResolvedValue([{affectedRows: 1}]);

    const resultado = await criarAgendamento(agendamentoMock);

    expect(resultado).toEqual({ message: "Agendamento realizado com sucesso!", success: true, data: agendamentoMock });
    
    expect(con.query).toHaveBeenCalledTimes(2);
    expect(con.query).toHaveBeenCalledWith(
         expect.any(String),
        [
            agendamentoMock.DATA,
            agendamentoMock.HORA,
            agendamentoMock.VALOR,
            agendamentoMock.PROCEDIMENTO,
            agendamentoMock.TP_PAGAMENTO,
            agendamentoMock.ID_CLIENT
        ]
    );
  });

  // Teste caso o agendamento não seja criado
  it('deve retornar uma mensagem de erro caso o agendamento não seja criado', async () => {
    const agendamentoMock = {DATA: '2023-10-10', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };
    con.query.mockResolvedValue([{affectedRows: 0}]);
    const resultado = await criarAgendamento(agendamentoMock);
    expect(resultado).toEqual({ message: "Houve um erro ao criar o agendamento.", success: false });
    expect(con.query).toHaveBeenCalledTimes(2);
    expect(con.query).toHaveBeenCalledWith(
          expect.any(String),
        [
            agendamentoMock.DATA,
            agendamentoMock.HORA,
            agendamentoMock.VALOR,
            agendamentoMock.PROCEDIMENTO,
            agendamentoMock.TP_PAGAMENTO,
            agendamentoMock.ID_CLIENT
        ]
    );
  });

  // Teste para verificar se a função envia um erro caso algum campo esteja vazio
  it('deve retornar erro de validação se um campo estiver vazio e NÃO chamar o banco', async () => {
    // Arrange: Dados inválidos
    const agendamentoMock = {DATA: '', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };

    // NÃO configuramos o mock con.query aqui, pois ele não deve ser chamado

    // Act
    const resultado = await criarAgendamento(agendamentoMock);

    // Assert: Verificamos a mensagem de validação da sua função
    expect(resultado).toEqual({ message: "Todos os campos devem ser preenchidos.", success: false });
    
    // Verificação CRUCIAL: garante que o banco NÃO foi chamado
    expect(con.query).not.toHaveBeenCalled(); 
});

  // Teste para verificar se a função envia um erro caso já exista um agendamento no mesmo dia e horário
  it("deve retornar erro de duplicidade se o SELECT encontrar um agendamento", async () => {
    // Arrange: Dados válidos
    const agendamentoMock = {DATA: '2023-10-10', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };

    // Instrução para o mock: Simule que a PRIMEIRA query (o SELECT) encontrou um registro.
    // O array interno `[{...}]` representa as linhas encontradas.
    con.query.mockResolvedValueOnce([ [{ id: 99, DATA: '2023-10-10' }] ]); 
    
    // NÃO precisamos configurar a segunda chamada, pois a função deve parar antes.

    // Act
    const resultado = await criarAgendamento(agendamentoMock);

    // Assert: Verificamos a mensagem de duplicidade da sua função
    expect(resultado).toEqual({ message: "Já existe um agendamento para este dia e horário.", success: false });
    
    // Verificação CRUCIAL: garante que o banco foi chamado APENAS UMA VEZ (para o SELECT)
    expect(con.query).toHaveBeenCalledTimes(1); 
});

  it('deve retornar um erro genérico se a primeira consulta (SELECT) ao banco falhar', async () => {

    // 1. Arrange
    const agendamentoMock = {DATA: '2023-10-10', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };
    const erroDoBanco = new Error('Erro de conexão com o banco');
    
    // Instruímos o mock a falhar na PRIMEIRA chamada que encontrar
    con.query.mockRejectedValueOnce(erroDoBanco); // Usar Once é uma boa prática aqui

    // 2. Act
    const resultado = await criarAgendamento(agendamentoMock);

    // 3. Assert
    // Verifica a mensagem do bloco CATCH da sua função
    expect(resultado).toEqual({ message: "Erro de conexão com o banco !", success: false }); // <-- Use a mensagem do seu catch
    
    // Verifica que a query foi chamada UMA VEZ (a SELECT)
    expect(con.query).toHaveBeenCalledTimes(1);
    
    // A CORREÇÃO ESTÁ AQUI: Verificamos os argumentos da PRIMEIRA query (a SELECT)
    expect(con.query).toHaveBeenCalledWith(
        expect.stringContaining('SELECT'), // Esperamos a query SELECT
        [
            agendamentoMock.DATA, // Apenas DATA
            agendamentoMock.HORA  // E HORA
        ]
    );
});
});