import { beforeEach, describe, it, jest } from '@jest/globals';
import request from 'supertest';
import servidor from '../../../src/app.js'; 
import { exibirAgendamentoCliente } from '../../../src/repository/agendamento.js';

jest.mock('../../../src/repository/agendamento.js');


describe('Get /agendamentos/cliente/:id', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar uma lista de agendamentos para um cliente específico', async () => {
    // Arrange
    const cpf = '123';

    const agendamentosMock = [
      {
        ID: 1,
        DATA: '2025-11-20',
        HORA: '14:30',
        PROCEDIMENTO: 'Design de Sobrancelha',
        VALOR: 50.00,
        TP_PAGAMENTO: 'Online',
        ID_CLIENT: 1,
        cpf: '123'
      },
      {
        ID: 2,
        DATA: '2025-11-21',
        HORA: '10:00',
        PROCEDIMENTO: 'Corte de Cabelo',
        VALOR: 30.00,
        TP_PAGAMENTO: 'Dinheiro',
        ID_CLIENT: 1,
        cpf: '123'
      }
    ];

    exibirAgendamentoCliente.mockResolvedValue(agendamentosMock);

    // Act
    const response = await request(servidor).get(`/agendamentos/cliente/${cpf}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(agendamentosMock);
  });

  it('Deve retornar 500 em caso de erro no servidor', async () => {
    // Arrange
    const cpf = '123';
    exibirAgendamentoCliente.mockRejectedValue(new Error('Erro no banco de dados'));
    // Act
    const response = await request(servidor).get(`/agendamentos/cliente/${cpf}`);
    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro no banco de dados' });
  });
});