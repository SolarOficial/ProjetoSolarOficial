// 1. SELETORES DOS ELEMENTOS HTML
const gameContainer = document.querySelector('.game-container');
const progressBar = document.getElementById('progress-bar');
const itemDisplay = document.getElementById('item-display');
const optionsContainer = document.getElementById('options-container');
const completionScreen = document.getElementById('completion-screen');
const restartButton = document.getElementById('restart-button');

// 2. DADOS DO JOGO (ESPORTES E SEUS EQUIPAMENTOS)
const sportsData = [
    { name: 'Soccer', itemEmoji: '⚽' },
    { name: 'Basketball', itemEmoji: '🏀' },
    { name: 'Tennis', itemEmoji: '🎾' },
    { name: 'Baseball', itemEmoji: '⚾' },
    { name: 'Golf', itemEmoji: '⛳' },
    { name: 'Bowling', itemEmoji: '🎳' },
    { name: 'Boxing', itemEmoji: '🥊' },

];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let currentQuestionIndex = 0;
let shuffledData = [];
let lockBoard = false;

// 4. FUNÇÕES PRINCIPAIS DO JOGO

function startGame() {
    currentQuestionIndex = 0;
    shuffledData = shuffleArray([...sportsData]);
    completionScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= shuffledData.length) {
        showCompletionScreen();
        return;
    }
    lockBoard = false;
    
    const progressPercentage = (currentQuestionIndex / shuffledData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    const currentSport = shuffledData[currentQuestionIndex];
    
    itemDisplay.textContent = currentSport.itemEmoji;
    itemDisplay.style.animation = 'popIn 0.5s ease'; 

    const options = generateOptions(currentSport.name);
    optionsContainer.innerHTML = ''; 

    options.forEach(sportName => {
        const card = document.createElement('div');
        card.classList.add('option-card');
        card.textContent = sportName;
        card.dataset.name = sportName;
        card.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(card);
    });
}

function checkAnswer(event) {
    if (lockBoard) return;
    lockBoard = true;

    const selectedCard = event.currentTarget;
    const selectedSport = selectedCard.dataset.name;
    const correctSport = shuffledData[currentQuestionIndex].name;

    if (selectedSport === correctSport) {
        selectedCard.classList.add('correct');
        speak(correctSport);
        currentQuestionIndex++;

        setTimeout(() => {
            // Remove a animação para que possa ser reativada no próximo item
            itemDisplay.style.animation = 'none';
            loadQuestion();
        }, 1200); // Espera 1.2s e avança

    } else {
        // INCORRETO
        selectedCard.classList.add('incorrect');
        speak('Oops!');
        
        setTimeout(() => {
            selectedCard.classList.remove('incorrect');
            lockBoard = false; // Desbloqueia para nova tentativa
        }, 1000);
    }
}

// 5. FUNÇÕES AUXILIARES

function showCompletionScreen() {
    progressBar.style.width = '100%'; // Completa a barra
    setTimeout(() => {
        gameContainer.classList.add('hidden');
        completionScreen.classList.remove('hidden');
    }, 500); // Pequeno delay para ver a barra cheia
}

// Gera 3 opções: a correta e duas aleatórias
function generateOptions(correctAnswer) {
    let options = [correctAnswer];
    let otherSports = sportsData.filter(sport => sport.name !== correctAnswer);
    otherSports = shuffleArray(otherSports);
    options.push(otherSports[0].name);
    options.push(otherSports[1].name);
    return shuffleArray(options);
}

function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 6. EVENT LISTENERS E INICIALIZAÇÃO
restartButton.addEventListener('click', startGame);

startGame();