// --- CÓDIGO COMPLETO PARA O JOGO DE ARRASTAR E SOLTAR ---

// 1. SELETORES DOS ELEMENTOS HTML
const gameContainer = document.querySelector('.game-container');
const instructionTextElement = document.querySelector('#instruction-text');
const colorNameEnElement = document.querySelector('#color-name-en #target-color-text');
const basketContainer = document.querySelector('#basket-container');
const itemsContainer = document.querySelector('#items-container');
const completionScreen = document.querySelector('#completion-screen');
const restartButton = document.querySelector('#restart-button');

// 2. DADOS DO JOGO (CORES, ITENS E RODADAS)
const gameData = [
    {
        colorName: 'red',
        colorHex: '#ad2f10ff',
        instruction_pt: 'Coloque as coisas vermelhas na cesta!',
        instruction_en_part: 'red',
        items: [
            { name: 'apple', emoji: '🍎', color: 'red' },
            { name: 'strawberry', emoji: '🍓', color: 'red' },
            { name: 'banana', emoji: '🍌', color: 'yellow' },
            { name: 'chili', emoji: '🌶️', color: 'red' },
            { name: 'eggplant', emoji: '🍆', color: 'blue' }, // Cor aproximada para o jogo
        ]
    },
    {
        colorName: 'yellow',
        colorHex: '#ecf00fff',
        instruction_pt: 'Agora as coisas amarelas!',
        instruction_en_part: 'yellow',
        items: [
            { name: 'banana', emoji: '🍌', color: 'yellow' },
            { name: 'lemon', emoji: '🍋', color: 'yellow' },
            { name: 'apple', emoji: '🍎', color: 'red' },
            { name: 'corn', emoji: '🌽', color: 'yellow' },
            { name: 'broccoli', emoji: '🥦', color: 'green' },
        ]
    },
    {
        colorName: 'blue',
        colorHex: '#00f7daff',
        instruction_pt: 'Encontre as coisas azuis!',
        instruction_en_part: 'blue',
        items: [
            { name: 'blueberry', emoji: '🫐', color: 'purple' },
            { name: 'water drop', emoji: '💧', color: 'blue' },
            { name: 'orange', emoji: '🍊', color: 'yellow' }, 
            { name: 'whale', emoji: '🐳', color: 'blue' },
            { name: 'avocado', emoji: '🥑', color: 'green' },
        ]
    }
];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let currentRoundIndex = 0;
let correctlyPlacedItems = 0;
let totalCorrectItemsInRound = 0;
let draggedItem = null;

// 4. FUNÇÕES PRINCIPAIS DO JOGO

function startGame() {
    currentRoundIndex = 0;
    completionScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    loadRound();
}

function loadRound() {
    const roundData = gameData[currentRoundIndex];
    correctlyPlacedItems = 0;
    totalCorrectItemsInRound = roundData.items.filter(item => item.color === roundData.colorName).length;

    // Limpa o tabuleiro
    basketContainer.innerHTML = '';
    itemsContainer.innerHTML = '';

    // Atualiza as instruções
    instructionTextElement.textContent = roundData.instruction_pt;
    colorNameEnElement.textContent = roundData.instruction_en_part;
    colorNameEnElement.style.color = roundData.colorHex;

    // Cria a cesta (zona de drop)
    const basket = document.createElement('div');
    basket.classList.add('basket-icon');
    basket.textContent = '🧺';
    basket.dataset.color = roundData.colorName;
    basketContainer.style.borderColor = roundData.colorHex;
    basketContainer.appendChild(basket);

    // Cria os itens arrastáveis
    shuffleArray(roundData.items).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.textContent = item.emoji;
        itemElement.draggable = true;
        itemElement.dataset.color = item.color;

        // Adiciona os "escutadores" de eventos de arrastar
        itemElement.addEventListener('dragstart', dragStart);
        itemElement.addEventListener('dragend', dragEnd);

        itemsContainer.appendChild(itemElement);
    });

    // Adiciona os "escutadores" de eventos de soltar na cesta
    basketContainer.addEventListener('dragover', dragOver);
    basketContainer.addEventListener('dragleave', dragLeave);
    basketContainer.addEventListener('drop', drop);
}

// 5. FUNÇÕES DE ARRASTAR E SOLTAR (DRAG & DROP)

function dragStart(event) {
    draggedItem = event.target; // Guarda o item que está sendo arrastado
    setTimeout(() => event.target.classList.add('dragging'), 0);
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

function dragOver(event) {
    event.preventDefault(); // MUITO IMPORTANTE: Permite que o evento 'drop' aconteça
    basketContainer.classList.add('drag-over');
}

function dragLeave() {
    basketContainer.classList.remove('drag-over');
}

function drop() {
    basketContainer.classList.remove('drag-over');

    const draggedColor = draggedItem.dataset.color;
    const basketColor = gameData[currentRoundIndex].colorName;

    if (draggedColor === basketColor) {
        // Resposta correta!
        draggedItem.classList.add('hidden'); // Esconde o item
        draggedItem.draggable = false; // Não pode mais ser arrastado
        correctlyPlacedItems++;
        speak(draggedColor); // Fala o nome da cor
        
        // Verifica se a rodada terminou
        if (correctlyPlacedItems === totalCorrectItemsInRound) {
            speak('Great!');
            setTimeout(nextRound, 1000); // Espera 1s e vai para a próxima rodada
        }
    } else {
        // Resposta incorreta (pode adicionar um som ou feedback aqui se quiser)
        speak('Wrong');
    }
}

// 6. FUNÇÕES AUXILIARES

function nextRound() {
    currentRoundIndex++;
    if (currentRoundIndex < gameData.length) {
        loadRound();
    } else {
        showCompletionScreen();
    }
}

function showCompletionScreen() {
    gameContainer.classList.add('hidden');
    completionScreen.classList.remove('hidden');
}

function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Função para embaralhar os itens
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 7. EVENT LISTENERS E INICIALIZAÇÃO
restartButton.addEventListener('click', startGame);
startGame(); // Inicia o jogo quando a página carrega