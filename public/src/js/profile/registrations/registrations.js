/* src/js/registrations.js */

document.addEventListener("DOMContentLoaded", () => {
    if (typeof carregarSidebar === "function") {
        carregarSidebar();
    }
    configurarAbasInscricoes();
    listarInscricoes();
});

// LISTAR INSCRIÇÕES SEPARADAS (CURSOS E EVENTOS)
function listarInscricoes() {
    const containerCursos = document.getElementById('container-cursos');
    const containerEventos = document.getElementById('container-eventos');

    if (!containerCursos || !containerEventos) return;

    containerCursos.innerHTML = '';
    containerEventos.innerHTML = '';

    const lista = JSON.parse(localStorage.getItem('minhasInscricoes')) || [];

    let temCurso = false;
    let temEvento = false;

    lista.forEach((item) => {
        const cardHTML = criarCardHTML(item);

        if (item.categoria === 'curso') {
            containerCursos.innerHTML += cardHTML;
            temCurso = true;
        } else {
            containerEventos.innerHTML += cardHTML;
            temEvento = true;
        }
    });

    if (!temCurso) {
        containerCursos.innerHTML = `
            <div class="sem-inscricoes">
                <p>Você ainda não se inscreveu em nenhum curso.</p>
                <button onclick="window.location.href='../../pages/explore/courses/index/index.html'">Explorar Cursos</button>
            </div>
        `;
    }

    if (!temEvento) {
        containerEventos.innerHTML = `
            <div class="sem-inscricoes">
                <p>Você não tem eventos confirmados.</p>
                <button onclick="window.location.href='../../pages/explore/eventss/index/index.html'">Explorar Eventos</button>
            </div>
        `;
    }
}

// GERAR HTML DO CARD
function criarCardHTML(item) {
    return `
        <div class="card-inscricao">
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="card-info">
                <span class="tag-tipo">${item.categoria || 'Geral'}</span>
                <h3>${item.titulo}</h3>
                <p><strong>Data:</strong> ${item.data || 'A definir'}</p>
                <p><strong>Local:</strong> ${item.local || 'Online'}</p>
                <button class="btn-cancelar" onclick="cancelarInscricao('${item.id}')">
                    Cancelar Inscrição
                </button>
            </div>
        </div>
    `;
}

// SALVAR INSCRIÇÃO NO LOCALSTORAGE
window.inscreverNoEvento = function(idDoItem) {
    
    let itemEncontrado = null;

    if (typeof listaDeEventos !== 'undefined') {
        itemEncontrado = listaDeEventos.find(e => e.id === idDoItem);
    }

    if (!itemEncontrado && typeof listaDeCursos !== 'undefined') {
        itemEncontrado = listaDeCursos.find(c => c.id === idDoItem);
    }

    if (!itemEncontrado) {
        console.error("Item não encontrado com ID:", idDoItem);
        alert("Erro: Curso ou Evento não encontrado no sistema.");
        return;
    }

    let minhasInscricoes = JSON.parse(localStorage.getItem("minhasInscricoes")) || [];
    const jaInscrito = minhasInscricoes.some(item => item.id === idDoItem);

    if (jaInscrito) {
        alert("Você já está inscrito!");
        window.location.href = "/src/pages/profile/inscricoes.html"; 
        return;
    }

    minhasInscricoes.push(itemEncontrado);
    localStorage.setItem("minhasInscricoes", JSON.stringify(minhasInscricoes));

    alert("Inscrição confirmada em: " + itemEncontrado.titulo);
    window.location.href = "/src/pages/profile/inscricoes.html";
}

// CANCELAR INSCRIÇÃO
window.cancelarInscricao = function(idParaRemover) {
    if (confirm("Tem certeza que deseja cancelar esta inscrição?")) {
        let lista = JSON.parse(localStorage.getItem('minhasInscricoes')) || [];
        const novaLista = lista.filter(item => item.id !== idParaRemover);
        
        localStorage.setItem('minhasInscricoes', JSON.stringify(novaLista));
        
        listarInscricoes();
    }
}

// ALTERNAR ABAS (CURSOS / EVENTOS)
function configurarAbasInscricoes() {
    const tabs = document.querySelectorAll('.btn-aba');
    const contents = document.querySelectorAll('.aba-conteudo');

    if(tabs.length === 0) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('ativo'));
            contents.forEach(c => c.style.display = 'none');

            tab.classList.add('ativo');
            
            const targetId = tab.dataset.tab;
            const targetElement = document.getElementById(targetId);
            if (targetElement) targetElement.style.display = 'block';
        });
    });
}

// CARREGAR DADOS DA SIDEBAR
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