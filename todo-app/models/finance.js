const db = require('../config/db');

// Função para adicionar uma transação financeira
function addTransaction(amount, type, description, callback) {
  const query = 'INSERT INTO finances (amount, type, description, date) VALUES (?, ?, ?, ?)';
  const date = new Date().toISOString();
  db.run(query, [amount, type, description, date], function(err) {
    callback(err, this.lastID);
  });
}

// Função para obter todas as transações
function getAllTransactions(callback) {
  const query = 'SELECT * FROM finances';
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
}

// Função para obter transações por tipo (exemplo: "recebido", "enviado")
function getTransactionsByType(type, callback) {
  const query = 'SELECT * FROM finances WHERE type = ?';
  db.all(query, [type], (err, rows) => {
    callback(err, rows);
  });
}

module.exports = {
  addTransaction,
  getAllTransactions,
  getTransactionsByType
};