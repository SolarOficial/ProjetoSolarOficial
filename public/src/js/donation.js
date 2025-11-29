document.addEventListener("DOMContentLoaded", function () {
  // Quando a página estiver 100% pronta, chame a função Credito()
  Credito();
});

function LimparCredito() {
  document.getElementById("form-pagamento-credito").innerHTML = "";
}

function LimparPix() {
  document.getElementById("form-pagamento-pix").innerHTML = "";
}

function Credito() {
  LimparPix();

  document.getElementById("form-pagamento-credito").innerHTML = `
    <form id="pagamento-credito">

        <div class="alinhar-campo">
        <label for="numero">Número do cartão</label>
        <input 
            type="tel" 
            id="numero" 
            required 
            placeholder="XXXX XXXX XXXX XXXX"
            inputmode="numeric"
            autocomplete="cc-number"
            maxlength="19">
        </div>

        <div class="alinhar-campo">

        <label for="nome">Nome impresso no cartão</label>
        <input 
            type="text" 
            id="nome" 
            required 
            placeholder="Nome Completo"
            autocomplete="cc-name">
        </div>

        <div class="alinhar-botoes">
            <div class="alinhar">
                <label for="vencimento">Vencimento (mês/ano)</label>
                <input 
                    type="text" 
                    id="vencimento" 
                    required 
                    placeholder="MM/AA"
                    pattern="[0-9]{2}/[0-9]{2}"
                    maxlength="5"
                    autocomplete="cc-exp"
                >
            </div>
            
            <div class="alinhar">
                <label for="cvv">CVV</label>
                <input 
                    type="text" 
                    id="cvv" 
                    required 
                    placeholder="123"
                    inputmode="numeric"
                    maxlength="4"
                    autocomplete="cc-csc"
                >
            </div>
        </div>

        <div class="confirmacao">
            <input type="checkbox" id="aceite-termos" required>
            <label for="aceite-termos">
                Concordo com os Termos de Uso e Política de Privacidade. Autorizo o uso dos dados fornecidos para o processamento do pagamento da doação.
            </label>
        </div>

        <div class="centralizar-button">

        <button type="submit" class="btn-confirmar">Confirmar Doação</button>

        </div>
    </form>
  `;
}

function Pix() {
  LimparCredito();

  document.getElementById(
    "form-pagamento-pix"
  ).innerHTML = `<form id="pagamento-pix">

            <p>CÓDIGO PIX</p>          
            

            <div class="coluna-centralizar">
                <h4>00020163737.gov.bdc.pix2606282.....</h4>
                <button>COPIAR CÓDIGO</button>
                <div class="margin">
                    <span>QR CODE</span>
                    <img src="/ProjetoSolarOficial/src/assets/img-donation/qrcode.png" alt="qr code">
                </div>
            </div>

             <div class="confirmacao">
            <input type="checkbox" id="aceite-termos" required>
            <label for="aceite-termos">
                Concordo com os Termos de Uso e Política de Privacidade. Autorizo o uso dos dados fornecidos para o processamento do pagamento da doação.
            </label>
        </div>

        <div class="centralizar-button">

        <button type="submit" class="btn-confirmar">Confirmar Doação</button>
        
        </div>
            
    </form>`;
}

document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".metodo-opcao");

  botoes.forEach((botao) => {
    botao.addEventListener("click", function () {
      // 1. Remove a classe 'ativo' de todos
      botoes.forEach((b) => b.classList.remove("ativo"));

      // 2. Adiciona a classe 'ativo' ao botão clicado
      this.classList.add("ativo");

      // 3. Atualiza o conteúdo (injetando o formulário correto)
      if (this.id === "opcao-cartao") {
        // Aqui você chamaria a função para injetar o formulário de Crédito
        Credito();
      } else if (this.id === "opcao-pix") {
        // Aqui você injetaria o formulário/QR Code do PIX (ex: chamar uma função Pix())
        Pix();
      }
    });
  });
});
