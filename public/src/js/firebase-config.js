// Arquivo: firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"; 

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

// Inicializa a Autenticação
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// Exporta para os outros arquivos
export { app, auth, provider };