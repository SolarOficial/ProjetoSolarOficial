// carrosel sobre - inicio
const indicadores = document.querySelectorAll(".carrossel-sobre i");
const section = document.querySelector(".conheca-solar");

const imagens = [
  "/ProjetoSolarOficial/src/assets/img-about/background-inicio-sobre.png",
  "/ProjetoSolarOficial/src/assets/img-about/img-about2.png"
];

let indexAtual = 0;

function atualizarCarrossel(index) {
  section.style.backgroundImage = `url('${imagens[index]}')`;

  indicadores.forEach((i, idx) => {
    if(idx === index) {
      i.classList.remove("fa-regular");
      i.classList.add("fa-solid");
      i.style.color = "#6a0dad";
    } else {
      i.classList.remove("fa-solid");
      i.classList.add("fa-regular");
      i.style.color = "#cccccc";
    }
  });
  indexAtual = index;
}

indicadores.forEach((icon, index) => {
  icon.addEventListener("click", () => {
    atualizarCarrossel(index);
  });
});

setInterval(() => {
  let proximoIndex = (indexAtual + 1) % imagens.length;
  atualizarCarrossel(proximoIndex);
}, 5000);

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
