const botoes = document.querySelectorAll(".valores");

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    // remove "selecionado" do botão
    botoes.forEach((btn) => btn.classList.remove("selecionado"));

    // adiciona no clicado
    botao.classList.add("selecionado");
  });
});
