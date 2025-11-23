// FAQ - Perguntas Frequentes
const perguntas = document.querySelectorAll('.pergunta-item');

perguntas.forEach(item => {
  const header = item.querySelector('.pergunta-header');

  header.addEventListener('click', () => {
    const resposta = item.querySelector('.resposta-pergunta');
    const icone = header.querySelector('.pergunta-icone');

    // Alterna exibição
    resposta.style.display = resposta.style.display === 'block' ? 'none' : 'block';

    // Alterna ícone
    icone.textContent = icone.textContent === '+' ? '-' : '+';
  });
});

/* SCROLL BAR PROFISSIONAIS */

document.addEventListener("DOMContentLoaded", () => {
  const listaCards = document.querySelector(".lista-cards");
  const setaEsquerda = document.querySelector(".seta-nav.esquerda");
  const setaDireita = document.querySelector(".seta-nav.direita");

  if (!listaCards || !setaEsquerda || !setaDireita) {
    console.error("Elementos do slider não encontrados!");
    return;
  }

  const scrollAmount = 390;

  setaDireita.addEventListener("click", () => {
    listaCards.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

  setaEsquerda.addEventListener("click", () => {
    listaCards.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
  });
});

/* DETALHES ESTAGIÁRIOS */

function abrirModalDetalhes(botao) {
    // 1. Pega os dados do botão clicado
    const dados = botao.dataset;

    // 2. Preenche os elementos do Modal
    document.getElementById('modal-foto').src = dados.foto;
    document.getElementById('modal-nome').innerText = dados.nome;
    document.getElementById('modal-cargo').innerText = dados.cargo;
    document.getElementById('modal-formacao').innerText = dados.formacao;
    document.getElementById('modal-supervisor').innerText = dados.supervisor;
    document.getElementById('modal-bio').innerText = dados.bio;

    // 3. Cria as tags coloridas
    const containerTags = document.getElementById('modal-tags');
    containerTags.innerHTML = ''; // Limpa tags anteriores
    
    // Separa as tags pela vírgula e cria os elementos
    if (dados.tags) {
        const tagsArray = dados.tags.split(',');
        tagsArray.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.innerText = tag.trim();
            containerTags.appendChild(span);
        });
    }

    // 4. Mostra o modal
    document.getElementById('modalDetalhes').style.display = 'flex';
}

function fecharModalDetalhes() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

// Fecha se clicar fora do cartão
window.onclick = function(event) {
    const modal = document.getElementById('modalDetalhes');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}