const db = require('../config/db');

// Função para criar tabela de usuários
const createUserTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `;
  db.run(sql);
};

// Função para adicionar um novo usuário
const createUser = (username, passwordHash) => {
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(sql, [username, passwordHash], function(err) {
    if (err) {
      console.error('Erro ao criar usuário: ', err);
    }
  });
};

// Função para buscar um usuário pelo nome
const findUserByUsername = (username, callback) => {
  const sql = `SELECT * FROM users WHERE username = ?`;
  db.get(sql, [username], (err, row) => {
    callback(err, row);
  });
};

module.exports = {
  createUserTable,
  createUser,
  findUserByUsername
};