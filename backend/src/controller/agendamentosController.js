import { Router } from "express";
import { exibirAgendamentos, criarAgendamento,exibirAgendamentoCliente} from "../repository/agendamento.js";

const servidor = Router();

// Rota para exibir todos os agendamentos
servidor.get('/agendamentos', async (req, res) => {
    try {
        const agendamentos = await exibirAgendamentos();
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo agendamento
servidor.post('/agendamentos', async (req, res) => {
    try {
        const agendamento = req.body; // Assumindo que o corpo da requisição contém o objeto agendamento
        console.log(agendamento);
        const novoAgendamento = await criarAgendamento(agendamento);
        res.status(201).json(novoAgendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para exibir os agendamentos de um cliente
servidor.get('/agendamentos/cliente/:CPF', async (req, res) => {
    console.log('entrou na rota de exibir agendamentos do cliente')
    try {
        const cpf = req.params.CPF; // <-- Aqui o certo é params
        console.log(cpf);
        const agendamentos = await exibirAgendamentoCliente(cpf);
        res.status(200).json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




export default servidor;
