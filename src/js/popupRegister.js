function abrirPopup(event) {
    const form = document.querySelector('form');

    if (form.checkValidity()) {
        event.preventDefault();
        const popup = document.getElementById('modalSucesso');
        popup.style.display = 'flex';
    } else {
    }
}