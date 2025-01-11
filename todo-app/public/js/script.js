/*const barChart = document.getElementById('bar-chart').getContext('2d');
const pieChart = document.getElementById('pie-chart').getContext('2d');

let tasksCompleted = 0;
let tasksPending = 0;

const barChartInstance = new Chart(barChart, {
  type: 'bar',
  data: {
    labels: ['Completas', 'Pendentes'],
    datasets: [
      {
        label: 'Tarefas',
        data: [tasksCompleted, tasksPending],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  },
});

const pieChartInstance = new Chart(pieChart, {
  type: 'pie',
  data: {
    labels: ['Completas', 'Pendentes'],
    datasets: [
      {
        label: 'Tarefas',
        data: [tasksCompleted, tasksPending],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  },
});

// Toggle between charts
document.getElementById('toggle-bar').addEventListener('click', () => {
  document.getElementById('bar-chart').style.display = 'block';
  document.getElementById('pie-chart').style.display = 'none';
});

document.getElementById('toggle-pie').addEventListener('click', () => {
  document.getElementById('bar-chart').style.display = 'none';
  document.getElementById('pie-chart').style.display = 'block';
});

// Add task functionality
document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const deadline = document.getElementById('task-deadline').value;
  const now = new Date();
  const taskDeadline = new Date(deadline);

  if (taskDeadline >= now) {
    tasksPending++;
  } else {
    tasksCompleted++;
  }

  updateCharts();
});

function updateCharts() {
  barChartInstance.data.datasets[0].data = [tasksCompleted, tasksPending];
  pieChartInstance.data.datasets[0].data = [tasksCompleted, tasksPending];

  barChartInstance.update();
  pieChartInstance.update();
}*/

// Seleciona elementos do DOM
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Adiciona evento ao clicar no botão hambúrguer
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active'); // Abre ou fecha o menu
  hamburger.classList.toggle('active'); // Anima o botão
});


// Página de Finanças - Salvar Transações no localStorage
function saveTransactionsToLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = parseFloat(document.getElementById('transaction-value').value);
  const date = document.getElementById('transaction-date').value;
  const description = document.getElementById('transaction-description').value;

  if (!date || isNaN(value)) return alert('Preencha todos os campos corretamente.');

  transactions.push({ value, date, description });
  saveTransactionsToLocalStorage(); // Salva no localStorage
  updateFinances();
  transactionForm.reset();
});