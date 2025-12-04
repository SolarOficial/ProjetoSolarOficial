import { auth } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

window.redirectUser = function (path) {
  window.location.href = path;
}

window.externalRedirect = function (url) {
  window.location.href = url;
}

window.fazerLogout = function () {
  signOut(auth).then(() => {
    window.location.href = "/login.html";
  }).catch((error) => {
    console.error("Erro ao fazer logout:", error);
  });
}

onAuthStateChanged(auth, (user) => {
  const authBtn = document.getElementById('auth-btn');
  const authLink = document.getElementById('auth-link');

  if (authBtn && authLink) {
    if (user) {

      authBtn.innerText = "MEU PERFIL";
      authLink.setAttribute('onclick', "redirectUser('/src/pages/profile/profile/profile.html')");
    } else {
      // --- NÃO LOGADO ---
      const urlAtual = window.location.href;

      if (urlAtual.includes('login.html')) {
        authBtn.innerText = "CADASTRAR-SE";
        authLink.setAttribute('onclick', "redirectUser('/register.html')");
      }

      else {
        authBtn.innerText = "ENTRAR";
        authLink.setAttribute('onclick', "redirectUser('/login.html')");
      }
    }
  }
});

/* SIENNA */

if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"]')) {
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js";
  s.defer = true;
  document.body.appendChild(s);
}

/* VLIBRAS */

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

/* ANIMAÇÂO SCROLL */

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

/* SOLARIA */

var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/6924426cb8106b195f6e74fa/1jaqq6uav';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();