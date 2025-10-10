import {con} from "../connection.js";

// Função para exibir todos os agendamentos
export async function exibirAgendamentos() {
    try {
        let comando = `SELECT * FROM VM_CLIENTES_AGEDAMENTOS`;
        let resp = await con.query(comando, []);
        let linhas = resp.length;
        
        if (linhas === 0) {
            return { message: "Nenhum agendamento encontrado.", success: false, dados: [] };
        }
        // Adiciona a mensage, success e o retorno dos dados
        return { message: "Agendamentos listados com sucesso!", success: true, dados: resp[0] };

    } catch (error) {
        return { message: "Houve um erro ao listar os agendamentos.", success: false }
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
        const resp = await con.query(comando, valores);


        if(resp[0].affectedRows == 1){
        return { message: "Agendamento realizado com sucesso!", success: true, data: agendamento} 

        } else {
            return { message: "Houve um erro ao criar o agendamento.", success: false };
        }
        
    } catch (error) {
        return { message: "Houve um erro ao criar o agendamento.", success: false };
    }
}


export async function exibirAgendamentoCliente(cpf) {
  try {
    const query = `SELECT * FROM VM_CLIENTES_AGEDAMENTOS WHERE CPF = ?`;
    
    let [resp] = await con.query(query, [cpf]); 
    
    return { message: "Agendamento listado com sucesso!", success: true, data: resp };

  } catch (error) {
    return { message: "Houve um erro ao listar o agendamento.", success: false };
  }
}