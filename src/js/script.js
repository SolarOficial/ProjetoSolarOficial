function redirectUser(path) {
  window.location.href = path;
}

function externalRedirect(url) {
  window.location.href = url;
}

// API Sienna
if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"]')) {
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js";
  s.defer = true;
  s.onload = () => console.log("Sienna widget carregado");
  s.onerror = () => console.error("Erro ao carregar widget");
  document.body.appendChild(s);
}

// API Vlibras

if (!document.querySelector('script[src="https://vlibras.gov.br/app/vlibras-plugin.js"]')) {

  const container = document.createElement("div");
  container.setAttribute("vw", "");
  container.classList.add("enabled");

  container.innerHTML = `
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  `;

  document.body.appendChild(container);

  const script = document.createElement("script");
  script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
  script.defer = true;

  script.onload = () => {
    console.log("VLibras carregado com sucesso!");
    new window.VLibras.Widget("https://vlibras.gov.br/app");
  };

  script.onerror = () => {
    console.error("Erro ao carregar VLibras");
  };

  document.body.appendChild(script);
}

//animação scroll
window.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.animar-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('mostrar');
        observer.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
});


