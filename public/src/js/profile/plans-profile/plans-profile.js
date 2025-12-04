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

// --- FUNÇÕES PRINCIPAIS ---

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
    // Pega o plano do localStorage (ou define 'apoio' se não existir)
    let planoAtual = localStorage.getItem('solar_user_plan');
    
    if (!planoAtual) {
        planoAtual = 'apoio';
        localStorage.setItem('solar_user_plan', 'apoio');
    }

    console.log("Plano Atual:", planoAtual);
    renderizarCartaoPlano(planoAtual);
}

function renderizarCartaoPlano(chavePlano) {
    const dados = PLANOS_INFO[chavePlano];
    if (!dados) return; // Segurança caso venha chave inválida

    // Atualiza Textos
    document.getElementById('titulo-plano').textContent = dados.nome;
    document.getElementById('desc-plano').textContent = dados.desc;

    // Atualiza Lista de Vantagens
    const lista = document.getElementById('lista-vantagens');
    lista.innerHTML = '';

    // Itens Inclusos (Verde)
    dados.vantagens.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check" style="color: #4cd137;"></i> ${item}`;
        lista.appendChild(li);
    });

    // Itens Bloqueados (Visualmente desativados)
    dados.bloqueado.forEach(item => {
        const li = document.createElement('li');
        li.style.opacity = "0.5";
        li.innerHTML = `<i class="fas fa-lock" style="color: #e84118;"></i> ${item}`;
        lista.appendChild(li);
    });

    // --- LÓGICA DO BOTÃO CANCELAR ---
    const btnCancelar = document.getElementById('btn-cancelar-assinatura');
    
    if (chavePlano === 'apoio') {
        // Se já é gratuito, esconde o botão de cancelar
        btnCancelar.style.display = 'none';
    } else {
        // Se é pago (Amparo/Alicerce), mostra o botão
        btnCancelar.style.display = 'inline-block';
    }
}

// --- AÇÕES ---

// 1. Botão "Atualizar Assinatura" ou "Ver Planos"
window.irParaPlanos = function() {
    window.location.href = '../../../pages/plans/plans.html'; 
};

// 2. Botão "Cancelar Assinatura"
window.cancelarAssinatura = function() {
    // Só executa se NÃO for apoio (proteção extra além do display:none)
    const planoAtual = localStorage.getItem('solar_user_plan');
    
    if (planoAtual === 'apoio') {
        alert("Você já está no plano gratuito.");
        return;
    }

    if(confirm("Tem certeza que deseja cancelar sua assinatura Premium? Você voltará para os recursos limitados do plano Apoio.")) {
        localStorage.setItem('solar_user_plan', 'apoio');
        renderizarCartaoPlano('apoio');
        // Opcional: Feedback visual melhor que alert
        alert("Assinatura cancelada com sucesso.");
    }
};

// 3. Verificação de Acesso (Botão Financeiro)
window.verificarAcessoFinanceiro = function() {
    const planoAtual = localStorage.getItem('solar_user_plan') || 'apoio';

    // Apenas 'alicerce' tem acesso
    if (planoAtual === 'alicerce') {
        window.location.href = '../financeTool/ferramentafinanceira/financialPlanning.html';
    } else {
        // Se for 'apoio' ou 'amparo', abre o Modal de Bloqueio
        abrirModalUpgrade();
    }
};

// --- CONTROLE DOS MODAIS ---

function abrirModalUpgrade() {
    const modal = document.getElementById('modalUpgrade');
    modal.classList.add('ativo'); // Usa a classe .ativo do seu CSS global/modal
}

window.fecharModalUpgrade = function() {
    const modal = document.getElementById('modalUpgrade');
    modal.classList.remove('ativo');
}

// Fecha o modal se clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modalUpgrade');
    if (event.target == modal) {
        modal.classList.remove('ativo');
    }
    
    // Mantém a funcionalidade do modal de logout também
    const modalLogout = document.getElementById('modalLogout');
    if (event.target == modalLogout) {
        modalLogout.classList.remove('ativo'); // Assumindo que você usa .ativo lá também
    }
}

// Navegação global
window.redirectUser = (path) => {
    window.location.href = path;
}