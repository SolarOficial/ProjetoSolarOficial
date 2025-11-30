// O listener principal do DOMContentLoaded encapsula toda a lógica que depende da estrutura da página.
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o formulário de Crédito na carga da página, e marca o botão como 'ativo'
  const botaoCartao = document.getElementById("opcao-cartao");
  if (botaoCartao) {
    botaoCartao.classList.add("ativo");
    Credito();
  }

  // --- LÓGICA DO POP-UP DE CONFIRMAÇÃO (elementos estáticos) ---
  const popupConfirmacao = document.getElementById("popup-confirmacao");

  // Direcionar para Início
  document
    .getElementById("btn-voltar-inicio")
    .addEventListener("click", function () {
      if (popupConfirmacao) popupConfirmacao.style.display = "none";
      window.location.href = "../../../../index.html";
    });

  // Direcionar para "Minha Agenda"
  document
    .getElementById("btn-minha-agenda")
    .addEventListener("click", function () {
      if (popupConfirmacao) popupConfirmacao.style.display = "none";
      // window.location.href = 'sua-agenda.html';
    });

  // Fecha o pop-up ao clicar fora dele
  if (popupConfirmacao) {
    popupConfirmacao.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
      }
    });
  }

  // --- LÓGICA DE TROCA DE MÉTODOS DE PAGAMENTO ---
  const botoesMetodo = document.querySelectorAll(".metodo-opcao");

  botoesMetodo.forEach((botao) => {
    botao.addEventListener("click", function () {
      // 1. Remove a classe 'ativo' de todos
      botoesMetodo.forEach((b) => b.classList.remove("ativo"));

      // 2. Adiciona a classe 'ativo' ao botão clicado
      this.classList.add("ativo");

      // 3. Atualiza o conteúdo (injetando o formulário correto)
      if (this.id === "opcao-cartao") {
        Credito();
      } else if (this.id === "opcao-pix") {
        Pix();
      }
    });
  });

  // O código original abaixo foi removido/ajustado pois o listener de submit
  // deve estar dentro das funções Credito() e Pix() para funcionar em formulários dinâmicos.
  /*
    document
        .getElementById("btn-confirmar-agendamento")
        .addEventListener("click", function (e) { ... });
    */
});

// --- FUNÇÕES DE LIMPEZA ---
function LimparCredito() {
  const container = document.getElementById("form-pagamento-credito");
  if (container) container.innerHTML = "";
}

function LimparPix() {
  const container = document.getElementById("form-pagamento-pix");
  if (container) container.innerHTML = "";
}

// --- FUNÇÃO DE PAGAMENTO COM CRÉDITO ---
function Credito() {
  LimparPix();

  const containerCredito = document.getElementById("form-pagamento-credito");
  if (!containerCredito) return;

  containerCredito.innerHTML = `
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
                <input type="checkbox" id="aceite-termos-credito" required>
                <label for="aceite-termos-credito">
                    Concordo com os Termos de Uso e Política de Privacidade. Autorizo o uso dos dados fornecidos para o processamento do pagamento da doação.
                </label>
            </div>

            <div class="centralizar-button">
                <button type="submit" class="btn-confirmar">Confirmar Doação</button>
            </div>
        </form>
    `;

  // ANEXA O EVENT LISTENER APÓS A INJEÇÃO DO HTML
  const formCredito = document.getElementById("pagamento-credito");
  const popupConfirmacao = document.getElementById("popup-confirmacao");

  if (formCredito) {
    formCredito.addEventListener("submit", function (e) {
      e.preventDefault(); // Impede o envio padrão do formulário
      if (popupConfirmacao) {
        popupConfirmacao.style.display = "flex"; // Abre o pop-up
      }
    });
  }
}

// --- FUNÇÃO DE PAGAMENTO COM PIX ---
function Pix() {
  LimparCredito();

  const containerPix = document.getElementById("form-pagamento-pix");
  if (!containerPix) return;

  containerPix.innerHTML = `<form id="pagamento-pix">

            <p>CÓDIGO PIX</p>            
            
            <div class="coluna-centralizar">
                <h4>00020163737.gov.bdc.pix2606282.....</h4>
                <button type="button">COPIAR CÓDIGO</button>
                <div class="margin">
                    <span>QR CODE</span>
                    <img src="../../assets/img-donation/qrcode.png" alt="qr code">
                </div>
            </div>

             <div class="confirmacao">
                <input type="checkbox" id="aceite-termos-pix" required>
                <label for="aceite-termos-pix">
                    Concordo com os Termos de Uso e Política de Privacidade. Autorizo o uso dos dados fornecidos para o processamento do pagamento da doação.
                </label>
            </div>

            <div class="centralizar-button">
                <button type="submit" class="btn-confirmar">Confirmar Doação</button>
            </div>
            
    </form>`;

  // ANEXA O EVENT LISTENER APÓS A INJEÇÃO DO HTML
  const formPix = document.getElementById("pagamento-pix");
  const popupConfirmacao = document.getElementById("popup-confirmacao");

  if (formPix) {
    formPix.addEventListener("submit", function (e) {
      e.preventDefault(); // Impede o envio padrão do formulário
      if (popupConfirmacao) {
        popupConfirmacao.style.display = "flex"; // Abre o pop-up
      }
    });
  }
}
