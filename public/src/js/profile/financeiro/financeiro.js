import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// SUAS CHAVES DO FIREBASE
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

// Carrega foto e nome do LocalStorage para parecer instantâneo
function carregarPerfilLocal() {
    const avatarSalvo = localStorage.getItem('solar_avatar');
    if (avatarSalvo) {
        const imgElement = document.getElementById('avatar-img');
        if (imgElement) imgElement.src = avatarSalvo;
    }

    const nomeSalvo = localStorage.getItem('solar_nome');
    if (nomeSalvo) {
        const nomeElement = document.getElementById('nome-sidebar');
        if (nomeElement) nomeElement.textContent = nomeSalvo;
    }
}

async function initApp() {
    carregarPerfilLocal();

    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);

        await signInAnonymously(auth);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                userId = user.uid;
                
                // Se não tem nome salvo localmente, define padrão
                if (!localStorage.getItem('solar_nome')) {
                    const nomeSidebar = document.getElementById('nome-sidebar');
                    if (nomeSidebar) nomeSidebar.textContent = "Usuário";
                }
                
                isAuthReady = true;
                setupListeners();
            }
        });
    } catch (error) {
        console.error("Erro de conexão.");
    }
}

function setupListeners() {
    const docRef = doc(db, 'planejamentos', userId);
    
    onSnapshot(docRef, (docSnap) => {
        const data = docSnap.exists() ? docSnap.data() : { renda: 0, gastos: [] };
        renderInterface(data);
    });
}

function renderInterface(data) {
    const gastos = data.gastos || [];
    const renda = data.renda || 0;

    // Cálculos
    const totalGastos = gastos.reduce((acc, g) => acc + g.valor, 0);
    const saldo = renda - totalGastos;

    // Atualiza Inputs (apenas se não estiver em foco para não atrapalhar digitação)
    const inputRenda = document.getElementById('input-renda');
    if (inputRenda && document.activeElement !== inputRenda) {
        inputRenda.value = renda > 0 ? renda : '';
    }
    
    // Atualiza Resumo
    document.getElementById('display-renda').textContent = formatCurrency(renda);
    document.getElementById('display-gastos').textContent = formatCurrency(totalGastos);
    
    const saldoEl = document.getElementById('display-saldo');
    if (saldoEl) {
        saldoEl.textContent = formatCurrency(saldo);
        saldoEl.className = saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo';
    }

    // Renderiza Inputs de Categoria
    const containerInputs = document.getElementById('lista-inputs-gastos');
    if (containerInputs && containerInputs.children.length === 0) {
        containerInputs.innerHTML = '';
        INITIAL_CATEGORIES.forEach(cat => {
            const gastoAtual = gastos.find(g => g.nome === cat.nome)?.valor || 0;
            
            const div = document.createElement('div');
            div.className = 'campo-input';
            div.innerHTML = `
                <label style="color: ${cat.cor}; display:flex; align-items:center; gap:5px;">
                    <span class="cor-indicador" style="background:${cat.cor}"></span> ${cat.nome} (R$)
                </label>
                <input type="number" class="input-valor-gasto" 
                       data-nome="${cat.nome}" data-cor="${cat.cor}" 
                       value="${gastoAtual > 0 ? gastoAtual : ''}" placeholder="0,00">
            `;
            containerInputs.appendChild(div);
        });
    }

    updateChart(gastos);
}

function updateChart(gastos) {
    const ctx = document.getElementById('graficoGastos');
    if (!ctx) return;

    const gastosFiltrados = gastos.filter(g => g.valor > 0);

    if (myChart) myChart.destroy();

    const dataValues = gastosFiltrados.length ? gastosFiltrados.map(g => g.valor) : [1];
    const bgColors = gastosFiltrados.length ? gastosFiltrados.map(g => g.cor) : ['#e0e0e0'];
    const labels = gastosFiltrados.length ? gastosFiltrados.map(g => g.nome) : ['Sem dados'];

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: bgColors,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', display: gastosFiltrados.length > 0 },
                tooltip: { enabled: gastosFiltrados.length > 0 }
            }
        }
    });
}

// Função Global de Salvar
window.salvarPlanejamento = async () => {
    if (!isAuthReady) return alert('Aguarde a conexão...');

    const btn = document.querySelector('.btn-salvar');
    const textoOriginal = btn.innerText;
    if(btn) { btn.innerText = "Salvando..."; btn.disabled = true; }

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
        await setDoc(doc(db, 'planejamentos', userId), {
            renda, gastos, updatedAt: new Date().toISOString()
        });
        alert('Planejamento salvo com sucesso!');
    } catch (e) {
        alert('Erro ao salvar os dados. Verifique sua conexão.');
    } finally {
        if(btn) { btn.innerText = textoOriginal; btn.disabled = false; }
    }
};

window.redirectUser = (path) => {
    window.location.href = path;
}

initApp();