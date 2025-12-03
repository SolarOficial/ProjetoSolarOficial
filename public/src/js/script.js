import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

window.redirectUser = function(path) {
  window.location.href = path;
}

window.externalRedirect = function(url) {
  window.location.href = url;
}

window.fazerLogout = function() {
    if(confirm("Tem certeza que deseja sair?")) {
        signOut(auth).then(() => {
            window.location.href = "/login.html";
        }).catch((error) => {
            console.error(error);
        });
    }
}

onAuthStateChanged(auth, (user) => {
    const authBtn = document.getElementById('auth-btn');
    const authLink = document.getElementById('auth-link');

    if (authBtn && authLink) {
        if (user) {
            // --- USUÁRIO LOGADO ---
            authBtn.innerText = "MEU PERFIL";
            // Ajuste o caminho do perfil se necessário
            authLink.setAttribute('onclick', "redirectUser('/src/pages/profile/profile.html')");
        } else {
            // --- NÃO LOGADO ---
            const urlAtual = window.location.href;

            // Se estou na página de LOGIN, o botão vira "CADASTRAR-SE"
            if (urlAtual.includes('login.html')) {
                authBtn.innerText = "CADASTRAR-SE";
                // Aponta para a página de cadastro na raiz
                authLink.setAttribute('onclick', "redirectUser('/register.html')");
            } 
            // Em qualquer outra página (Home, Cadastro, Sobre), o botão é "ENTRAR"
            else {
                authBtn.innerText = "ENTRAR";
                // Aponta para a página de login na raiz
                authLink.setAttribute('onclick', "redirectUser('/login.html')");
            }
        }
    }
});

if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"]')) {
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js";
  s.defer = true;
  document.body.appendChild(s);
}

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
    new window.VLibras.Widget("https://vlibras.gov.br/app");
  };

  document.body.appendChild(script);
}

window.addEventListener('DOMContentLoaded', () => {
  const elementos = document.querySelectorAll('.animar-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('mostrar');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
});