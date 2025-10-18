import { Router } from "express";
import {criarAgendamento,exibirAgendamentoCliente} from "../repository/agendamento.js";

const servidor = Router();

// Rota para criar um novo agendamento
servidor.post('/agendamentos', async (req, res) => {
    try {

        const agendamento = req.body; // Assumindo que o corpo da requisição contém o objeto agendamento
        const novoAgendamento = await criarAgendamento(agendamento);
        res.status(201).json(novoAgendamento);

    } catch (error) {

        res.status(500).json({ message: "Houve um erro ao criar o agendamento.", success: false } );

    }

});

// Rota para exibir os agendamentos de um cliente
servidor.get('/agendamentos/cliente/:CPF', async (req, res) => {
    try {

        const cpf = req.params.CPF; 
        const agendamentos = await exibirAgendamentoCliente(cpf);
        res.status(200).json(agendamentos);


    } catch (error) {

        res.status(500).json({ message: "Erro no banco de dados", success: false } );
        
    }
});




export default servidor;
