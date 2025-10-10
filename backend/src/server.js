// src/server.js
import servidor from './app.js';
import { connectDb } from './connection.js'; // Importa a nova função

const port = process.env.PORT || 5000;

// Função auto-executável para usar async/await
(async () => {
  await connectDb(); // 1. Conecta ao banco de dados
  servidor.listen(port, () => console.log(`API rodando na porta ${port}`)); // 2. Sobe o servidor
})();