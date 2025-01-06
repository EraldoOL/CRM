const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Criando ou abrindo o banco de dados SQLite
const db = new sqlite3.Database('todo-app.db');

// Inicializando a tabela de usuários
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Inicializando a tabela de tarefas
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

// Rota de cadastro de usuário
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erro ao criptografar a senha' });

    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.run(query, [email, hashedPassword], function (err) {
      if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário' });

      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    });
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Usuário não encontrado' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch) return res.status(400).json({ message: 'Senha incorreta' });

      const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido!', token });
    });
  });
});

// Rota para adicionar uma tarefa
app.post('/tasks', (req, res) => {
  const { title, description, status, token } = req.body;

  // Verificar token JWT
  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });

    const query = `INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)`;
    db.run(query, [decoded.id, title, description, status], function () {
      res.status(201).json({ message: 'Tarefa criada com sucesso!' });
    });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});