 document.addEventListener("DOMContentLoaded", () => {
            const nome = localStorage.getItem('solar_nome_completo') || 'Usuário';
            const foto = localStorage.getItem('solar_avatar');
            document.getElementById('nome-sidebar').innerText = nome;
            if (foto) document.getElementById('avatar-img').src = foto;
        });
 