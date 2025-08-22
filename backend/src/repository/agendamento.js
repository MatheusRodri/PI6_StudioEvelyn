import con from "../connection.js";

// Função para exibir todos os agendamentos
export async function exibirAgendamentos() {
    try {
        let comando = `SELECT * FROM VM_CLIENTES_AGENDAMENTOS`;
        let resp = await con.query(comando, []);
        let linhas = resp.length;
        if (linhas === 0) {
            throw new Error("Erro ao realizar operação!");
        }
        return resp[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

// Função para criar um novo agendamento
export async function criarAgendamento(agendamento) {
    try {

        const comando = `INSERT INTO 
		AGENDAMENTOS (DATA, HORA, VALOR, PROCEDIMENTO, TP_PAGAMENTO, ID_CLIENT)
		VALUES (?, ?, ?, ?,?,?);`
            ;
        const valores = [agendamento.DATA, agendamento.HORA, agendamento.VALOR, agendamento.PROCEDIMENTO, agendamento.TP_PAGAMENTO, agendamento.ID_CLIENT];
        console.log(valores);
        const resp = await con.query(comando, valores);


        return { id: resp.insertId, ...agendamento };
    } catch (error) {
        throw new Error(error.message);
    }
}

// Função para exibir um agendamento de um cliente por CPF
export async function exibirAgendamentoCliente(cpf) {
    try {
        const query = `SELECT * FROM VM_CLIENTES_AGEDAMENTOS1 WHERE CPF = ?`;
        console.log("cpf", cpf);
        let resp = await con.query(query, cpf);
        console.log(resp[0])
        return resp[0];

    }
    catch (error) {
        throw new Error(error.message);
    }
}
