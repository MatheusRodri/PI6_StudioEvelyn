// src/connection.js
import mysql from 'mysql2/promise';

let con; // Deixamos a variável de conexão aqui

// Criamos uma função assíncrona para estabelecer a conexão
export async function connectDb() {
  try {
    con = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DB
    });
    console.log('Conexão com BD realizada');
  } catch (error) {
    console.error('Erro ao conectar com o BD:', error);
    process.exit(1); // Encerra a aplicação se não conseguir conectar
  }
}

// Exportamos a variável 'con' para ser usada nos repositórios
export { con };