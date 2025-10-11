// Importa o Jest para criar mocks
import { jest } from '@jest/globals';
import { login } from '../../../src/repository/login.js';
import { con } from '../../../src/connection.js';


// Mock do módulo de conexão com o banco de dados
jest.mock('../../../src/connection.js', () => ({
  con: {
    query: jest.fn()
  }
}));

// Describe o conjunto de testes para a função login
describe('Teste Unitário: login', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

    // Teste para verificar se a função realiza o login com sucesso
    it('deve realizar o login com sucesso e retornar os dados do usuário', async () => {


    const dados = {EMAIL: 'teste@exemplo.com', SENHA: 'senha123'};

    const usuarioDoBanco = {
        ID: 1,
        CPF: '12345678900',
        NOME: 'Matheus Teste',
        EMAIL: 'teste@exemplo.com',
        SENHA: 'senha123'
    };

    con.query.mockResolvedValue([ [usuarioDoBanco] ]);
    const resultado = await login(dados);

    expect(resultado).toEqual({ message: "Login realizado com sucesso!", success: true, data: usuarioDoBanco  });

    expect(con.query).toHaveBeenCalledTimes(1);

    expect(con.query).toHaveBeenCalledWith(
      expect.any(String),
      [dados.EMAIL, dados.SENHA]
    );
  });

  it('deve retornar erro quando email ou senha são inválidos', async () => {
    const dados = {EMAIL: 'email_invalido', SENHA: 'senha_invalida'};
    con.query.mockResolvedValue([ [] ]); // Simula nenhum usuário encontrado

    const resultado = await login(dados);
    expect(resultado).toEqual({ message: "Email ou senha inválidos.", success: false });

    expect(con.query).toHaveBeenCalledTimes(1);
    expect(con.query).toHaveBeenCalledWith(
      expect.any(String),
      [dados.EMAIL, dados.SENHA]
    );
  });

  it('erro no banco de dados', async () => {
    const dados = {EMAIL: 'teste@exemplo.com', SENHA: 'senha123'};

    con.query.mockRejectedValue(new Error('Erro no banco de dados'));

    const resultado = await login(dados);

    expect(resultado).toEqual({ message: "Erro ao realizar login!", success: false });

    expect(con.query).toHaveBeenCalledTimes(1);

    expect(con.query).toHaveBeenCalledWith(
      expect.any(String),
      [dados.EMAIL, dados.SENHA]
    );
  });
});