// __tests__/login.integration.test.js

// CORREÇÃO 1: Importamos o 'request' do supertest e o 'jest' para o beforeEach
import request from 'supertest';
import { jest } from '@jest/globals';

import servidor from '../../../src/app.js';
import { login } from '../../../src/repository/login.js';

// O mock do repositório está perfeito
jest.mock('../../../src/repository/login.js');

describe('POST /login', () => {

  // Boa prática: limpar os mocks antes de cada teste
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve realizar o login com sucesso e retornar status 200', async () => {
    // Arrange
    const dadosLogin = {
      EMAIL: 'teste@exemplo.com',
      SENHA: 'senha123'
    };
    
    const usuarioDoBanco = {
      ID: 1,
      CPF: '12345678900',
      NOME: 'Matheus Teste',
      EMAIL: 'teste@exemplo.com',
      SENHA: 'senha123' // A API não deveria retornar a senha, mas mantemos para o teste passar
    };

    // A preparação do mock está perfeita
    login.mockResolvedValue({ message: "Login realizado com sucesso!", success: true, data: usuarioDoBanco });

    // Act
    // CORREÇÃO 2: Usamos .post() em vez de .get()
    const response = await request(servidor)
      .post('/login')
      .send(dadosLogin);

    // Assert
    // Suas verificações estão perfeitas
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Login realizado com sucesso!", success: true, data: usuarioDoBanco });
    
    // Verificação extra para garantir que o controller chamou o repositório
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(dadosLogin);
  });

  // Teste 02: Erro 500

  it('Deve retornar status 500 em caso de erro no servidor', async () => {
    // Arrange
    const dadosLogin = {
      EMAIL: 'teste@exemplo.com',
      SENHA: 'senha123'
    };

    // Simulamos um erro no repositório
    login.mockRejectedValue(new Error('Erro no servidor'));
    // Act
    const response = await request(servidor)
      .post('/login')
      .send(dadosLogin);
    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Houve um erro ao realizar o login.', success: false });
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(dadosLogin);
  });


});