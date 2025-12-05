import { auth, provider } from '../firebase-config.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// --- LOGIN COM E-MAIL E SENHA ---
const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const btnLogin = document.getElementById('btn-login');
        const textoOriginal = btnLogin.innerText;

        btnLogin.innerText = "Entrando...";
        btnLogin.disabled = true;

        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const modalSucesso = document.getElementById('modalLoginSucesso');
                if (modalSucesso) {
                    modalSucesso.style.display = 'flex';
                    modalSucesso.classList.add('active');
                } else {
                    // CORREÇÃO AQUI: Removemos o 'public/'
                    window.location.href = '/index.html';
                }
            })
            .catch((error) => {
                console.error(error);
                btnLogin.innerText = textoOriginal;
                btnLogin.disabled = false;

                let mensagem = "Erro ao entrar.";
                if (error.code === 'auth/invalid-credential') mensagem = "E-mail ou senha incorretos.";
                if (error.code === 'auth/user-not-found') mensagem = "Usuário não encontrado.";
                if (error.code === 'auth/wrong-password') mensagem = "Senha incorreta.";

                alert(mensagem);
            });
    });
}

// --- LOGIN COM GOOGLE ---
const btnGoogle = document.getElementById('btn-google');

if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Logado com Google:", user);

                const modalSucesso = document.getElementById('modalLoginSucesso');
                if (modalSucesso) {
                    modalSucesso.style.display = 'flex';
                } else {
                    window.location.href = '/src/pages/home/home.html';
                }
            })
            .catch((error) => {
                console.error("Erro Google:", error);
                alert("Erro ao entrar com Google: " + error.message);
            });
    });
}

// --- LÓGICA DE RECUPERAÇÃO DE SENHA ---

// 1. Função para ABRIR o modal (Faltava essa!)
window.abrirPopupRecuperacao = function(event) {
    if(event) event.preventDefault();
    const modal = document.getElementById('modalRecuperacao');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// 2. Função para ENVIAR o email
window.prosseguirRecuperacao = function () {
    const emailInput = document.getElementById('email-recuperacao');
    const emailRecuperacao = emailInput ? emailInput.value : '';

    if (!emailRecuperacao) {
        alert("Por favor, digite o e-mail.");
        return;
    }

    sendPasswordResetEmail(auth, emailRecuperacao)
        .then(() => {
            const modalRecuperacao = document.getElementById('modalRecuperacao');
            const modalSucesso = document.getElementById('modalSucesso');

            if (modalRecuperacao) modalRecuperacao.style.display = 'none';
            if (modalSucesso) modalSucesso.style.display = 'flex';
        })
        .catch((error) => {
            console.error("Erro recuperação:", error);
            
            let mensagem = "Erro ao enviar e-mail.";
            if (error.code === 'auth/user-not-found') mensagem = "Este e-mail não está cadastrado.";
            if (error.code === 'auth/invalid-email') mensagem = "E-mail inválido.";
            
            alert(mensagem);
        });
}

// 3. Função para FECHAR o modal
window.fecharPopupRecuperacao = function() {
    const modal = document.getElementById('modalRecuperacao');
    if (modal) {
        modal.style.display = 'none';
    }
}