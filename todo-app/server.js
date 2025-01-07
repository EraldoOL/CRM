const express = require('express');
const path = require('path');
const app = express();

// Servir a pasta 'public' como estática
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});