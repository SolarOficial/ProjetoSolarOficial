document.addEventListener("DOMContentLoaded", () => {
    configurarBotoes();
    atualizarVisualBotoes();
});

// Configura os eventos de clique nos botões
function configurarBotoes() {
    const btnApoio = document.querySelector('.plano-apoio button');
    if (btnApoio) {
        btnApoio.addEventListener('click', () => assinarPlano('apoio'));
    }

    const btnAmparo = document.querySelector('.plano-amparo button');
    if (btnAmparo) {
        btnAmparo.addEventListener('click', () => assinarPlano('amparo'));
    }

    const btnAlicerce = document.querySelector('.plano-alicerce button');
    if (btnAlicerce) {
        btnAlicerce.addEventListener('click', () => assinarPlano('alicerce'));
    }
}

// Função Principal: Salva o plano e redireciona (Sem Alertas)
function assinarPlano(chavePlano) {
    // 1. Salva o novo plano no armazenamento local
    localStorage.setItem('solar_user_plan', chavePlano);
    
    // 2. Redireciona imediatamente para o perfil do usuário
    // O usuário verá o novo plano ativo lá
    window.location.href = '../profile/plan.html';
}

// Atualiza o visual dos botões para indicar qual é o atual
function atualizarVisualBotoes() {
    const planoAtual = localStorage.getItem('solar_user_plan') || 'apoio';
    
    const mapa = {
        'apoio': '.plano-apoio button',
        'amparo': '.plano-amparo button',
        'alicerce': '.plano-alicerce button'
    };

    // Reseta todos os botões para o estado padrão
    Object.values(mapa).forEach(seletor => {
        const btn = document.querySelector(seletor);
        if (btn) {
            btn.innerText = "ASSINAR PLANO";
            btn.style.opacity = "1";
            btn.disabled = false;
            btn.style.cursor = "pointer";
            btn.style.backgroundColor = ""; // Remove cores inline
        }
    });

    // Destaca e bloqueia o botão do plano atual
    const btnAtivo = document.querySelector(mapa[planoAtual]);
    if (btnAtivo) {
        btnAtivo.innerText = "SEU PLANO ATUAL";
        btnAtivo.style.backgroundColor = "#4cd137"; // Verde Sucesso
        btnAtivo.style.cursor = "default";
        btnAtivo.disabled = true; // Impede clicar no plano que já possui
    }
}

// Função de navegação
window.redirectUser = (path) => {
    window.location.href = path;
}

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