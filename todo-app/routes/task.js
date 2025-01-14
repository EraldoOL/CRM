const express = require('express');
const router = express.Router();
const taskModel = require('../models/task');

// Criar nova tarefa
router.post('/tasks', (req, res) => {
  const { title, description, status } = req.body;
  taskModel.createTask(title, description, status, (err, taskId) => {
    if (err) return res.status(500).json({ message: 'Erro ao criar tarefa.' });
    res.status(201).json({ message: 'Tarefa criada com sucesso!', taskId });
  });
});

// Obter todas as tarefas
router.get('/tasks', (req, res) => {
  taskModel.getAllTasks((err, tasks) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar tarefas.' });
    res.status(200).json({ tasks });
  });
});

// Atualizar tarefa
router.put('/tasks/:id', (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;
  taskModel.updateTask(taskId, title, description, status, (err) => {
    if (err) return res.status(500).json({ message: 'Erro ao atualizar tarefa.' });
    res.status(200).json({ message: 'Tarefa atualizada com sucesso!' });
  });
});

// Deletar tarefa
router.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  taskModel.deleteTask(taskId, (err) => {
    if (err) return res.status(500).json({ message: 'Erro ao excluir tarefa.' });
    res.status(200).json({ message: 'Tarefa excluída com sucesso!' });
  });
});

module.exports = router;