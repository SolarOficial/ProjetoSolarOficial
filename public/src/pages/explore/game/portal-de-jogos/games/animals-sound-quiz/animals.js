
// 1. SELETORES DOS ELEMENTOS HTML
const gameContainer = document.querySelector('.game-container');
const playSoundButton = document.querySelector('#play-sound-button');
const optionsContainer = document.querySelector('#options-container');
const completionScreen = document.querySelector('#completion-screen');
const restartButton = document.querySelector('#restart-button');

// 2. DADOS DO JOGO (ANIMAIS, EMOJIS E ARQUIVOS DE SOM)
const gameData = [
    { name: 'Dog', emoji: '🐶', soundFile: 'sound/dog.mp3' },
    { name: 'Cat', emoji: '🐱', soundFile: 'sound/cat.mp3' },
    { name: 'Cow', emoji: '🐮', soundFile: 'sound/cow.mp3' },
    { name: 'Duck', emoji: '🦆', soundFile: 'sound/duck.mp3' },
    { name: 'Pig', emoji: '🐷', soundFile: 'sound/pig.mp3' },
    // Adicione mais animais aqui!
];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let currentQuestionIndex = 0;
let lockBoard = false; // Impede cliques múltiplos
let currentSound = null;
let shuffledGameData = [];

// 4. FUNÇÕES PRINCIPAIS DO JOGO

function startGame() {
    currentQuestionIndex = 0;
    shuffledGameData = shuffleArray([...gameData]); // Cria uma cópia embaralhada para cada jogo
    completionScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    lockBoard = false;
    const currentAnimal = shuffledGameData[currentQuestionIndex];
    optionsContainer.innerHTML = ''; // Limpa os cards antigos

    // Prepara o som da rodada atual
    currentSound = new Audio(currentAnimal.soundFile);

    // Cria as opções de resposta (o animal correto + 2 aleatórios)
    const options = generateOptions(currentAnimal.name);

    options.forEach(animalName => {
        const animalData = gameData.find(a => a.name === animalName);
        const card = document.createElement('div');
        card.classList.add('animal-card');
        card.dataset.name = animalData.name;

        card.innerHTML = `
            <span class="emoji">${animalData.emoji}</span>
            <span class="name">${animalData.name}</span>
        `;
        
        card.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(card);
    });
}

// Função chamada quando um card de animal é clicado
function checkAnswer(event) {
    if (lockBoard) return;
    lockBoard = true;

    const selectedCard = event.currentTarget;
    const selectedAnimal = selectedCard.dataset.name;
    const correctAnimal = shuffledGameData[currentQuestionIndex].name;

    if (selectedAnimal === correctAnimal) {
        // Resposta Correta
        selectedCard.classList.add('correct');
        speak(correctAnimal);
        
        // Avança para a próxima pergunta após um pequeno intervalo
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledGameData.length) {
                loadQuestion();
            } else {
                showCompletionScreen();
            }
        }, 1500);

    } else {
        // Resposta Incorreta
        selectedCard.classList.add('incorrect');
        speak('Try again');

        // Permite que o jogador tente novamente após um intervalo
        setTimeout(() => {
            selectedCard.classList.remove('incorrect');
            lockBoard = false; // Desbloqueia o tabuleiro para outra tentativa
        }, 1000);
    }
}

// 5. FUNÇÕES AUXILIARES

function playCurrentSound() {
    if (currentSound) {
        currentSound.play();
    }
}

// Gera 3 opções: a correta e duas aleatórias e diferentes
function generateOptions(correctAnswer) {
    let options = [correctAnswer];
    let otherAnimals = gameData.filter(animal => animal.name !== correctAnswer);
    otherAnimals = shuffleArray(otherAnimals);
    
    options.push(otherAnimals[0].name);
    options.push(otherAnimals[1].name);
    
    return shuffleArray(options);
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

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 6. EVENT LISTENERS E INICIALIZAÇÃO
playSoundButton.addEventListener('click', playCurrentSound);
restartButton.addEventListener('click', startGame);

startGame(); // Inicia o jogo