import request from 'supertest';
import servidor from '../../../src/app.js';
import { criarAgendamento } from '../../../src/repository/agendamento.js';

// jest.mock() é a forma correta com Babel. Ele é "içado" (hoisted)
// e executado antes de qualquer import.
jest.mock('../../../src/repository/agendamento.js');

describe('POST /agendamentos', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve criar um agendamento com sucesso e retornar status 201', async () => {
    // Arrange
    const novoAgendamento = {
      DATA: '2025-11-20',
      HORA: '14:30',
      PROCEDIMENTO: 'Design de Sobrancelha',
      VALOR: 50.00,
      TP_PAGAMENTO: 'Online',
      ID_CLIENT: 1
    };
    
    const agendamentoCriado = { id: 99, ...novoAgendamento };
    
    // Agora podemos configurar o mock de forma simples
    criarAgendamento.mockResolvedValue(agendamentoCriado);

    // Act
    const response = await request(servidor)
      .post('/agendamentos')
      .send(novoAgendamento);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual(agendamentoCriado);
    expect(criarAgendamento).toHaveBeenCalledTimes(1);
    expect(criarAgendamento).toHaveBeenCalledWith(novoAgendamento);
  });

  it('Deve retornar status 500 se ocorrer um erro ao criar o agendamento', async () => {
    // Arrange
    const novoAgendamento = {
      DATA: '2025-11-20',
      HORA: '14:30',
      PROCEDIMENTO: 'Design de Sobrancelha',
      VALOR: 50.00,
      TP_PAGAMENTO: 'Online',
      ID_CLIENT: 1
    };

    const agendamento = novoAgendamento;
    criarAgendamento.mockRejectedValue(agendamento);

    const response = await request(servidor)
      .post('/agendamentos')
      .send(novoAgendamento);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Houve um erro ao criar o agendamento.", success: false });
    expect(criarAgendamento).toHaveBeenCalledTimes(1);
    expect(criarAgendamento).toHaveBeenCalledWith(novoAgendamento);
  });

});