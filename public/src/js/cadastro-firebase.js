import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const formCadastro = document.getElementById('form-cadastro');

if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault(); // Não recarregar a página

        // 1. Pegar os valores
        const email = document.getElementById('email').value;
        const confirmaEmail = document.getElementById('confirma-email').value;
        const senha = document.getElementById('senha').value;
        const confirmaSenha = document.getElementById('confirma-senha').value;
        const btnCadastrar = document.getElementById('btn-cadastrar');

        if (email !== confirmaEmail) {
            alert("Os e-mails não coincidem!");
            return;
        }

        if (senha !== confirmaSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        if (senha.length < 6) {
            alert("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        // 3. Feedback visual
        const textoOriginal = btnCadastrar.innerText;
        btnCadastrar.innerText = "Criando conta...";
        btnCadastrar.disabled = true;

        // 4. Criar no Firebase
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // SUCESSO!
                console.log("Usuário criado:", userCredential.user);

                // Mostrar o modal de sucesso
                const modal = document.getElementById('modalSucesso');
                if (modal) {
                    modal.style.display = 'flex';
                    modal.classList.add('active');
                } else {
                    alert("Conta criada com sucesso!");
                    window.location.href = 'login.html';
                }
            })
            .catch((error) => {
                console.error(error);
                btnCadastrar.innerText = textoOriginal;
                btnCadastrar.disabled = false;

                let mensagem = "Erro ao cadastrar.";
                if (error.code === 'auth/email-already-in-use') mensagem = "Este e-mail já está cadastrado.";
                if (error.code === 'auth/invalid-email') mensagem = "E-mail inválido.";
                if (error.code === 'auth/weak-password') mensagem = "A senha é muito fraca.";

                alert(mensagem);
            });
    });
}