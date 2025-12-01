// carrosel sobre - inicio
const indicadores = document.querySelectorAll(".carrossel-sobre i");
const section = document.querySelector(".conheca-solar");

const imagens = [
  "../../../assets/img-about/background-inicio-sobre.png",
  "../../../assets/img-about/img-about2.png"
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

// carrossel benefícios 
const wrapper = document.querySelector(".beneficios-wrapper");
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");

function parseCssSizeToPx(value) {
  if (!value) return 0;
  value = value.trim();

  if (value.endsWith('px')) return parseFloat(value);

  if (value.endsWith('rem')) {
    const rem = parseFloat(value);
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return rem * rootFontSize;
  }

  const n = parseFloat(value);
  return isNaN(n) ? 0 : n;
}

function getStep() {
  const card = document.querySelector(".beneficios-solar");
  if (!card) return 0;
  const cardWidth = card.getBoundingClientRect().width;

  const gapValue = getComputedStyle(wrapper).gap || getComputedStyle(wrapper).getPropertyValue('gap');
  const gapPx = parseCssSizeToPx(gapValue);

  return Math.round(cardWidth + gapPx);
}

function updateButtons() {
  const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
  btnPrev.style.opacity = wrapper.scrollLeft <= 0 ? '0.4' : '1';
  btnPrev.style.pointerEvents = wrapper.scrollLeft <= 0 ? 'none' : 'auto';

  btnNext.style.opacity = wrapper.scrollLeft >= maxScroll - 1 ? '0.4' : '1';
  btnNext.style.pointerEvents = wrapper.scrollLeft >= maxScroll - 1 ? 'none' : 'auto';
}

btnNext.addEventListener("click", () => {
  const step = getStep();
  wrapper.scrollBy({ left: step, behavior: 'smooth' });
});

btnPrev.addEventListener("click", () => {
  const step = getStep();
  wrapper.scrollBy({ left: -step, behavior: 'smooth' });
});

wrapper.addEventListener('scroll', () => {
  window.requestAnimationFrame(updateButtons);
});

window.addEventListener('resize', () => {
  setTimeout(updateButtons, 120);
});

// inicializa estado
updateButtons();
