const db = require('../config/db');

// Função para criar uma tarefa
function createTask(title, description, status, callback) {
  const query = 'INSERT INTO tasks (title, description, status, created_at) VALUES (?, ?, ?, ?)';
  const createdAt = new Date().toISOString();
  db.run(query, [title, description, status, createdAt], function(err) {
    callback(err, this.lastID);
  });
}

// Função para obter todas as tarefas
function getAllTasks(callback) {
  const query = 'SELECT * FROM tasks';
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
}

// Função para atualizar uma tarefa
function updateTask(id, title, description, status, callback) {
  const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';
  db.run(query, [title, description, status, id], function(err) {
    callback(err);
  });
}

// Função para deletar uma tarefa
function deleteTask(id, callback) {
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.run(query, [id], function(err) {
    callback(err);
  });
}

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask
};