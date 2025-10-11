// Teste de integração para o endpoint de cadastro
import request from 'supertest';
import { jest } from '@jest/globals';
import servidor from '../../../src/app.js';
import { criarCliente } from '../../../src/repository/login.js';

// Mock do repositório de login
jest.mock('../../../src/repository/login.js');

describe('POST /cadastro', () => {
    // Limpa os mocks antes de cada teste
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // Teste para verificar se o cadastro é realizado com sucesso
    it('Deve cadastrar um cliente com sucesso e retornar status 200', async () => {
        // Dados de entrada para o cadastro
        const novoCliente = {
            CPF: '12345678900',
            NOME: 'Matheus Teste',
            EMAIL: 'teste@exemplo.com',
            SENHA: 'senha123'
        };

        // Dados que o repositório deve retornar
        const clienteCadastrado = {
            CPF: '12345678900',
            NOME: 'Matheus Teste',
            EMAIL: 'teste@exemplo.com',
            SENHA: 'senha123'
        };
        // Configura o mock para retornar sucesso
        criarCliente.mockResolvedValue({ message: "Cadastro realizado com sucesso !", success: true, data: clienteCadastrado });
        // Realiza a requisição POST para o endpoint /cliente
        const response = await request(servidor)
            .post('/cliente')
            .send(novoCliente);
        // Verifica se o status da resposta é 200 (OK)
        expect(response.status).toBe(200);
        // Verifica se o corpo da resposta está correto
        expect(response.body).toEqual({ message: "Cadastro realizado com sucesso !", success: true, data: clienteCadastrado });
        // Verifica se o repositório foi chamado corretamente
        expect(criarCliente).toHaveBeenCalledTimes(1);
        expect(criarCliente).toHaveBeenCalledWith(novoCliente);
    });
    // Teste para verificar o tratamento de erro no cadastro
    it('Deve retornar status 500 em caso de erro no servidor', async () => {
        // Dados de entrada para o cadastro
        const novoCliente = {
            CPF: '12345678900',
            NOME: 'Matheus Teste',
            EMAIL: 'teste@exemplo.com',
            SENHA: 'senha123'
        };
        // Configura o mock para simular um erro
        criarCliente.mockRejectedValue(new Error('Erro ao cadastrar cliente!'));
        // Realiza a requisição POST para o endpoint /cliente
        const response = await request(servidor)
            .post('/cliente')
            .send(novoCliente);
        // Verifica se o status da resposta é 500 (Erro Interno do Servidor)
        expect(response.status).toBe(500);
        // Verifica se o corpo da resposta contém a mensagem de erro
        expect(response.body).toEqual({ message: "Erro ao cadastrar cliente!", success: false });
        // Verifica se o repositório foi chamado corretamente
        expect(criarCliente).toHaveBeenCalledTimes(1);
        expect(criarCliente).toHaveBeenCalledWith(novoCliente);
    });
});