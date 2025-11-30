/* "BANCO DE DADOS" DOS PROFISSIONAIS */
const profissionais = {
  ana: {
    nome: "Ana Silva",
    cargo: "Psicóloga Estagiária",
    foto: "../../../assets/img-professionals/Ellipse 9.png",
    sobre:
      "Psicóloga clínica formada pela USP, com foco em saúde mental e apoio familiar. Na Solar, atua oferecendo acolhimento psicológico online, com empatia, escuta ativa e cuidado humano.",
  },
  guilherme: {
    nome: "Guilherme Soares",
    cargo: "Psiquiatra Estagiário",
    foto: "../../../assets/img-professionals/Ellipse 9 (1).png",
    sobre:
      "Estudante do 10º semestre de Medicina na UNIFESP. Acredita na psiquiatria humanizada, buscando desmistificar o tratamento medicamentoso e cuidar da saúde integral do paciente.",
  },
  sofia: {
    nome: "Sofia Martins",
    cargo: "Nutricionista Estagiária",
    foto: "../../../assets/img-professionals/Ellipse 9 (2).png",
    sobre:
      "Cursando Nutrição na UFRJ. Defende uma nutrição sem terrorismo, adaptando a alimentação à realidade financeira e à rotina corrida das mães solo.",
  },
  lucas: {
    nome: "Lucas Pereira",
    cargo: "Psicólogo Estagiário",
    foto: "../../../assets/img-professionals/foto-lucas.jpg",
    sobre:
      "Apaixonado pelo comportamento humano (UFMG). Meu foco é ajudar pais e mães a lidarem com a sobrecarga emocional e construírem caminhos mais leves.",
  },
  beatriz: {
    nome: "Beatriz Costa",
    cargo: "Psiquiatra Estagiária",
    foto: "../../../assets/img-professionals/foto-beatriz.jpg",
    sobre:
      "Futura médica pela UFPR. Trabalho com foco na escuta atenta do paciente para além dos sintomas, buscando sempre a saúde mental aliada ao bem-estar físico.",
  },
  juliana: {
    nome: "Juliana Alves",
    cargo: "Nutricionista Estagiária",
    foto: "../../../assets/img-professionals/foto-juliana.jpg",
    sobre:
      "Estudante da UFBA. Acredito na comida que nutre a alma. Vamos montar um cardápio que caiba no seu bolso e no seu paladar, sem restrições malucas.",
  },
};

/* --- DECLARAÇÃO DA VARIÁVEL NO ESCOPO GLOBAL --- */
let profissionalAtual = null;

/* AGENDAR CONSULTA */
const etapas = document.querySelectorAll(".etapa");
const steps = document.querySelectorAll(".step");
let etapaAtual = 0;
const btnProximo = document.querySelectorAll(".btn-proximo");
const btnVoltar = document.querySelectorAll(".btn-voltar");
const confNome = document.getElementById("conf-nome");
const confEmail = document.getElementById("conf-email");
const confTelefone = document.getElementById("conf-telefone");
const confData = document.getElementById("conf-data");
const confHora = document.getElementById("conf-hora");
const confProfissional = document.getElementById("conf-profissional");
const confModalidade = document.getElementById("conf-modalidade");
const datas = document.querySelectorAll(".data-box");
const horarios = document.querySelectorAll(".hora-box");
let dataSelecionada = "";
let horaSelecionada = "";
let modalidadeSelecionada = "Online"; // Valor padrão

/* FUNÇÕES DE VALIDAÇÃO */
function mostrarEtapa(index) {
  etapas.forEach((et, i) => {
    et.style.display = i === index ? "block" : "none";
  });
  steps.forEach((st, i) => {
    st.classList.toggle("active", i === index);
  });
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefone(telefone) {
  // Remove caracteres não numéricos
  const numeroLimpo = telefone.replace(/\D/g, "");
  return numeroLimpo.length >= 10 && numeroLimpo.length <= 11;
}

function mostrarErro(seletor, mensagem) {
  const elemento = document.querySelector(seletor);
  const elementoPai =
    elemento.closest(".form-content") || elemento.parentElement;
  // Verifica se já existe uma mensagem de erro para evitar duplicidade
  if (elementoPai.querySelector(".erro-validacao")) return;

  const erro = document.createElement("div");
  erro.className = "erro-validacao";
  erro.style.color = "red";
  erro.style.fontSize = "12px";
  erro.style.marginTop = "5px";
  erro.textContent = mensagem;
  elementoPai.appendChild(erro);

  // Destaca o campo com erro
  elemento.style.borderColor = "red";

  setTimeout(() => {
    elemento.style.borderColor = "";
  }, 3000);
}

function validarEtapa1() {
  // Remove mensagens de erro anteriores
  document.querySelectorAll(".erro-validacao").forEach((el) => el.remove());
  let valido = true;

  // Seletores mais robustos para os inputs
  const nomeInput = document.querySelector(".etapa-1 input[type='text']");
  const emailInput = document.querySelector(".etapa-1 input[type='email']");
  const telefoneInput = document.querySelector(
    ".etapa-1 input[placeholder='(11) 99999-9999']"
  );

  const nome = nomeInput ? nomeInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const telefone = telefoneInput ? telefoneInput.value.trim() : "";

  if (!nome) {
    mostrarErro(
      ".etapa-1 input[type='text']",
      "Por favor, preencha seu nome completo"
    );
    valido = false;
  }
  if (!email) {
    mostrarErro(
      ".etapa-1 input[type='email']",
      "Por favor, preencha seu e-mail"
    );
    valido = false;
  } else if (!validarEmail(email)) {
    mostrarErro(
      ".etapa-1 input[type='email']",
      "Por favor, insira um e-mail válido"
    );
    valido = false;
  }
  if (!telefone) {
    mostrarErro(
      ".etapa-1 input[placeholder='(11) 99999-9999']",
      "Por favor, preencha seu telefone"
    );
    valido = false;
  } else if (!validarTelefone(telefone)) {
    mostrarErro(
      ".etapa-1 input[placeholder='(11) 99999-9999']",
      "Por favor, insira um telefone válido"
    );
    valido = false;
  }
  return valido;
}

function validarEtapa2() {
  // Remove mensagens de erro anteriores
  document.querySelectorAll(".erro-validacao").forEach((el) => el.remove());
  let valido = true;

  if (!dataSelecionada) {
    mostrarErro(".datas-grid", "Por favor, selecione uma data");
    valido = false;
  }
  if (!horaSelecionada) {
    // Seletor para o grid de horários
    mostrarErro(".horarios-grid", "Por favor, selecione um horário");
    valido = false;
  }
  return valido;
}

function atualizarConfirmacao() {
  const nome =
    document.querySelector(".etapa-1 input[type='text']")?.value || "";
  const email =
    document.querySelector(".etapa-1 input[type='email']")?.value || "";
  const telefone =
    document.querySelector(".etapa-1 input[placeholder='(11) 99999-9999']")
      ?.value || "";

  console.log("Atualizando confirmação...");

  if (confNome) confNome.textContent = nome || "-";
  if (confEmail) confEmail.textContent = email || "-";
  if (confTelefone) confTelefone.textContent = telefone || "-";
  if (confData) confData.textContent = dataSelecionada || "-";
  if (confHora) confHora.textContent = horaSelecionada || "-";
  if (confModalidade) confModalidade.textContent = modalidadeSelecionada || "-";
  if (confProfissional && profissionalAtual) {
    confProfissional.textContent = profissionalAtual.nome;
    console.log("Profissional na confirmação:", profissionalAtual.nome);
  } else {
    console.log(
      "Elemento confProfissional não encontrado ou profissionalAtual vazio"
    );
    if (confProfissional) confProfissional.textContent = "Não Encontrado";
  }
}

/* FUNÇÃO */
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idProfissional = params.get("id");

  /* Verifica se tem um ID e se ele existe no nosso "banco de dados" */
  if (idProfissional && profissionais[idProfissional]) {
    // ATRIBUIÇÃO à variável que está no escopo superior
    profissionalAtual = profissionais[idProfissional];
    const dados = profissionalAtual;
    console.log("Profissional carregado:", dados.nome);

    /* Atualiza os elementos na tela */
    // Atualiza Nome
    const elementoNome = document.querySelector(".card-profissional .nome");
    if (elementoNome) elementoNome.textContent = dados.nome;
    // Atualiza Cargo
    const elementoCargo = document.querySelector(".card-profissional .cargo");
    if (elementoCargo) elementoCargo.textContent = dados.cargo;
    // Atualiza Sobre
    const elementoSobre = document.querySelector(".card-profissional .sobre");
    if (elementoSobre) elementoSobre.textContent = dados.sobre;
    // Atualiza Foto
    const elementoFoto = document.querySelector(
      ".card-profissional .foto-profissional"
    );
    if (elementoFoto) {
      elementoFoto.style.backgroundImage = `url('${dados.foto}')`;
    }

    const confirmacaoProfissional =
      document.getElementById("conf-profissional");
    if (confirmacaoProfissional) {
      confirmacaoProfissional.textContent = dados.nome;
      console.log(
        "Nome do profissional atualizado na confirmação inicial:",
        dados.nome
      );
    } else {
      console.log("Elemento conf-profissional não encontrado");
    }
  } else {
    console.log("Profissional não encontrado para ID:", idProfissional);
  }

  /* LÓGICA DE NAVEGAÇÃO ENTRE ETAPAS */
  mostrarEtapa(etapaAtual);

  btnProximo.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let podeAvancar = true;

      // Valida a etapa atual antes de avançar
      if (etapaAtual === 0) {
        podeAvancar = validarEtapa1();
      } else if (etapaAtual === 1) {
        podeAvancar = validarEtapa2();
      }

      if (podeAvancar && etapaAtual < etapas.length - 1) {
        etapaAtual++;
        mostrarEtapa(etapaAtual);
        // Atualiza a confirmação quando chegar na etapa 3
        if (etapaAtual === 2) {
          atualizarConfirmacao();
        }
      }
    });
  });

  btnVoltar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (etapaAtual > 0) {
        etapaAtual--;
        mostrarEtapa(etapaAtual);
      }
    });
  });

  /* SELEÇÃO DE DATAS */
  datas.forEach((data) => {
    data.addEventListener("click", () => {
      datas.forEach((d) => d.classList.remove("ativo", "selecionado"));
      data.classList.add("ativo", "selecionado");
      const dia = data.firstChild.textContent.trim();
      const span = data.querySelector("span");
      const mesSemana = span ? span.innerText.replace(/\n/g, " ").trim() : "";
      dataSelecionada = `${dia} ${mesSemana}`;
      const erroData = document.querySelector(".datas-grid + .erro-validacao");
      if (erroData) erroData.remove();
    });
  });

  /* SELEÇÃO DE HORÁRIOS */
  horarios.forEach((h) => {
    h.addEventListener("click", () => {
      horarios.forEach((hr) => hr.classList.remove("ativo", "selecionado"));
      h.classList.add("ativo", "selecionado");
      horaSelecionada = h.textContent.trim();
      const erroHora = document.querySelector(
        ".horarios-grid + .erro-validacao"
      );
      if (erroHora) erroHora.remove();
    });
  });

  /* POP-UP DE CONFIRMAÇÃO */
  const popupConfirmacao = document.getElementById("popup-confirmacao");

  document
    .getElementById("btn-confirmar-agendamento")
    .addEventListener("click", function (e) {
      e.preventDefault();
      if (popupConfirmacao) {
        popupConfirmacao.style.display = "flex";
      }
    });

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

    // MÁSCARA DE TELEFONE
   const telefoneInput = document.querySelector(".etapa-1 input[placeholder='(11) 99999-9999']");

if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, ''); // permite apenas dígitos
        if (valor.length > 11) valor = valor.slice(0, 11);

        const cursorPos = e.target.selectionStart;
        const digitosAntesCursor = e.target.value.slice(0, cursorPos).replace(/\D/g, '').length;

        // Formata o valor
        if (valor.length > 10) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (valor.length > 5) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else if (valor.length > 0) {
            valor = valor.replace(/^(\d*)$/, '($1');
        }

        e.target.value = valor;

        let novaPos = valor.length;
        let cont = 0;
        for (let i = 0; i < valor.length && cont < digitosAntesCursor; i++) {
            if (/\d/.test(valor[i])) cont++;
            novaPos = i + 1;
        }

        e.target.selectionStart = e.target.selectionEnd = novaPos;
    });
}

  }
});
