let categorias = [];
let planejamentoAtual = null;
let gastosSelecionados = [];

// Quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarCategorias();
});

// Busca as categorias do backend
async function carregarCategorias() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/categorias');
        categorias = await response.json();
        
        const container = document.getElementById('categorias');
        container.innerHTML = '';
        
        categorias.forEach(cat => {
            const btn = document.createElement('div');
            btn.className = 'categoria-btn';
            
            // Se tiver ícone, mostra a imagem
            // let iconeHTML = '';
            // if (cat.icone) {
            //     iconeHTML = `<img src="/static/img/icons/${cat.icone}" alt="${cat.nome}" class="icone-categoria">`;
            // }
            
            btn.innerHTML = `
                <div class="categoria-header">
                    <img src="/static/img/icons/${cat.icone}" 
                         alt="${cat.nome}" 
                         class="icone-categoria"
                         onerror="this.style.display='none'">
                    <span>${cat.nome}</span class="categoria-nome" >
                </div>
                <input type="text" placeholder="R$ 0,00" 
                       id="valor-${cat.id}">
            `;
            btn.style.borderColor = cat.cor;
            container.appendChild(btn);
        });
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
    }
}

// Gera o planejamento
async function gerarPlanejamento() {
    const renda = parseFloat(document.getElementById('renda').value);
    
    if (!renda || renda <= 0) {
        alert('Por favor, digite sua renda mensal!');
        return;
    }
    
    // Cria o planejamento
    const responsePlanejamento = await fetch('http://127.0.0.1:5000/api/planejamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            renda_mensal: renda,
            mes_ano: new Date().toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' })
        })
    });
    
    const planejamento = await responsePlanejamento.json();
    planejamentoAtual = planejamento.id;
    
    // Adiciona os gastos
    gastosSelecionados = [];
    let totalGastos = 0;
    
    for (let cat of categorias) {
        const valorInput = document.getElementById(`valor-${cat.id}`);
        const valor = parseFloat(valorInput.value);
        
        if (valor && valor > 0) {
            await fetch('http://127.0.0.1:5000/api/gasto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planejamento_id: planejamentoAtual,
                    categoria_id: cat.id,
                    valor: valor
                })
            });
            
            gastosSelecionados.push({
                categoria: cat.nome,
                cor: cat.cor,
                valor: valor,
                icone: cat.icone
            });
            
            totalGastos += valor;
        }
    }
    
    // Atualiza a tela
    atualizarResumo(renda, totalGastos);
    criarGrafico(gastosSelecionados);
    criarListaGastos(gastosSelecionados);
}

// Atualiza os cards de resumo
function atualizarResumo(renda, gastos) {
    const saldo = renda - gastos;
    
    // Atualiza os valores
    document.getElementById('rendaTotal').textContent = `R$ ${renda.toFixed(2)}`;
    document.getElementById('gastosTotal').textContent = `R$ ${gastos.toFixed(2)}`;
    document.getElementById('saldoTotal').textContent = `R$ ${saldo.toFixed(2)}`;
    
    // Pega o elemento do saldo
    const saldoElemento = document.getElementById('saldoTotal');
    const gastosElemento = document.getElementById('gastosTotal');
    
    // Remove classes anteriores
    saldoElemento.classList.remove('saldo-positivo', 'saldo-negativo');
    gastosElemento.classList.remove('gasto-alerta');
    
    // Adiciona classe baseado na condição
    if (gastos > renda) {
        saldoElemento.classList.add('saldo-negativo');
        gastosElemento.classList.add('gasto-alerta');
    } else {
        saldoElemento.classList.add('saldo-positivo');
    }
}

// Cria o gráfico de pizza
function criarGrafico(gastos) {
    const ctx = document.getElementById('graficoGastos').getContext('2d');
    
    // Destroi gráfico anterior se existir
    if (window.grafico) {
        window.grafico.destroy();
    }
    
    window.grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: gastos.map(g => g.categoria),
            datasets: [{
                data: gastos.map(g => g.valor),
                backgroundColor: gastos.map(g => g.cor)
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Cria a lista de gastos
function criarListaGastos(gastos) {
    const container = document.getElementById('listaGastos');
    container.innerHTML = '<h3>Distribuição dos Gastos</h3>';
    
    gastos.forEach(gasto => {
        const item = document.createElement('div');
        item.className = 'item-gasto';
        item.innerHTML = `
            <div class="nome">
                <div class="cor-indicador" style="background: ${gasto.cor}"></div>
                <span>${gasto.categoria}</span>
            </div>
            <strong>R$ ${gasto.valor.toFixed(2)}</strong>
        `;
        container.appendChild(item);
    });
}