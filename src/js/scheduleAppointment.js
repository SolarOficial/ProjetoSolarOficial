/* "BANCO DE DADOS" DOS PROFISSIONAIS */

const profissionais = {
    'ana': {
        nome: 'Ana Silva',
        cargo: 'Psicóloga Estagiária',
        foto: '/ProjetoSolarOficial/src/assets/img-professionals/Ellipse 9.png',
        sobre: 'Psicóloga clínica formada pela USP, com foco em saúde mental e apoio familiar. Na Solar, atua oferecendo acolhimento psicológico online, com empatia, escuta ativa e cuidado humano.'
    },
    'guilherme': {
        nome: 'Guilherme Soares',
        cargo: 'Psiquiatra Estagiário',
        foto: '/ProjetoSolarOficial/src/assets/img-professionals/Ellipse 9 (1).png',
        sobre: 'Estudante do 10º semestre de Medicina na UNIFESP. Acredita na psiquiatria humanizada, buscando desmistificar o tratamento medicamentoso e cuidar da saúde integral do paciente.'
    },
    'sofia': {
        nome: 'Sofia Martins',
        cargo: 'Nutricionista Estagiária',
        foto: '/ProjetoSolarOficial/src/assets/img-professionals/Ellipse 9 (2).png',
        sobre: 'Cursando Nutrição na UFRJ. Defende uma nutrição sem terrorismo, adaptando a alimentação à realidade financeira e à rotina corrida das mães solo.'
    },
    'lucas': {
        nome: 'Lucas Pereira',
        cargo: 'Psicólogo Estagiário',
        foto: '/ProjetoSolarOficial/src/assets/img-professionals/foto-lucas.jpg',
        sobre: 'Apaixonado pelo comportamento humano (UFMG). Meu foco é ajudar pais e mães a lidarem com a sobrecarga emocional e construírem caminhos mais leves.'
    },
    'beatriz': {
        nome: 'Beatriz Costa',
        cargo: 'Psiquiatra Estagiária',
        foto: '/ProjetoSolarOficial/src/assets/img-professionals/foto-beatriz.jpg',
        sobre: 'Futura médica pela UFPR. Trabalho com foco na escuta atenta do paciente para além dos sintomas, buscando sempre a saúde mental aliada ao bem-estar físico.'
    },
    'juliana': {
        nome: 'Juliana Alves',
        cargo: 'Nutricionista Estagiária',
        foto: '/ProjetoSolarOficial/src/assets/img-professionals/foto-juliana.jpg',
        sobre: 'Estudante da UFBA. Acredito na comida que nutre a alma. Vamos montar um cardápio que caiba no seu bolso e no seu paladar, sem restrições malucas.'
    }
};

/* FUNÇÃO QUE RODA AO CARREGAR A PÁGINA */
document.addEventListener('DOMContentLoaded', () => {
    /* Pega a URL atual (Ex: ...agendamento.html?id=lucas) */
    const params = new URLSearchParams(window.location.search);
    const idProfissional = params.get('id');

    /*  Verifica se tem um ID e se ele existe no nosso "banco de dados" */
    if (idProfissional && profissionais[idProfissional]) {
        const dados = profissionais[idProfissional];

        /* Atualiza os elementos na tela */
        
        // Atualiza Nome
        const elementoNome = document.querySelector('.card-profissional .nome');
        if(elementoNome) elementoNome.textContent = dados.nome;

        // Atualiza Cargo
        const elementoCargo = document.querySelector('.card-profissional .cargo');
        if(elementoCargo) elementoCargo.textContent = dados.cargo;

        // Atualiza Sobre
        const elementoSobre = document.querySelector('.card-profissional .sobre');
        if(elementoSobre) elementoSobre.textContent = dados.sobre;

        // Atualiza Foto
        const elementoFoto = document.querySelector('.card-profissional .foto-profissional');
        if(elementoFoto) {
            elementoFoto.style.backgroundImage = `url('${dados.foto}')`;
        }

        // Atualiza também o nome na Etapa 3 (Confirmação) para já ficar certo
        const confirmacaoProfissional = document.getElementById('conf-profissional');
        if(confirmacaoProfissional) confirmacaoProfissional.textContent = dados.nome;
    }
});

/* AGENDAR CONSULTA */

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