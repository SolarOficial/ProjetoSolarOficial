document.addEventListener("DOMContentLoaded", function() {
    carregarInscricoes();
});

function carregarInscricoes() {
    const containerInscricoes = document.getElementById("lista-inscricoes");
    const inscricoesSalvas = JSON.parse(localStorage.getItem("minhasInscricoes")) || [];

    if (inscricoesSalvas.length === 0) {
        containerInscricoes.innerHTML = "<p>Você ainda não se inscreveu em nenhum evento.</p>";
        return;
    }
    
    containerInscricoes.innerHTML = ""; 
    
    inscricoesSalvas.forEach(evento => {
        const cardHTML = `
            <div class="card-evento">
                <img src="${evento.imagem}" alt="${evento.titulo}" class="card-img">
                <div class="card-info">
                    <h4>${evento.titulo}</h4>
                    <p>${evento.descricao}</p>
                </div>
                <button class="btn-roxo" onclick="verDetalhes('${evento.id}')">Ver Informações</button>
            </div>
        `;
        containerInscricoes.innerHTML += cardHTML;
    });
}

/* FUNÇÃO INSCRIÇÃO */

// Função chamada pelo botão "Inscreva-se" na página do evento
function inscreverNoEvento(idDoEvento) {
    
    // 1. Verifica se o banco de eventos foi carregado
    if (typeof listaDeEventos === 'undefined') {
        console.error("Erro: O arquivo bancoDeEventos.js não foi carregado.");
        alert("Erro no sistema. Tente novamente.");
        return;
    }

    // 2. Busca o evento pelo ID
    const eventoEncontrado = listaDeEventos.find(evento => evento.id === idDoEvento);

    if (!eventoEncontrado) {
        console.error("Evento não encontrado com o ID:", idDoEvento);
        return;
    }

    // 3. Pega as inscrições antigas do navegador
    let minhasInscricoes = JSON.parse(localStorage.getItem("minhasInscricoes")) || [];

    // 4. Verifica se já está inscrito
    const jaInscrito = minhasInscricoes.some(item => item.id === idDoEvento);

    if (jaInscrito) {
        alert("Você já está inscrito neste evento!");
        // Redireciona para a página de inscrições
        window.location.href = "/ProjetoSolarOficial/src/pages/profile/inscricoes.html";
        return;
    }

    // 5. Adiciona e Salva
    minhasInscricoes.push(eventoEncontrado);
    localStorage.setItem("minhasInscricoes", JSON.stringify(minhasInscricoes));

    // 6. Sucesso e Redirecionamento
    alert("Inscrição confirmada em: " + eventoEncontrado.titulo);
    
    // ATENÇÃO: Verifique se este caminho abaixo está correto para o seu projeto
    window.location.href = "/ProjetoSolarOficial/src/pages/profile/registrations.html";
}