document.addEventListener("DOMContentLoaded", function () {
  // MÁSCARAS
  function mascaraCPF(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .substring(0, 14); // Limite máximo de caracteres
  }

  function mascaraTelefone(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  }

  function mascaraCartao(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .substring(0, 19);
  }

  function mascaraVencimento(valor) {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, "");

    // Se tiver mais de 2 números, adiciona a barra
    if (apenasNumeros.length > 2) {
      return (
        apenasNumeros.substring(0, 2) + "/" + apenasNumeros.substring(2, 4)
      );
    } else {
      return apenasNumeros;
    }
  }

  function mascaraCVV(valor) {
    return valor.replace(/\D/g, "").substring(0, 3);
  }

  document.addEventListener("input", function (e) {
    const id = e.target.id;

    if (id === "cpf") e.target.value = mascaraCPF(e.target.value);
    if (id === "telefone") e.target.value = mascaraTelefone(e.target.value);
    if (id === "numero") e.target.value = mascaraCartao(e.target.value);
    if (id === "vencimento") e.target.value = mascaraVencimento(e.target.value);
    if (id === "cvv") e.target.value = mascaraCVV(e.target.value);
  });

  // VALIDAÇÃO EM TEMPO REAL DA DATA DE VENCIMENTO
  document.addEventListener("blur", function (e) {
    if (e.target.id === "vencimento") {
      validarDataCartao(e.target);
    }
  });

  document.addEventListener("input", function (e) {
    if (e.target.id === "vencimento") {
      // Validação enquanto digita - mês
      const valor = e.target.value;
      const apenasNumeros = valor.replace(/\D/g, "");

      // Se já digitou o mês, verifica se é válido
      if (apenasNumeros.length >= 2) {
        const mes = parseInt(apenasNumeros.substring(0, 2));
        if (mes > 12 || mes < 1) {
          // Limita automaticamente para 12
          e.target.value = "12/" + (apenasNumeros.substring(2) || "");
        }
      }
    }
  });

  // FUNÇÃO PARA SELECIONAR APENAS UM VALOR
  function configurarBotoesValor() {
    const botoesValor = document.querySelectorAll(".valores");
    const outroValorInput = document.getElementById("outro-valor-input");

    botoesValor.forEach((botao) => {
      botao.addEventListener("click", function () {
        botoesValor.forEach((b) => b.classList.remove("selecionado"));

        this.classList.add("selecionado");

        if (outroValorInput) {
          outroValorInput.value = "";
        }
      });
    });

    if (outroValorInput) {
      outroValorInput.addEventListener("input", function () {
        botoesValor.forEach((b) => b.classList.remove("selecionado"));
      });
    }
  }

  // Inicializar a lógica dos botões de valor
  configurarBotoesValor();

  const botaoCartao = document.getElementById("opcao-cartao");
  if (botaoCartao) {
    botaoCartao.classList.add("ativo");
    Credito();
  }

  const popupConfirmacao = document.getElementById("popup-confirmacao");

  document
    .getElementById("btn-voltar-inicio")
    .addEventListener("click", function () {
      if (popupConfirmacao) popupConfirmacao.style.display = "none";
      window.location.href = "../../../../index.html";
    });

  document
    .getElementById("btn-minha-agenda")
    .addEventListener("click", function () {
      if (popupConfirmacao) popupConfirmacao.style.display = "none";
    });

  if (popupConfirmacao) {
    popupConfirmacao.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none";
      }
    });
  }

  const botoesMetodo = document.querySelectorAll(".metodo-opcao");

  botoesMetodo.forEach((botao) => {
    botao.addEventListener("click", function () {
      botoesMetodo.forEach((b) => b.classList.remove("ativo"));
      this.classList.add("ativo");

      if (this.id === "opcao-cartao") {
        Credito();
      } else if (this.id === "opcao-pix") {
        Pix();
      }
    });
  });
});

// LIMPEZA
function LimparCredito() {
  const container = document.getElementById("form-pagamento-credito");
  if (container) container.innerHTML = "";
}

function LimparPix() {
  const container = document.getElementById("form-pagamento-pix");
  if (container) container.innerHTML = "";
}

// FUNÇÃO PARA LIMPAR TODOS OS DADOS DO FORMULÁRIO
function limparTodosDados() {
  console.log("Limpando todos os dados do formulário...");

  // Dados pessoais
  const camposPessoais = ["nome-pessoal", "email", "cpf", "telefone"];

  camposPessoais.forEach((id) => {
    const campo = document.getElementById(id);
    if (campo) campo.value = "";
  });

  const botoesValor = document.querySelectorAll(".valores");
  botoesValor.forEach((botao) => {
    botao.classList.remove("selecionado");
  });

  const outroValorInput = document.getElementById("outro-valor-input");
  if (outroValorInput) {
    outroValorInput.value = "";
  }

  // Dados do cartão
  const camposCartao = ["numero", "nome", "vencimento", "cvv"];
  camposCartao.forEach((id) => {
    const campo = document.getElementById(id);
    if (campo) campo.value = "";
  });

  const checkboxes = ["aceite-termos-credito", "aceite-termos-pix"];

  checkboxes.forEach((id) => {
    const checkbox = document.getElementById(id);
    if (checkbox) checkbox.checked = false;
  });

  const botoesMetodo = document.querySelectorAll(".metodo-opcao");
  botoesMetodo.forEach((botao) => {
    botao.classList.remove("ativo");
  });

  const botaoCartao = document.getElementById("opcao-cartao");
  if (botaoCartao) {
    botaoCartao.classList.add("ativo");
    Credito();
  }

  console.log("Dados limpos com sucesso!");
}

// FUNÇÃO PARA VALIDAR DATA DO CARTÃO
function validarDataCartao(input) {
  const valor = input.value;
  const apenasNumeros = valor.replace(/\D/g, "");

  if (apenasNumeros.length < 4) {
    alert("Data de vencimento inválida. Formato correto: MM/AA");
    input.focus();
    return false;
  }

  const mes = parseInt(apenasNumeros.substring(0, 2));
  const ano = parseInt(apenasNumeros.substring(2, 4));
  const anoCompleto = 2000 + ano;

  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  const mesAtual = dataAtual.getMonth() + 1;

  if (mes < 1 || mes > 12) {
    alert("Mês inválido. O mês deve estar entre 01 e 12.");
    input.value = "";
    input.focus();
    return false;
  }

  if (anoCompleto < anoAtual) {
    alert("O ano do cartão está expirado.");
    input.focus();
    return false;
  }

  if (anoCompleto === anoAtual && mes < mesAtual) {
    alert("O mês do cartão já expirou.");
    input.focus();
    return false;
  }

  return true;
}

// CARTÃO
function Credito() {
  LimparPix();

  const containerCredito = document.getElementById("form-pagamento-credito");
  if (!containerCredito) return;

  containerCredito.innerHTML = `
        <form id="pagamento-credito">

            <div class="alinhar-campo">
                <label for="numero">Número do cartão</label>
                <input type="tel" id="numero" required placeholder="XXXX XXXX XXXX XXXX" maxlength="19">
            </div>

            <div class="alinhar-campo">
                <label for="nome">Nome impresso no cartão</label>
                <input type="text" id="nome" required placeholder="Nome Completo">
            </div>

            <div class="alinhar-botoes">
                <div class="alinhar">
                    <label for="vencimento">Vencimento (mês/ano)</label>
                    <input type="text" id="vencimento" required placeholder="MM/AA" maxlength="5">
                    <small class="texto-ajuda">Exemplo: 12/25 (dezembro de 2025)</small>
                </div>

                <div class="alinhar">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" required placeholder="123" maxlength="3">
                </div>
            </div>

            <div class="confirmacao">
                <input type="checkbox" id="aceite-termos-credito" required>
                <label for="aceite-termos-credito">
                    Concordo com os Termos de Uso e Política de Privacidade.
                </label>
            </div>

            <div class="centralizar-button">
                <button type="submit" class="btn-confirmar">Confirmar Doação</button>
            </div>

        </form>
  `;

  const formCredito = document.getElementById("pagamento-credito");
  const popupConfirmacao = document.getElementById("popup-confirmacao");

  if (formCredito) {
    formCredito.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validarDadosPessoais()) return;
      if (!validarValorDoacao()) return;

      // Valida os campos do cartão
      const numeroCartao =
        document.getElementById("numero")?.value.replace(/\s/g, "") || "";
      const nomeCartao = document.getElementById("nome")?.value.trim() || "";
      const vencimento =
        document.getElementById("vencimento")?.value.trim() || "";
      const cvv = document.getElementById("cvv")?.value.trim() || "";

      if (!numeroCartao || numeroCartao.length < 16) {
        alert("Número do cartão inválido.");
        return;
      }

      if (!nomeCartao) {
        alert("Nome do cartão é obrigatório.");
        return;
      }

      if (!validarDataCartao(document.getElementById("vencimento"))) {
        return;
      }

      if (!cvv || cvv.length < 3) {
        alert("CVV inválido.");
        return;
      }

      // Mostra o popup de confirmação
      popupConfirmacao.style.display = "flex";

      setTimeout(limparTodosDados, 100);
    });
  }
}

// PIX
function Pix() {
  LimparCredito();

  const containerPix = document.getElementById("form-pagamento-pix");
  if (!containerPix) return;

  containerPix.innerHTML = `
        <form id="pagamento-pix">

            <p>CÓDIGO PIX</p>

            <div class="coluna-centralizar">
                <h4>00020163737.gov.bdc.pix2606282.....</h4>
                <button type="button" id="btn-copiar-pix">COPIAR CÓDIGO</button>
                <div class="margin">
                    <span>QR CODE</span>
                    <img src="../../assets/img-donation/qrcode.png" alt="qr code">
                </div>
            </div>

            <div class="confirmacao">
                <input type="checkbox" id="aceite-termos-pix" required>
                <label for="aceite-termos-pix">
                    Concordo com os Termos de Uso e Política de Privacidade.
                </label>
            </div>

            <div class="centralizar-button">
                <button type="submit" class="btn-confirmar">Confirmar Doação</button>
            </div>

        </form>
  `;

  // Adicionar funcionalidade de copiar código PIX
  const btnCopiarPix = document.getElementById("btn-copiar-pix");
  if (btnCopiarPix) {
    btnCopiarPix.addEventListener("click", function () {
      const codigoPix = "00020163737.gov.bdc.pix2606282.....";
      navigator.clipboard.writeText(codigoPix).then(
        function () {
          const textoOriginal = this.textContent;
          this.textContent = "CÓDIGO COPIADO!";
          this.style.backgroundColor = "#4CAF50";

          setTimeout(() => {
            this.textContent = textoOriginal;
            this.style.backgroundColor = "";
          }, 2000);
        }.bind(this)
      );
    });
  }

  const formPix = document.getElementById("pagamento-pix");
  const popupConfirmacao = document.getElementById("popup-confirmacao");

  if (formPix) {
    formPix.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validarDadosPessoais()) return;
      if (!validarValorDoacao()) return;

      // Mostra o popup de confirmação
      popupConfirmacao.style.display = "flex";

      setTimeout(limparTodosDados, 100);
    });
  }
}

// VALIDAÇÃO DOS DADOS PESSOAIS
function validarDadosPessoais() {
  const nome = document.getElementById("nome-pessoal")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const cpf = document.getElementById("cpf")?.value.trim() || "";
  const telefone = document.getElementById("telefone")?.value.trim() || "";

  if (!nome || !email || !cpf || !telefone) {
    alert("Por favor, preencha Nome, E-mail, CPF e Telefone.");
    return false;
  }

  const cpfNumeros = cpf.replace(/\D/g, "");
  if (cpfNumeros.length !== 11) {
    alert("CPF inválido. Deve conter 11 dígitos.");
    return false;
  }

  const telefoneNumeros = telefone.replace(/\D/g, "");
  if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
    alert("Telefone inválido. Deve conter 10 ou 11 dígitos.");
    return false;
  }

  return true;
}

// VALIDAÇÃO DO VALOR DA DOAÇÃO
function validarValorDoacao() {
  const botoes = document.querySelectorAll(".valores");
  const outroValorInput = document.getElementById("outro-valor-input");

  const botaoSelecionado = document.querySelector(".valores.selecionado");

  const outroValor = outroValorInput?.value.trim() || "";

  if (!botaoSelecionado && !outroValor) {
    alert("Por favor, selecione um valor.");
    return false;
  }

  if (outroValor) {
    const valorNumerico = parseFloat(outroValor.replace(",", "."));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Informe um valor válido.");
      return false;
    }
  }

  return true;
}
