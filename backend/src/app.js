console.log('>>>> 1. EXECUTANDO O ARQUIVO DE TESTE');
// Importação das funcionalidades do express, cors e do controller
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import agendamentoController from './controller/agendamentosController.js';
import loginController from './controller/loginController.js';

// Criação do servidor
const servidor = express();

// Middlewares
servidor.use(cors());
servidor.use(express.json());

// Rotas
servidor.use(agendamentoController);
servidor.use(loginController);

// Middleware de tratamento de erros
servidor.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
});

// A linha mais importante: exporta a aplicação CONFIGURADA, mas não INICIADA.
export default servidor;