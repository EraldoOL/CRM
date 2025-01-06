const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configurar rotas públicas
app.use(express.static("public"));

// Rotas de autenticação
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});