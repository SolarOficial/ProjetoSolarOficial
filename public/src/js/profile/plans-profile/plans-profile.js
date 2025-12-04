// --- DADOS DOS PLANOS ---
const PLANOS_INFO = {
    apoio: {
        id: "apoio",
        nome: "Plano Apoio",
        preco: "Gratuito",
        desc: "O Plano Apoio é o ponto de partida ideal, oferecendo acesso essencial aos recursos da plataforma para quem está começando.",
        vantagens: [
            "Localizar ONGs, UBS e CRAS",
            "Agendar Consultas - limite de 2 encontros mensais",
            "Acesso ao Blog e conteúdos educativos"
        ],
        bloqueado: ["Chat IA", "Planejamento Financeiro"]
    },
    amparo: {
        id: "amparo",
        nome: "Plano Amparo",
        preco: "R$10.00/mês",
        desc: "O Plano Amparo é feito para acompanhar você com cuidado e acolhimento, trazendo apoio constante na sua jornada.",
        vantagens: [
            "Localizar ONGs, UBS e CRAS",
            "Agendar Consultas - limite de 4 encontros mensais",
            "Acesso ao Blog e conteúdos educativos",
            "Chat IA com busca em diversos assuntos"
        ],
        bloqueado: ["Planejamento Financeiro"]
    },
    alicerce: {
        id: "alicerce",
        nome: "Plano Alicerce",
        preco: "R$19.90/mês",
        desc: "O Plano Alicerce oferece a experiência completa, garantindo acesso total a todas as ferramentas para fortalecer sua base.",
        vantagens: [
            "Localizar ONGs, UBS e CRAS",
            "Agendar Consultas - limite de 8 encontros mensais",
            "Acesso ao Blog e conteúdos educativos",
            "Chat IA com busca em diversos assuntos",
            "Planejamento financeiro e criação de agenda semanal"
        ],
        bloqueado: []
    }
};

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuario();
    inicializarPlano();
});

function carregarUsuario() {
    const nome = localStorage.getItem('solar_nome_completo') || 'Usuário';
    const foto = localStorage.getItem('solar_avatar');
    
    const nomeEl = document.getElementById('nome-sidebar');
    const fotoEl = document.getElementById('avatar-img');

    if (nomeEl) nomeEl.innerText = nome;
    if (fotoEl && foto) fotoEl.src = foto;
    else if (fotoEl) fotoEl.src = "https://placehold.co/120x120/9675ce/ffffff?text=Perfil";
}

function inicializarPlano() {
    let planoAtual = localStorage.getItem('solar_user_plan');
    if (!planoAtual) {
        planoAtual = 'apoio';
        localStorage.setItem('solar_user_plan', 'apoio');
    }
    renderizarCartaoPlano(planoAtual);
}

function renderizarCartaoPlano(chavePlano) {
    const dados = PLANOS_INFO[chavePlano];
    if (!dados) return;

    // Atualiza Textos
    document.getElementById('titulo-plano').textContent = dados.nome;
    document.getElementById('desc-plano').textContent = dados.desc;

    // Atualiza Lista de Vantagens
    const lista = document.getElementById('lista-vantagens');
    lista.innerHTML = '';

    dados.vantagens.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check" style="color: #4cd137;"></i> ${item}`;
        lista.appendChild(li);
    });

    dados.bloqueado.forEach(item => {
        const li = document.createElement('li');
        li.style.opacity = "0.5";
        li.innerHTML = `<i class="fas fa-lock" style="color: #e84118;"></i> ${item}`;
        lista.appendChild(li);
    });

    // Controla visibilidade do botão Cancelar
    const btnCancelar = document.getElementById('btn-cancelar-assinatura');
    if (chavePlano === 'apoio') {
        btnCancelar.style.display = 'none';
    } else {
        btnCancelar.style.display = 'inline-block';
    }
}

// --- AÇÕES ---

window.irParaPlanos = function() {
    window.location.href = '../../../pages/plans/plans.html'; 
};

// Abre o Modal de Cancelamento
window.abrirModalCancelamento = function() {
    document.getElementById('modalCancel').classList.add('ativo');
}

window.fecharModalCancel = function() {
    document.getElementById('modalCancel').classList.remove('ativo');
}

// Executa o cancelamento real (chamado pelo botão do modal)
window.confirmarCancelamento = function() {
    // 1. Atualiza o estado
    localStorage.setItem('solar_user_plan', 'apoio');
    
    // 2. Atualiza a tela (O usuário vê o cartão mudar instantaneamente para "Apoio")
    renderizarCartaoPlano('apoio');
    
    // 3. Fecha o modal
    fecharModalCancel();
};

window.verificarAcessoFinanceiro = function() {
    const planoAtual = localStorage.getItem('solar_user_plan') || 'apoio';

    if (planoAtual === 'alicerce') {
        window.location.href = '../financeTool/ferramentafinanceira/financialPlanning.html';
    } else {
        abrirModalUpgrade();
    }
};

// --- CONTROLE GERAL DE MODAIS ---

function abrirModalUpgrade() {
    document.getElementById('modalUpgrade').classList.add('ativo');
}

window.fecharModalUpgrade = function() {
    document.getElementById('modalUpgrade').classList.remove('ativo');
}

// Fecha modais ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('ativo');
    }
}

window.redirectUser = (path) => {
    window.location.href = path;
}