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

// src/repository/login.js
export async function login(login) {
  try {
    const comando = `SELECT * FROM CLIENTES WHERE EMAIL = ? AND SENHA = ?`;
    const valores = [login.EMAIL, login.SENHA];
    
    // resp recebe [rows, fields]
    const [rows] = await con.query(comando, valores);

    // Verificamos se o array 'rows' encontrou algum usuário
    if (rows.length > 0) {
      // A CORREÇÃO: Pegamos o primeiro usuário encontrado (rows[0])
      const usuario = rows[0];
      return { message: "Login realizado com sucesso!", success: true, data: usuario };
    } else {
      // Se não encontrou ninguém, retorna um erro de login
      return { message: "Email ou senha inválidos.", success: false };
    }

  } catch (error) {
    return { message: "Erro ao realizar login!", success: false };
  }
}