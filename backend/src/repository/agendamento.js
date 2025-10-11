import {con} from "../connection.js";


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
        return { message: "Erro de conexão com o banco !", success: false };
    }
}


export async function exibirAgendamentoCliente(cpf) {
  try {
    const query = `SELECT * FROM VM_CLIENTES_AGEDAMENTOS WHERE CPF = ?`;
    
    let [resp] = await con.query(query, [cpf]); 
    
    return { message: "Agendamento listado com sucesso!", success: true, data: resp };

  } catch (error) {
    return { message: "Erro de conexão com o banco !", success: false };
  }
}