let transactions = [];
const transactionForm = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions');
const totalBalanceElement = document.getElementById('total-balance');
const financialStatus = document.getElementById('financial-status');
const progressBar = document.getElementById('progress-bar');

// Add Transaction
transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const value = parseFloat(document.getElementById('transaction-value').value);
  const date = document.getElementById('transaction-date').value;

  if (!date || isNaN(value)) return alert('Preencha todos os campos corretamente.');

  transactions.push({ value, date });
  updateFinances();
  transactionForm.reset();
});

// Update Financial Data
function updateFinances() {
  // Update Transactions List
  transactionsList.innerHTML = transactions
    .map(
      (transaction) => `
      <li>
        <span>${transaction.date}</span>
        <span class="${transaction.value >= 0 ? 'positive' : 'negative'}">
          R$ ${transaction.value.toFixed(2)}
        </span>
      </li>`
    )
    .join('');

  // Update Total Balance
  const totalBalance = transactions.reduce((sum, transaction) => sum + transaction.value, 0);
  totalBalanceElement.textContent = `R$ ${totalBalance.toFixed(2)}`;

  // Update Financial Status and Progress Bar
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
}

// Initial Update
updateFinances();