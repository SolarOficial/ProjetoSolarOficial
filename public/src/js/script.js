import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

window.redirectUser = function(path) {
  window.location.href = path;
}

window.externalRedirect = function(url) {
  window.location.href = url;
}

onAuthStateChanged(auth, (user) => {
    const authBtn = document.getElementById('auth-btn');
    const authLink = document.getElementById('auth-link');

    if (authBtn && authLink) {
        if (user) {
            authBtn.innerText = "MEU PERFIL";
            authLink.setAttribute('onclick', "redirectUser('/src/pages/profile/profile/profile.html')");
        } else {
            authBtn.innerText = "ENTRAR";
            authLink.setAttribute('onclick', "redirectUser('/login.html')");
        }
    }
});

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
      if (entry.isIntersecting) {
        entry.target.classList.add('mostrar');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
});


/* 

Solaria

var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/691a0ba6ccfc7c195b6c429d/1ja6rr188';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})(); 

*/

