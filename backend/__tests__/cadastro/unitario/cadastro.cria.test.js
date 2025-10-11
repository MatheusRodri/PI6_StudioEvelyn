import { jest } from '@jest/globals';
import { criarCliente } from '../../../src/repository/login.js';
import { con } from '../../../src/connection.js';

jest.mock('../../../src/connection.js', () => ({
  con: {
    query: jest.fn()
  }
}));

describe('Teste Unitário: criarCliente', () => {

  beforeEach(async () => {
    jest.clearAllMocks();
  });
  
  // Teste para verificar se a função cria um cliente com sucesso
  it('deve cadastrar um cliente com sucesso e retornar a mensagem de sucesso', async () => {

    const clienteMock = { CPF: '123', NOME: 'Matheus', EMAIL: 'matheus@teste.com', SENHA: '123' };
    
    con.query.mockResolvedValue([{affectedRows: 1}]);

    const resultado = await criarCliente(clienteMock);

    
    expect(resultado).toEqual({ message: "Cadastro realizado com sucesso !",success:true,data:clienteMock });

    expect(con.query).toHaveBeenCalledTimes(1);

    expect(con.query).toHaveBeenCalledWith(expect.any(String), [
      clienteMock.CPF,
      clienteMock.NOME,
      clienteMock.EMAIL,
      clienteMock.SENHA,
    ]);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });
  
  // Teste para verificar se a função cria um cliente com sucesso
  it('deve enviar uma mensagem de erro caso ocorra algo', async () => {

    const clienteMock = { CPF: '', NOME: 'Matheus', EMAIL: 'matheus@teste.com', SENHA: '123' };

    con.query.mockResolvedValue([{affectedRows: 0}]);

    const resultado = await criarCliente(clienteMock);

    expect(resultado).toEqual({ message: "Erro ao cadastrar cliente!", success: false });

    expect(con.query).toHaveBeenCalledTimes(1);

    expect(con.query).toHaveBeenCalledWith(expect.any(String), [
      clienteMock.CPF,
      clienteMock.NOME,
      clienteMock.EMAIL,
      clienteMock.SENHA,
    ]);
  });

  it('deve lançar um erro se a consulta ao banco de dados falhar', async () => {

    const clienteMock = { CPF: '123', NOME: 'Matheus', EMAIL: 'matheus@teste.com', SENHA: '123' };

    
    con.query.mockRejectedValue(new Error('Erro de conexão com o banco de dados'));

    const resultado = await criarCliente(clienteMock);

    expect(con.query).toHaveBeenCalledTimes(1);
    expect(con.query).toHaveBeenCalledWith(expect.any(String), [
      clienteMock.CPF,
      clienteMock.NOME,
      clienteMock.EMAIL,
      clienteMock.SENHA,
    ]);
  });
});