let transactions = [];
const transactionForm = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions');
const totalBalanceElement = document.getElementById('total-balance');
const financialStatus = document.getElementById('financial-status');
const progressBar = document.getElementById('progress-bar');
const completedTransactionsList = document.getElementById('completed-transactions');
const pendingReceivablesList = document.getElementById('receivables');

// Adicionar Transação
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('transaction-name').value;
  const description = document.getElementById('transaction-desc').value;
  const value = parseFloat(document.getElementById('transaction-value').value);
  const date = document.getElementById('transaction-date').value;

  if (!name || !description || !date || isNaN(value)) {
    return alert('Preencha todos os campos corretamente.');
  }

  transactions.push({ name, description, value, date, status: 'pending' });
  updateFinances();
  transactionForm.reset();
});

// Atualizar Dados Financeiros
function updateFinances() {
  // Atualizar Lista de Transações
  transactionsList.innerHTML = transactions
    .filter((t) => t.status === 'pending')
    .map(
      (transaction, index) => `
      <li>
        <span>${transaction.date} - ${transaction.name}</span>
        <p>${transaction.description}</p>
        <span class="${transaction.value >= 0 ? 'positive' : 'negative'}">
          R$ ${transaction.value.toFixed(2)}
        </span>
        <button onclick="completeTransaction(${index})">Concluir</button>
        <button onclick="deleteTransaction(${index})">Excluir</button>
      </li>`
    )
    .join('');

  // Atualizar Lista de Transações Concluídas
  completedTransactionsList.innerHTML = transactions
    .filter((t) => t.status === 'completed')
    .map(
      (transaction) => `
      <li>
        <span>${transaction.date} - ${transaction.name}</span>
        <p>${transaction.description}</p>
        <span class="${transaction.value >= 0 ? 'positive' : 'negative'}">
          R$ ${transaction.value.toFixed(2)}
        </span>
      </li>`
    )
    .join('');

  // Atualizar Saldo Total
  const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.value, 0);
  totalBalanceElement.textContent = `R$ ${totalBalance.toFixed(2)}`;

  // Atualizar Barra de Progresso e Status
  const totalPositive = transactions.filter((t) => t.value > 0).reduce((sum, t) => sum + t.value, 0);
  const totalNegative = transactions.filter((t) => t.value < 0).reduce((sum, t) => sum + Math.abs(t.value), 0);
  const progress = totalPositive > 0 ? (totalPositive / (totalPositive + totalNegative)) * 100 : 0;

  progressBar.style.width = `${progress}%`;
  progressBar.style.backgroundColor =
    progress >= 70 ? '#28a745' : progress >= 40 ? '#ffc107' : '#dc3545';

  financialStatus.textContent =
    progress >= 70
      ? 'Metas Financeiras Alcançadas!'
      : progress >= 40
      ? 'Metas Parciais Concluídas'
      : 'Metas Não Alcançadas';

  // Atualizar Recebíveis
  const receivables = transactions.filter((t) => t.status === 'pending' && t.value > 0);
  pendingReceivablesList.innerHTML = receivables
    .map(
      (transaction) => `
      <li>
        <span>${transaction.date} - ${transaction.name}</span>
        <p>${transaction.description}</p>
        <span>R$ ${transaction.value.toFixed(2)}</span>
      </li>`
    )
    .join('');
}

// Concluir Transação
function completeTransaction(index) {
  transactions[index].status = 'completed';
  updateFinances();
}

// Excluir Transação
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateFinances();
}

// Atualização Inicial
updateFinances();

const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Adiciona evento ao clicar no botão hambúrguer
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active'); // Abre ou fecha o menu
  hamburger.classList.toggle('active'); // Anima o botão
});


// Inicializa as transações
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Função para salvar no localStorage
function saveTransactionsToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Adicionar nova transação
document.getElementById('transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const value = parseFloat(document.getElementById('transaction-value').value);
  const description = document.getElementById('transaction-description').value;
  const date = document.getElementById('transaction-date').value;

  if (!value || !description || !date) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  // Adiciona nova transação
  transactions.push({ value, description, date });
  saveTransactionsToLocalStorage(); // Salva no localStorage

  // Atualiza a interface ou reseta o formulário
  document.getElementById('transaction-form').reset();
  alert('Transação adicionada com sucesso!');
});