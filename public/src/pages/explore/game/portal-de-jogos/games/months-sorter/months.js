// 1. SELETORES DOS ELEMENTOS HTML
const timelineContainer = document.getElementById('timeline-container');
const monthsPool = document.getElementById('months-pool');
const completionScreen = document.getElementById('completion-screen');
const restartButton = document.getElementById('restart-button');

// 2. DADOS DO JOGO
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// 3. VARIÁVEIS DE ESTADO
let draggedPiece = null;
let correctlyPlacedCount = 0;

// 4. FUNÇÕES PRINCIPAIS DO JOGO

function startGame() {
    // Limpa o tabuleiro para o caso de um reinício
    timelineContainer.innerHTML = '';
    monthsPool.innerHTML = '';
    correctlyPlacedCount = 0;
    completionScreen.classList.add('hidden');

    months.forEach((month, index) => {
        const slot = document.createElement('div');
        slot.classList.add('timeline-slot');
        slot.dataset.index = index; 
        
        
        slot.addEventListener('dragover', dragOver);
        slot.addEventListener('dragleave', dragLeave);
        slot.addEventListener('drop', drop);
        
        timelineContainer.appendChild(slot);
    });

    // Cria as peças dos meses de forma embaralhada
    const shuffledMonths = shuffleArray([...months]);
    shuffledMonths.forEach(month => {
        const piece = document.createElement('div');
        piece.classList.add('month-piece');
        piece.textContent = month;
        piece.draggable = true;
        piece.dataset.name = month; 

        piece.addEventListener('dragstart', dragStart);
        monthsPool.appendChild(piece);
    });
}

// 5. FUNÇÕES DE ARRASTAR E SOLTAR (DRAG & DROP)

function dragStart(event) {
    draggedPiece = event.target; // Guarda a peça que está sendo arrastada
    setTimeout(() => event.target.classList.add('dragging'), 0);
}

function dragOver(event) {
    event.preventDefault(); // Permite que o evento 'drop' aconteça
    event.target.classList.add('drag-over');
}

function dragLeave(event) {
    event.target.classList.remove('drag-over');
}

function drop(event) {
    event.preventDefault();
    const slot = event.target;
    slot.classList.remove('drag-over');

    const monthName = draggedPiece.dataset.name;
    const correctIndex = months.indexOf(monthName);
    const slotIndex = parseInt(slot.dataset.index);

    // Verifica se a peça foi solta no lugar correto
    if (correctIndex === slotIndex) {
        slot.appendChild(draggedPiece); 
        draggedPiece.classList.add('placed'); 
        draggedPiece.draggable = false; 
        slot.style.backgroundColor = '#26db35ff'; 
        
        speak(monthName);
        correctlyPlacedCount++;


        if (correctlyPlacedCount === months.length) {
            speak('Congratulations!');
            setTimeout(() => completionScreen.classList.remove('hidden'), 1000);
        }
    } else {
        speak('Oops!');
        draggedPiece.classList.remove('dragging');
    }
}

// 6. FUNÇÕES AUXILIARES

function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// 7. EVENT LISTENERS E INICIALIZAÇÃO
restartButton.addEventListener('click', startGame);
startGame();