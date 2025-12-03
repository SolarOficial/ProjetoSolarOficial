import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuração do Firebase
// Certifique-se de que essas variáveis globais (__app_id, etc) estão sendo fornecidas pelo seu ambiente ou substitua pelos valores reais aqui.
const appId = "solar-8b8eb"
const firebaseConfig = {
  apiKey: "AIzaSyCa0Tik1SCuLJTb8pi7WjEynlvvbxVjOW0",
  authDomain: "solar-8b8eb.firebaseapp.com",
  projectId: "solar-8b8eb",
  storageBucket: "solar-8b8eb.firebasestorage.app",
  messagingSenderId: "177823853208",
  appId: "solar-8b8eb"
};

let db, auth, userId, myChart;
let isAuthReady = false;

// Categorias Padrão
const INITIAL_CATEGORIES = [
    { nome: 'Moradia', cor: '#9675ce' }, 
    { nome: 'Alimentação', cor: '#ffb64d' }, 
    { nome: 'Transporte', cor: '#4a356d' }, 
    { nome: 'Saúde', cor: '#10B981' }, 
    { nome: 'Educação', cor: '#3B82F6' }, 
    { nome: 'Lazer', cor: '#F43F5E' }, 
    { nome: 'Outros', cor: '#6B7280' } 
];

const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

async function initApp() {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        if (initialAuthToken) await signInWithCustomToken(auth, initialAuthToken);
        else await signInAnonymously(auth);

        onAuthStateChanged(auth, (user) => {
            userId = user ? user.uid : 'anonimo';
            if(user) {
                const nomeSidebar = document.getElementById('nome-sidebar');
                if (nomeSidebar) nomeSidebar.textContent = `Usuário ${user.uid.substring(0,4)}...`;
            }
            isAuthReady = true;
            setupListeners();
        });
    } catch (error) {
        console.error("Erro Firebase:", error);
    }
}

function setupListeners() {
    const docRef = doc(db, `artifacts/${appId}/users/${userId}/planejamento`, 'dados');
    onSnapshot(docRef, (docSnap) => {
        const data = docSnap.data() || { renda: 0, gastos: [] };
        renderInterface(data);
    });
}

function renderInterface(data) {
    // Atualizar Resumo
    const totalGastos = data.gastos.reduce((acc, g) => acc + g.valor, 0);
    const saldo = data.renda - totalGastos;

    const inputRenda = document.getElementById('input-renda');
    if (inputRenda) inputRenda.value = data.renda || '';
    
    document.getElementById('display-renda').textContent = formatCurrency(data.renda);
    document.getElementById('display-gastos').textContent = formatCurrency(totalGastos);
    
    const saldoEl = document.getElementById('display-saldo');
    saldoEl.textContent = formatCurrency(saldo);
    saldoEl.className = saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo';

    // Atualizar Inputs de Gastos
    const containerInputs = document.getElementById('lista-inputs-gastos');
    if (containerInputs) {
        containerInputs.innerHTML = '';
        
        INITIAL_CATEGORIES.forEach(cat => {
            const gastoAtual = data.gastos.find(g => g.nome === cat.nome)?.valor || 0;
            
            const div = document.createElement('div');
            div.className = 'campo-input';
            div.innerHTML = `
                <label style="color: ${cat.cor}; display:flex; align-items:center; gap:5px;">
                    <span class="cor-indicador" style="background:${cat.cor}"></span> ${cat.nome} (R$)
                </label>
                <input type="number" class="input-valor-gasto" 
                       data-nome="${cat.nome}" 
                       data-cor="${cat.cor}" 
                       value="${gastoAtual > 0 ? gastoAtual : ''}" 
                       placeholder="0,00">
            `;
            containerInputs.appendChild(div);
        });
    }

    updateChart(data.gastos);
}

function updateChart(gastos) {
    const ctx = document.getElementById('graficoGastos');
    if (!ctx) return;

    const gastosFiltrados = gastos.filter(g => g.valor > 0);

    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: gastosFiltrados.map(g => g.nome),
            datasets: [{
                data: gastosFiltrados.map(g => g.valor),
                backgroundColor: gastosFiltrados.map(g => g.cor),
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Tornando a função global para ser acessada pelo botão HTML
window.salvarPlanejamento = async () => {
    if (!isAuthReady) return alert('Aguarde o sistema carregar...');

    const rendaEl = document.getElementById('input-renda');
    const renda = parseFloat(rendaEl ? rendaEl.value : 0) || 0;
    const gastos = [];

    document.querySelectorAll('.input-valor-gasto').forEach(input => {
        const valor = parseFloat(input.value) || 0;
        if (valor > 0) {
            gastos.push({
                nome: input.dataset.nome,
                cor: input.dataset.cor,
                valor: valor
            });
        }
    });

    try {
        await setDoc(doc(db, `artifacts/${appId}/users/${userId}/planejamento`, 'dados'), {
            renda,
            gastos
        });
        alert('Planejamento Salvo com Sucesso!');
    } catch (e) {
        console.error("Erro ao salvar:", e);
        alert('Erro ao salvar os dados.');
    }
};

window.redirectUser = (path) => {
    window.location.href = path;
}

// Iniciar
initApp();