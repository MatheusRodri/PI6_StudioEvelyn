import { Router } from "express";
import {criarCliente,login } from "../repository/login.js";

const servidor = Router();

//Rota para criar um novo cliente
servidor.post('/cliente', async (req, res) => {
    try {

        const cliente = req.body;
        const novoCliente = await criarCliente(cliente);
        res.status(200).json(novoCliente);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para realizar login
servidor.post('/login', async (req, res) => {
    try {
   
        const log = req.body; 
        const cliente = await login(log);
        res.status(200).json(cliente);
        
    } catch (error) {
        res.status(500).json( { error: error.message });
    }
});


export default servidor;