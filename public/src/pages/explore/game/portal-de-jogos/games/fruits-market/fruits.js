// 1. SELETORES DOS ELEMENTOS HTML
const gameContainer = document.querySelector('.game-container');
const listItemsContainer = document.querySelector('#list-items');
const marketStall = document.querySelector('#market-stall');
const feedbackText = document.querySelector('#feedback-text');
const completionScreen = document.querySelector('#completion-screen');
const restartButton = document.querySelector('#restart-button');

// 2. DADOS DO JOGO
// Lista completa de todas as frutas disponíveis no nosso jogo
const allFruits = [
    { name: 'Apple', emoji: '🍎' }, { name: 'Banana', emoji: '🍌' },
    { name: 'Strawberry', emoji: '🍓' }, { name: 'Orange', emoji: '🍊' },
    { name: 'Grapes', emoji: '🍇' }, { name: 'Pineapple', emoji: '🍍' },
    { name: 'Watermelon', emoji: '🍉' }, { name: 'Kiwi', emoji: '🥝' },
];

// As listas de compras para cada rodada do jogo
const gameRounds = [
    ['Apple', 'Banana'],
    ['Strawberry', 'Grapes', 'Orange'],
    ['Pineapple', 'Watermelon', 'Kiwi']
];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let currentRoundIndex = 0;
let itemsToCollect = [];
let collectedItems = new Set();

// 4. FUNÇÕES PRINCIPAIS DO JOGO

function startGame() {
    currentRoundIndex = 0;
    completionScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    loadRound();
}

function loadRound() {
    // Verifica se todas as rodadas foram concluídas
    if (currentRoundIndex >= gameRounds.length) {
        showCompletionScreen();
        return;
    }

    // Limpa o estado e o tabuleiro da rodada anterior
    collectedItems.clear();
    feedbackText.textContent = '';
    listItemsContainer.innerHTML = '';
    marketStall.innerHTML = '';

    // Define os itens para a rodada atual
    itemsToCollect = gameRounds[currentRoundIndex];

    // Popula a lista de compras na tela
    itemsToCollect.forEach(fruitName => {
        const fruit = findFruitByName(fruitName);
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.textContent = fruit.emoji;
        listItem.dataset.name = fruit.name;
        listItemsContainer.appendChild(listItem);
    });

    // Popula a banca da feira
    const marketFruits = generateMarketStall();
    marketFruits.forEach(fruit => {
        const fruitItem = document.createElement('div');
        fruitItem.classList.add('fruit-item');
        fruitItem.textContent = fruit.emoji;
        fruitItem.dataset.name = fruit.name;
        fruitItem.addEventListener('click', selectFruit);
        marketStall.appendChild(fruitItem);
    });
}

// Chamada quando uma fruta da banca é clicada
function selectFruit(event) {
    const selectedFruitElement = event.currentTarget;
    const selectedFruitName = selectedFruitElement.dataset.name;

    // Impede de clicar em uma fruta já coletada
    if (selectedFruitElement.classList.contains('collected')) {
        return;
    }

    // Verifica se a fruta clicada está na lista de compras
    if (itemsToCollect.includes(selectedFruitName)) {
        collectedItems.add(selectedFruitName);
        speak(selectedFruitName);

        // Feedback visual na banca e na lista
        selectedFruitElement.classList.add('collected');
        const listItem = listItemsContainer.querySelector(`[data-name="${selectedFruitName}"]`);
        listItem.classList.add('collected');

        // Verifica se a lista foi completada
        if (collectedItems.size === itemsToCollect.length) {
            feedbackText.textContent = 'Ótimo!';
            speak('Awesome!');
            setTimeout(() => {
                currentRoundIndex++;
                loadRound();
            }, 2000); // Espera 2s e vai para a próxima rodada
        }

    } else {
        feedbackText.textContent = 'Essa não está na lista...';
        speak('Try again');
        setTimeout(() => feedbackText.textContent = '', 1500);
    }
}

// 5. FUNÇÕES AUXILIARES

function showCompletionScreen() {
    gameContainer.classList.add('hidden');
    completionScreen.classList.remove('hidden');
}

function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Cria a lista de frutas da banca, garantindo que as da lista de compras estejam incluídas
function generateMarketStall() {
    let stall = [...itemsToCollect];
    let distractors = allFruits.filter(fruit => !itemsToCollect.includes(fruit.name));
    distractors = shuffleArray(distractors);
    
    // Adiciona alguns "distratores" para preencher a banca
    for (let i = 0; i < 4; i++) {
        if (distractors[i]) {
            stall.push(distractors[i].name);
        }
    }
    
    return shuffleArray(stall).map(name => findFruitByName(name));
}

function findFruitByName(name) {
    return allFruits.find(fruit => fruit.name === name);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 6. EVENT LISTENERS E INICIALIZAÇÃO
restartButton.addEventListener('click', startGame);
startGame();