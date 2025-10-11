// Importa o Jest para criar mocks
import { jest } from '@jest/globals';
import { exibirAgendamentoCliente } from '../../../src/repository/agendamento.js';
import { con } from '../../../src/connection.js';


// Mock do módulo de conexão com o banco de dados
jest.mock('../../../src/connection.js', () => ({
  con: {
    query: jest.fn()
  }
}));

// Describe o conjunto de testes para a função exibirAgendamentoCliente
describe('Teste Unitário: exibirAgendamentoCliente', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Teste 1: Cenário de sucesso, quando encontra agendamentos
  it('deve retornar a lista de agendamentos de um cliente específico', async () => {
    
    // 1. Arrange (Preparação)
    const cpfCliente = '123';
    
    // Criamos uma lista falsa de agendamentos que o banco "encontrou"
    const listaDeAgendamentosMock = [
      { id_agendamento: 1, data: '2025-10-10', hora: '14:00', procedimento: 'Cílios' },
      { id_agendamento: 2, data: '2025-11-15', hora: '10:00', procedimento: 'Sobrancelha' }
    ];

    // Instruímos o mock a retornar essa lista.
    // O array extra `[ ... ]` simula a estrutura [results, fields] que a biblioteca mysql2 retorna.
    con.query.mockResolvedValue([listaDeAgendamentosMock]);

    // 2. Act (Ação)
    const resultado = await exibirAgendamentoCliente(cpfCliente);

    // 3. Assert (Verificação)
    // Verificamos se a função retornou a lista de agendamentos que o mock forneceu
    expect(resultado).toEqual({ message: "Agendamento listado com sucesso!", success: true, data: listaDeAgendamentosMock });
    
    // Verificamos se a query foi chamada com o CPF correto
    expect(con.query).toHaveBeenCalledTimes(1);
    expect(con.query).toHaveBeenCalledWith(expect.any(String), [cpfCliente]);
  });

  // Teste 2: Cenário alternativo, quando não encontra agendamentos
  it('deve retornar um array vazio se o cliente não tiver agendamentos', async () => {

    // 1. Arrange
    const cpfCliente = '123';

    // A única diferença: instruímos o mock a retornar uma lista VAZIA.
    con.query.mockResolvedValue([ [] ]);

    // 2. Act
    const resultado = await exibirAgendamentoCliente(cpfCliente);

    // 3. Assert
    // Verificamos se a função retornou corretamente um array vazio
    expect(resultado).toEqual({ message: "Agendamento listado com sucesso!", success: true, data: [] });
    expect(con.query).toHaveBeenCalledTimes(1);
    expect(con.query).toHaveBeenCalledWith(expect.any(String), [cpfCliente]);
  });

  it('deve retornar um erro se a consulta ao banco falhar', async () => {

    // 1. Arrange
    const cpfCliente = '123';
    // Instruímos o mock a lançar um erro quando chamado
    con.query.mockRejectedValue(new Error('Erro de conexão com o banco'));
    // 2. Act
    const resultado = await exibirAgendamentoCliente(cpfCliente);
    // 3. Assert
    expect(resultado).toEqual({ message: "Erro de conexão com o banco !", success: false });
    expect(con.query).toHaveBeenCalledTimes(1);
    expect(con.query).toHaveBeenCalledWith(expect.any(String), [cpfCliente]);
  });

});