    import {con} from "../connection.js";

// Função para criar um novo cliente
export async function criarCliente(cliente) {
    try {        
        const comando = `INSERT INTO 
                                    CLIENTES(CPF,NOME,EMAIL,SENHA)
		                            VALUES	(?,?,?,?)`
            ;
        const valores = [cliente.CPF, cliente.NOME, cliente.EMAIL, cliente.SENHA];
        const resp = await con.query(comando, valores);

        const data = { id: resp.insertId, ...cliente };
        if (resp[0].affectedRows > 0) {
            return { message: "Cadastro realizado com sucesso !", success: true, data: data };
        }
        return { message: "Erro ao cadastrar cliente!", success: false };

    } catch (error) {
        return { message: "Erro ao cadastrar cliente!", success: false };
    }
}

export async function login(login) {


    try {
        const comando = `SELECT 
                            *
                        FROM CLIENTES
                        WHERE EMAIL = ? AND SENHA = ?`
            ;
        const valores = [login.EMAIL, login.SENHA];
     
        const resp = await con.query(comando, valores);
     

        return { message: "Login realizado com sucesso!", success: true, data: resp[0] };

    } catch (error) {
        return { message: "Erro ao realizar login!", success: false };
    }
}