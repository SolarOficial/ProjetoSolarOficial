function abrirPopup(event) {
    const form = document.querySelector('form');
    if (form.checkValidity()) {
        event.preventDefault();
        document.getElementById('modalSucesso').style.display = 'flex';
    } else {
        form.reportValidity();
    }
}

function abrirPopupRecuperacao(event) {
    event.preventDefault();
    document.getElementById('modalRecuperacao').style.display = 'flex';
}

function fecharPopupRecuperacao() {
    document.getElementById('modalRecuperacao').style.display = 'none';
}

function prosseguirRecuperacao() {
    const inputEmail = document.querySelector('#modalRecuperacao input');
    if (inputEmail.checkValidity()) {
        document.getElementById('modalRecuperacao').style.display = 'none';
        document.getElementById('modalSucesso').style.display = 'flex';
    } else {
        inputEmail.reportValidity();
        inputEmail.focus();
    }
}
