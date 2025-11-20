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