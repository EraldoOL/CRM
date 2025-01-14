const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Rota de registro de usuário
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Erro ao criptografar a senha' });
    
    User.createUser(username, hashedPassword);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  });
});

// Rota de login de usuário
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findUserByUsername(username, (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Usuário não encontrado' });
    
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(400).json({ error: 'Senha incorreta' });
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login bem-sucedido', token });
    });
  });
});

module.exports = router;