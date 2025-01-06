const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Simulação de banco de dados
const users = [];

// Chave secreta para JWT
const JWT_SECRET = "chave-muito-secreta";

// Rota de cadastro
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }

  // Verificar se o usuário já existe
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(409).json({ error: "Usuário já existe" });
  }

  // Hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Salvar usuário
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "Usuário registrado com sucesso!" });
});

// Rota de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios" });
  }

  // Verificar se o usuário existe
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  // Verificar a senha
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  // Gerar token JWT
  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login bem-sucedido", token });
});

module.exports = router;