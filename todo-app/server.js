const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('./data.db'); // Banco de dados SQLite
const port = 3000;

app.use(express.json());
app.use(cors()); // Para permitir requisições de outras origens

// Rota de cadastro
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Erro ao criptografar a senha' });

    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function(err) {
      if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário' });
      res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
    });
  });
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Usuário não encontrado' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ message: 'Credenciais inválidas' });

      const token = jwt.sign({ userId: user.id }, 'secrect_key', { expiresIn: '1h' });
      res.status(200).json({ message: 'Login bem-sucedido', token });
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});