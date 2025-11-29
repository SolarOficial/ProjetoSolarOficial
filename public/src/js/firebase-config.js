// Arquivo: firebase-config.js

// 1. Usamos a MESMA versão para tudo (10.13.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

// 2. ADICIONEI ESSA LINHA QUE FALTAVA:
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyCa0Tik1SCuLJTb8pi7WjEynlvvbxVjOW0",
    authDomain: "solar-8b8eb.firebaseapp.com",
    projectId: "solar-8b8eb",
    storageBucket: "solar-8b8eb.firebasestorage.app",
    messagingSenderId: "177823853208",
    appId: "1:177823853208:web:b2b9f5cbea379259fe7eed"
};

// Inicializa o App
const app = initializeApp(firebaseConfig);

// Inicializa a Autenticação (Agora funciona porque importamos lá em cima)
const auth = getAuth(app);

// Exporta para os outros arquivos
export { app, auth };