import { auth, provider } from '../firebase-config.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
                    // Ajuste o caminho da home se precisar
                    window.location.href = 'public/index.html';
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

const btnGoogle = document.getElementById('btn-google');

if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
        //signInWithPopup abre a janelinha do Google
        signInWithPopup(auth, provider)
            .then((result) => {
                // SUCESSO! O usuário logou.
                const user = result.user;
                console.log("Logado com Google:", user);

                // Mostra o modal de sucesso (Reaproveitando o que já existe)
                const modalSucesso = document.getElementById('modalLoginSucesso');
                if (modalSucesso) {
                    modalSucesso.style.display = 'flex';
                } else {
                    window.location.href = 'src/pages/home/home.html';
                }
            })
            .catch((error) => {
                console.error("Erro Google:", error);
                alert("Erro ao entrar com Google: " + error.message);
            });
    });
}

window.prosseguirRecuperacao = function () {
    const emailInput = document.querySelector('#modalRecuperacao input[type="email"]');
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
            alert("Erro ao enviar email: " + error.message);
        });
}