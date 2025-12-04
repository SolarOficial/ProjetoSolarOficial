function abrirModalLogout() {
    const modal = document.getElementById('modalLogout');
    modal.classList.add('ativo');
}

function fecharModalLogout() {
    const modal = document.getElementById('modalLogout');
    modal.classList.remove('ativo');
}

function confirmarSaida() {
    window.fazerLogout();
}