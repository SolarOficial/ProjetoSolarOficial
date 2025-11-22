document.addEventListener("DOMContentLoaded", () => {

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

  const datas = document.querySelectorAll(".data-box");
  const horarios = document.querySelectorAll(".hora-box");

  let dataSelecionada = "";
  let horaSelecionada = "";

  function mostrarEtapa(index) {
    etapas.forEach((et, i) => {
      et.style.display = i === index ? "block" : "none";
    });

    steps.forEach((st, i) => {
      st.classList.toggle("active", i === index);
    })
  }

  mostrarEtapa(etapaAtual);

  btnProximo.forEach(btn => {
    btn.addEventListener("click", () => {
      if (etapaAtual < etapas.length - 1) {
        etapaAtual++;
        mostrarEtapa(etapaAtual);
      }

      if (etapaAtual === 2) {
        const nome = document.querySelector("input[type='text']").value;
        const email = document.querySelector("input[type='email']").value;
        const telefone = document.querySelector("input[placeholder='(11) 99999-9999']").value;

        confNome.textContent = nome || "-";
        confEmail.textContent = email || "-";
        confTelefone.textContent = telefone || "-";
        confData.textContent = dataSelecionada || "-";
        confHora.textContent = horaSelecionada || "-";
      }
    });
  });

  btnVoltar.forEach(btn => {
    btn.addEventListener("click", () => {
      if (etapaAtual > 0) {
        etapaAtual--;
        mostrarEtapa(etapaAtual);
      }
    });
  });

// seletor datas
datas.forEach(data => {
  data.addEventListener("click", () => {
    datas.forEach(d => d.classList.remove("ativo"));
    data.classList.add("ativo");

    const dia = data.firstChild.textContent.trim();

    const span = data.querySelector("span");
    const mesSemana = span ? span.innerText.replace(/\n/g, ' ').trim() : "";

    dataSelecionada = `${dia} ${mesSemana}`;
    });
  });

// seleção de horários
  horarios.forEach(h => {
    h.addEventListener("click", () => {
      horarios.forEach(hr => hr.classList.remove("ativo"));
      h.classList.add("ativo");
      horaSelecionada = h.textContent.trim();
    });
  });

});

// Seleção Data e Horário

document.addEventListener('DOMContentLoaded', function() {
  const dataBoxes = document.querySelectorAll('.data-box');
  const horaBoxes = document.querySelectorAll('.hora-box');
  
  // Seleção de datas
  dataBoxes.forEach(box => {
    box.addEventListener('click', function() {
      dataBoxes.forEach(b => b.classList.remove('selecionado'));
      this.classList.add('selecionado');
    });
  });
  
  // Seleção de horários
  horaBoxes.forEach(box => {
    box.addEventListener('click', function() {
      horaBoxes.forEach(b => b.classList.remove('selecionado'));
      this.classList.add('selecionado');
    });
  });
});

// Pop-up de Confirmação
document.addEventListener('DOMContentLoaded', function() {
  // Mostra pop-up ao confirmar
  document.getElementById('btn-confirmar-agendamento').addEventListener('click', function() {
    document.getElementById('popup-confirmacao').style.display = 'flex';
  });
  
  // Direcionar para Início
  document.getElementById('btn-voltar-inicio').addEventListener('click', function() {
    document.getElementById('popup-confirmacao').style.display = 'none';
  });
  
  // Direcionar para "Minha Agenda"
  document.getElementById('btn-minha-agenda').addEventListener('click', function() {
    document.getElementById('popup-confirmacao').style.display = 'none';
  });
  
  // Fecha o pop-up 
  document.getElementById('popup-confirmacao').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
});