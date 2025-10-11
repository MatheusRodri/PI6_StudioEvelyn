export default {
  // ... suas outras configurações (testEnvironment, transform, etc.)

  // A PARTE IMPORTANTE:
  // Diz ao Jest para calcular a cobertura APENAS destes arquivos:
  collectCoverageFrom: [
    'src/**/*.js',      // Padrão: Inclui todos os arquivos .js dentro da pasta src e suas subpastas
    '!src/app.js',        // Exclui o arquivo app.js
    '!src/server.js',     // Exclui o arquivo server.js
    '!src/connection.js', // Exclui o arquivo connection.js
  ],
};