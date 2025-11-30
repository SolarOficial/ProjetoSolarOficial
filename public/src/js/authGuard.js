import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

document.body.style.visibility = "hidden"; 

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Acesso autorizado para:", user.email);
        document.body.style.visibility = "visible";    
    } else {
        console.warn("Acesso negado. Redirecionando para login...");
        window.location.href = '/login.html';
    }
});