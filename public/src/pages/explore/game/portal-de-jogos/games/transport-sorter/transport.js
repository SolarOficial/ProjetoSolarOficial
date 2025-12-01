
// 1. SELETORES DOS ELEMENTOS HTML
const gameContainer = document.querySelector('.game-container');
const vehicleContainer = document.querySelector('#vehicle-container');
const dropZones = document.querySelectorAll('.drop-zone');
const completionScreen = document.querySelector('#completion-screen');
const restartButton = document.querySelector('#restart-button');

// 2. DADOS DO JOGO (VEÍCULOS, TIPOS E SONS)
const vehicles = [
    { name: 'Car', emoji: '🚗', type: 'land', soundFile: 'sound/car.mp3' },
    { name: 'Boat', emoji: '⛵', type: 'water', soundFile: 'sound/boat.mp3' },
    { name: 'Airplane', emoji: '✈️', type: 'air', soundFile: 'sound/airplane.mp3' },
    { name: 'Train', emoji: '🚆', type: 'land', soundFile: 'sound/train.mp3' },
    { name: 'Helicopter', emoji: '🚁', type: 'air', soundFile: 'sound/helicopter.mp3' }, 
    { name: 'Ship', emoji: '🚢', type: 'water', soundFile: 'sound/boat.mp3' },      
    { name: 'Bus', emoji: '🚌', type: 'land', soundFile: 'sound/bus.mp3' },       

];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let currentVehicleIndex = 0;
let shuffledVehicles = [];
let draggedVehicleElement = null;

// 4. FUNÇÕES PRINCIPAIS DO JOGO

function startGame() {
    currentVehicleIndex = 0;
    shuffledVehicles = shuffleArray([...vehicles]); // Embaralha os veículos para cada jogo
    completionScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    loadVehicle();
}

function loadVehicle() {
    vehicleContainer.innerHTML = ''; // Limpa o veículo anterior

    if (currentVehicleIndex >= shuffledVehicles.length) {
        showCompletionScreen();
        return;
    }

    const vehicleData = shuffledVehicles[currentVehicleIndex];
    const vehicleElement = document.createElement('div');
    vehicleElement.classList.add('vehicle');
    vehicleElement.textContent = vehicleData.emoji;
    vehicleElement.draggable = true;
    vehicleElement.dataset.type = vehicleData.type; // Guarda o tipo (land, water, air)

    vehicleElement.addEventListener('dragstart', dragStart);
    vehicleElement.addEventListener('dragend', dragEnd);

    vehicleContainer.appendChild(vehicleElement);
}

// 5. FUNÇÕES DE ARRASTAR E SOLTAR (DRAG & DROP)

function dragStart(event) {
    draggedVehicleElement = event.target;
    setTimeout(() => event.target.classList.add('dragging'), 0);
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

function dragOver(event) {
    event.preventDefault(); // Essencial para permitir o 'drop'
    event.currentTarget.classList.add('drag-over');
}

function dragLeave(event) {
    event.currentTarget.classList.remove('drag-over');
}

function drop(event) {
    event.currentTarget.classList.remove('drag-over');
    
    const dropZoneType = event.currentTarget.dataset.zone;
    const vehicleType = draggedVehicleElement.dataset.type;

    if (vehicleType === dropZoneType) {
        const vehicleData = shuffledVehicles[currentVehicleIndex];
        
        speak(vehicleData.name);
        const vehicleSound = new Audio(vehicleData.soundFile);
        vehicleSound.play();

    
        draggedVehicleElement.classList.add('hidden');
        currentVehicleIndex++;
        
        // Carrega o próximo veículo após um breve intervalo
        setTimeout(loadVehicle, 1200);

    } else {
        speak('Oops!');
    }
}


// 6. FUNÇÕES AUXILIARES
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

// 7. EVENT LISTENERS E INICIALIZAÇÃO
dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('dragleave', dragLeave);
    zone.addEventListener('drop', drop);
});

restartButton.addEventListener('click', startGame);

startGame(); // Inicia o jogo