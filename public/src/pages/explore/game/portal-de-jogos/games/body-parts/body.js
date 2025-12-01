// 1. SELETORES DOS ELEMENTOS HTML
const instructionPartName = document.getElementById('part-name');
const characterContainer = document.getElementById('character-container');
const hotspots = document.querySelectorAll('.hotspot');
const completionScreen = document.getElementById('completion-screen');
const restartButton = document.getElementById('restart-button');

// 2. DADOS DO JOGO (AS PARTES DO CORPO QUE FAZEM PARTE DO JOGO)
const bodyParts = [
    'Mouth', 'Shoulders', 'Hands', 'Knees', 'Feet'
];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let remainingParts = [];
let currentPartToFind = '';

// 4. FUNÇÕES PRINCIPAIS DO JOGO

function startGame() {
    completionScreen.classList.add('hidden');
    // Cria uma cópia embaralhada das partes do corpo para cada novo jogo
    remainingParts = shuffleArray([...bodyParts]);
    nextInstruction();
}

// Define a próxima parte do corpo a ser encontrada
function nextInstruction() {
    // Se não houver mais partes, o jogo acabou
    if (remainingParts.length === 0) {
        showCompletionScreen();
        return;
    }
    // Pega a próxima parte da nossa lista embaralhada
    currentPartToFind = remainingParts.pop();
    
    // Atualiza a instrução na tela
    instructionPartName.textContent = currentPartToFind;
    
    // Fala a instrução em voz alta
    speak(`Touch the ${currentPartToFind}`);
}

// Chamada quando um hotspot é clicado
function checkAnswer(event) {
    const clickedPart = event.target.dataset.part;

    // Cria e posiciona o feedback visual (círculo verde ou 'X' vermelho)
    const feedback = document.createElement('div');
    feedback.classList.add('feedback-animation');
    
    const containerRect = characterContainer.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;
    
    feedback.style.left = `${x - 25}px`; // -25 para centralizar a animação
    feedback.style.top = `${y - 25}px`;  // -25 para centralizar a animação

    if (clickedPart === currentPartToFind) {
        // CORRETO!
        feedback.classList.add('correct');
        characterContainer.appendChild(feedback);

        // Avança para a próxima instrução após um breve intervalo
        setTimeout(nextInstruction, 1000); // Espera 1 segundo

    } else {
        feedback.classList.add('incorrect');
        characterContainer.appendChild(feedback);
        speak('Try again');
    }

    // Remove o elemento de feedback da tela após a animação
    setTimeout(() => feedback.remove(), 700);
}

// 5. FUNÇÕES AUXILIARES

function showCompletionScreen() {
    speak('Wow, you did it!');
    completionScreen.classList.remove('hidden');
}

function speak(text) {
    // Cancela qualquer fala anterior para evitar sobreposição
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 6. EVENT LISTENERS E INICIALIZAÇÃO

// Adiciona o "escutador" de cliques a cada hotspot
hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', checkAnswer);
});

restartButton.addEventListener('click', startGame);

// Inicia o jogo!
startGame();