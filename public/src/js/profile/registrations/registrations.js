/* src/js/registrations.js */

document.addEventListener("DOMContentLoaded", () => {
    // Verifica se as funções existem antes de chamar (para não dar erro em páginas diferentes)
    if (typeof carregarSidebar === "function") {
        carregarSidebar();
    }
    listarInscricoes();
});

// --- FUNÇÃO 1: LISTAR (Pode ficar normal, pois é chamada pelo próprio JS) ---
function listarInscricoes() {
    const container = document.getElementById('container-cards');
    
    // Se não tiver o container na página (ex: estou na página de eventos), para aqui.
    if (!container) return;

    const lista = JSON.parse(localStorage.getItem('minhasInscricoes')) || [];

    if (lista.length === 0) {
        container.innerHTML = `
            <div class="sem-inscricoes">
                <p>Você ainda não se inscreveu em nada.</p>
                <button onclick="window.location.href='../../pages/explore/eventss/index/index.html'">Explorar Eventos</button>
            </div>
        `;
        return;
    }

    container.innerHTML = '';

    lista.forEach((evento) => {
        const card = document.createElement('div');
        card.className = 'card-inscricao';
        card.innerHTML = `
            <img src="${evento.imagem}" alt="${evento.titulo}">
            <div class="card-info">
                <span class="tag-tipo">${evento.categoria || 'Evento'}</span>
                <h3>${evento.titulo}</h3>
                <p><strong>Data:</strong> ${evento.data || 'A definir'}</p>
                <p><strong>Local:</strong> ${evento.local || 'Online'}</p>
                <button class="btn-cancelar" onclick="cancelarInscricao('${evento.id}')">
                    Cancelar Inscrição
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- FUNÇÃO 2: INSCREVER (Tornando Global para o HTML ver) ---
window.inscreverNoEvento = function(idDoEvento) {
    
    // 1. Verifica se o banco de eventos carregou
    if (typeof listaDeEventos === 'undefined') {
        console.error("Erro: O arquivo bancoDeEventos.js não foi carregado ou a listaDeEventos não existe.");
        alert("Erro técnico: Banco de eventos não encontrado.");
        return;
    }

    // 2. Busca o evento no banco
    const eventoEncontrado = listaDeEventos.find(evento => evento.id === idDoEvento);

    if (!eventoEncontrado) {
        console.error("Evento não encontrado com ID:", idDoEvento);
        alert("Evento não encontrado!");
        return;
    }

    // 3. Lógica de salvar
    let minhasInscricoes = JSON.parse(localStorage.getItem("minhasInscricoes")) || [];
    const jaInscrito = minhasInscricoes.some(item => item.id === idDoEvento);

    if (jaInscrito) {
        alert("Você já está inscrito neste evento!");
        // Ajuste o caminho para a sua página de inscrições
        window.location.href = "/src/pages/profile/registrations.html"; 
        return;
    }

    minhasInscricoes.push(eventoEncontrado);
    localStorage.setItem("minhasInscricoes", JSON.stringify(minhasInscricoes));

    alert("Inscrição confirmada em: " + eventoEncontrado.titulo);
    // Redireciona para a página de inscrições
    window.location.href = "/src/pages/profile/registrations.html";
}

// --- FUNÇÃO 3: CANCELAR (Tornando Global) ---
window.cancelarInscricao = function(idParaRemover) {
    if (confirm("Tem certeza que deseja cancelar esta inscrição?")) {
        let lista = JSON.parse(localStorage.getItem('minhasInscricoes')) || [];
        const novaLista = lista.filter(item => item.id !== idParaRemover);
        localStorage.setItem('minhasInscricoes', JSON.stringify(novaLista));
        
        listarInscricoes(); // Atualiza a tela
        alert("Inscrição cancelada.");
    }
}

// --- FUNÇÃO 4: SIDEBAR ---
function carregarSidebar() {
    const nomeEl = document.getElementById('nome-sidebar');
    const avatarEl = document.getElementById('avatar-img');
    
    if(nomeEl) {
        const nome = localStorage.getItem('solar_nome_completo') || 'Usuário';
        nomeEl.innerText = nome;
    }
    if(avatarEl) {
        const foto = localStorage.getItem('solar_avatar');
        if(foto) avatarEl.src = foto;
    }
}