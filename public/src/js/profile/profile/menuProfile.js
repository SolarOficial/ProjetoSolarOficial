document.addEventListener("DOMContentLoaded", () => {
    carregarDadosPerfil();
    configurarAbas();
    configurarFoto();
    ativarDigitacaoEmTempoReal();
});

function salvarPerfil() {
    const inputNome = document.getElementById('input-nome');
    const inputSobrenome = document.getElementById('input-sobrenome');

    if (inputNome && inputSobrenome) {
        const nome = inputNome.value;
        const sobrenome = inputSobrenome.value;
        const nomeCompleto = `${nome} ${sobrenome}`;

        const sidebarName = document.getElementById('nome-sidebar');
        if (sidebarName) sidebarName.innerText = nomeCompleto;

        localStorage.setItem('solar_nome', nome);
        localStorage.setItem('solar_sobrenome', sobrenome);
        localStorage.setItem('solar_nome_completo', nomeCompleto);

        alert("Informações salvas com sucesso!");
    }
}

function carregarDadosPerfil() {
    const nomeSalvo = localStorage.getItem('solar_nome');
    const sobrenomeSalvo = localStorage.getItem('solar_sobrenome');
    const avatarSalvo = localStorage.getItem('solar_avatar');

    if (avatarSalvo) {
        const imgAvatar = document.getElementById('avatar-img');
        if (imgAvatar) imgAvatar.src = avatarSalvo;
    }

    if (nomeSalvo) {
        const inputNome = document.getElementById('input-nome');
        if (inputNome) inputNome.value = nomeSalvo;
    }
    
    if (sobrenomeSalvo) {
        const inputSobrenome = document.getElementById('input-sobrenome');
        if (inputSobrenome) inputSobrenome.value = sobrenomeSalvo;
    }
    
    if (nomeSalvo || sobrenomeSalvo) {
        const nomeCompleto = `${nomeSalvo || ''} ${sobrenomeSalvo || ''}`;
        const sidebarName = document.getElementById('nome-sidebar');
        if (sidebarName) sidebarName.innerText = nomeCompleto;
    }
}

function ativarDigitacaoEmTempoReal() {
    const inputNome = document.getElementById('input-nome');
    const inputSobrenome = document.getElementById('input-sobrenome');
    const labelSidebar = document.getElementById('nome-sidebar');

    function atualizarVisual() {
        if (labelSidebar) labelSidebar.innerText = `${inputNome.value} ${inputSobrenome.value}`;
    }

    if (inputNome) inputNome.addEventListener('keyup', atualizarVisual);
    if (inputSobrenome) inputSobrenome.addEventListener('keyup', atualizarVisual);
}

function configurarFoto() {
    const inputFoto = document.getElementById('upload-foto');
    if (inputFoto) {
        inputFoto.addEventListener('change', function (evento) {
            const arquivo = evento.target.files[0];
            if (arquivo) {
                const leitor = new FileReader();
                leitor.onload = function (e) {
                    const imgBase64 = e.target.result;
                    const imgAvatar = document.getElementById('avatar-img');
                    if (imgAvatar) imgAvatar.src = imgBase64;
                    localStorage.setItem('solar_avatar', imgBase64);
                }
                leitor.readAsDataURL(arquivo);
            }
        });
    }
}

function configurarAbas() {
    const tabs = document.querySelectorAll('.btn-aba');
    const contents = document.querySelectorAll('.aba-conteudo');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('ativo'));
            tab.classList.add('ativo');
            contents.forEach(c => c.style.display = 'none');

            const targetId = tab.dataset.tab;
            const targetElement = document.getElementById(targetId);
            if (targetElement) targetElement.style.display = 'block';
        });
    });
}

function redirectUser(url) {
    window.location.href = url;
}