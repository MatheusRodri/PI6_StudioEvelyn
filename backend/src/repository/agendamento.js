import {con} from "../connection.js";


// Função para criar um novo agendamento
export async function criarAgendamento(agendamento) {
    try {
        
        const comando = `INSERT INTO 
		AGENDAMENTOS (DATA, HORA, VALOR, PROCEDIMENTO, TP_PAGAMENTO, ID_CLIENT)
		VALUES (?, ?, ?, ?,?,?);`
            ;
        const valores = [agendamento.DATA, agendamento.HORA, agendamento.VALOR, agendamento.PROCEDIMENTO, agendamento.TP_PAGAMENTO, agendamento.ID_CLIENT];

        // Verifica se alguma campo está vazio
        for (let valor of valores) {
            if (valor === '' || valor === null || valor === undefined) {
                return { message: "Todos os campos devem ser preenchidos.", success: false };
            }
        }

        // Verifica se já existe um agendamento no mesmo dia e horário
        const verificaComando = `SELECT * FROM AGENDAMENTOS WHERE DATA = ? AND HORA = ?;`;
        const verificaValores = [agendamento.DATA, agendamento.HORA];
        const [verificaResp] = await con.query(verificaComando, verificaValores);

        if (verificaResp.length > 0) {
            return { message: "Já existe um agendamento para este dia e horário.", success: false };
        }

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