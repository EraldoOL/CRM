const express = require('express');
const router = express.Router();
const financeModel = require('../models/finance');

// Adicionar nova transação financeira
router.post('/finances', (req, res) => {
  const { amount, type, description } = req.body;
  financeModel.addTransaction(amount, type, description, (err, transactionId) => {
    if (err) return res.status(500).json({ message: 'Erro ao adicionar transação.' });
    res.status(201).json({ message: 'Transação adicionada com sucesso!', transactionId });
  });
});

// Obter todas as transações financeiras
router.get('/finances', (req, res) => {
  financeModel.getAllTransactions((err, transactions) => {
    if (err) return res.status(500).json({ message: 'Erro ao buscar transações.' });
    res.status(200).json({ transactions });
  });
});

// Filtrar transações por tipo (ex: "recebido", "enviado")
router.get('/finances/:type', (req, res) => {
  const type = req.params.type;
  financeModel.getTransactionsByType(type, (err, transactions) => {
    if (err) return res.status(500).json({ message: 'Erro ao filtrar transações.' });
    res.status(200).json({ transactions });
  });
});

module.exports = router;