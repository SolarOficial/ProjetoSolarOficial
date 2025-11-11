const form = document.querySelector(".formulario-contato");
const popupOverlay = document.getElementById("popup-overlay");
const fecharPopupButton = document.getElementById("fechar-popup");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    popupOverlay.classList.add("visivel");
});

fecharPopupButton.addEventListener("click", function () {
    popupOverlay.classList.remove("visivel");
    form.reset(); 
});

popupOverlay.addEventListener("click", function (event) {
    if (event.target === popupOverlay) {
        popupOverlay.classList.remove("visivel");
        form.reset();
    }
});