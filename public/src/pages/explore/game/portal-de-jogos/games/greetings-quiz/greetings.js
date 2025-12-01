// --- CÓDIGO COMPLETO PARA O QUIZ DAS SAUDAÇÕES ---

// 1. SELETORES DOS ELEMENTOS HTML
const quizContainer = document.querySelector('.quiz-container');
const questionTextElement = document.querySelector('#question-text');
const sceneImageElement = document.querySelector('#scene-image');
const optionsContainer = document.querySelector('#options-container');
const completionScreen = document.querySelector('#completion-screen');
const restartButton = document.querySelector('#restart-button');

// 2. DADOS DO QUIZ (PERGUNTAS, IMAGENS E RESPOSTAS)
// Usaremos imagens de placeholder. Você pode trocá-las por arquivos de imagem depois!
const quizData = [
    {
        image: 'https://placehold.co/500x200/FFD700/4a4e69?text=Manhã+☀️',
        question: 'Você acorda e o sol está nascendo. O que você diz?',
        options: ['Good night', 'Good morning', 'Hello'],
        correctAnswer: 'Good morning'
    },
    {
        image: 'https://placehold.co/500x200/87CEEB/4a4e69?text=Encontro+👋',
        question: 'Você encontra um amigo no parque. Como você o cumprimenta?',
        options: ['Goodbye', 'Hello', 'Good evening'],
        correctAnswer: 'Hello'
    },
    {
        image: 'https://placehold.co/500x200/4682B4/FFFFFF?text=Noite+🌙',
        question: 'Está de noite e você vai para a cama. O que você diz?',
        options: ['Good morning', 'Thank you', 'Good night'],
        correctAnswer: 'Good night'
    },
    {
        image: 'https://placehold.co/500x200/FFC0CB/4a4e69?text=Despedida+👋',
        question: 'A aula acabou e você vai para casa. Como você se despede?',
        options: ['Goodbye', 'Hello', 'Good afternoon'],
        correctAnswer: 'Goodbye'
    }
];

// 3. VARIÁVEIS DE ESTADO DO JOGO
let currentQuestionIndex = 0;
let lockOptions = false; // Para evitar múltiplos cliques

// 4. FUNÇÕES PRINCIPAIS DO JOGO

// Inicia o quiz ou carrega a próxima pergunta
function showQuestion() {
    lockOptions = false;
    // Pega os dados da pergunta atual
    const currentQuestion = quizData[currentQuestionIndex];

    // Atualiza a interface
    questionTextElement.textContent = currentQuestion.question;
    sceneImageElement.style.backgroundImage = `url(${currentQuestion.image})`;
    
    // Limpa as opções anteriores
    optionsContainer.innerHTML = '';

    // Cria e adiciona os novos botões de opção
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', selectAnswer);
        optionsContainer.appendChild(button);
    });
}

// Chamada quando o jogador clica em uma resposta
function selectAnswer(event) {
    if (lockOptions) return; // Se as opções estiverem travadas, não faz nada
    lockOptions = true;

    const selectedButton = event.target;
    const selectedAnswer = selectedButton.textContent;
    const correctAnswer = quizData[currentQuestionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        // Resposta correta
        selectedButton.classList.add('correct');
        speak(correctAnswer); // Fala a saudação correta
    } else {
        // Resposta incorreta
        selectedButton.classList.add('incorrect');
    }

    // Espera um pouco para mostrar o feedback e depois avança
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion(); // Mostra a próxima pergunta
        } else {
            showCompletionScreen(); // Fim de jogo
        }
    }, 1500); // Espera 1.5 segundos
}

// Mostra a tela de finalização
function showCompletionScreen() {
    quizContainer.classList.add('hidden');
    completionScreen.classList.remove('hidden');
}

// Função para pronunciar a palavra em inglês (Text-to-Speech)
function speak(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// 5. EVENT LISTENERS
restartButton.addEventListener('click', () => {
    // Reseta o estado e recomeça o jogo
    currentQuestionIndex = 0;
    completionScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showQuestion();
});

// 6. INICIA O JOGO
showQuestion();