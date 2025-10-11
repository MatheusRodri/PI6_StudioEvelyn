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
    
    expect(con.query).toHaveBeenCalledTimes(1);
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
    expect(con.query).toHaveBeenCalledTimes(1);
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
  it('deve enviar um erro caso algum campo esteja vazio', async () => {
    const agendamentoMock = {DATA: '', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };


    
    const resultado = await criarAgendamento(agendamentoMock);

    expect(resultado).toEqual({ message: "Todos os campos devem ser preenchidos.", success: false });
    expect(con.query).toHaveBeenCalledTimes(1);
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

  // Teste para verificar se a função envia um erro caso já exista um agendamento no mesmo dia e horário
  it("deve enviar um erro caso já exista um agendamento no mesmo dia e horário", async () => {
    const agendamentoMock = {DATA: '2023-10-10', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };

    const resultado = await criarAgendamento(agendamentoMock);
    expect(resultado).toEqual({ message: "Já existe um agendamento para este dia e horário.", success: false });
    expect(con.query).toHaveBeenCalledTimes(1);
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

  it('deve retornar um erro se a consulta ao banco falhar', async () => {

    // 1. Arrange
    const agendamentoMock = {DATA: '2023-10-10', HORA: '10:00:00', VALOR: 100.00, PROCEDIMENTO: 'Corte de cabelo', TP_PAGAMENTO: 'Dinheiro', ID_CLIENT: 1 };
    // Instruímos o mock a lançar um erro quando chamado
    con.query.mockRejectedValue(new Error('Erro de conexão com o banco'));
    // 2. Act
    const resultado = await criarAgendamento(agendamentoMock);
    // 3. Assert
    expect(resultado).toEqual({ message: "Erro de conexão com o banco !", success: false });
    expect(con.query).toHaveBeenCalledTimes(1);
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
});