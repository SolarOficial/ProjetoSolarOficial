document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica do Menu Hambúrguer (Abrir/Fechar Menu Principal)
    const btnMobile = document.getElementById('btn-mobile');
    
    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
        
        // Acessibilidade
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        event.currentTarget.setAttribute('aria-label', active ? 'Fechar Menu' : 'Abrir Menu');
    }
    
    if (btnMobile) {
        btnMobile.addEventListener('click', toggleMenu);
        btnMobile.addEventListener('touchstart', toggleMenu);
    }

    // 2. NOVA LÓGICA: Dropdown no Mobile (Clicar para abrir submenus)
    
    // Seleciona todos os links que têm um submenu (dropdown) dentro
    const itensComDropdown = document.querySelectorAll('.nav-pai li');

    itensComDropdown.forEach(item => {
        // Pega o link principal (ex: EXPLORAR) e o submenu dele
        const linkPrincipal = item.querySelector('a');
        const submenu = item.querySelector('.dropdown');
        const seta = item.querySelector('.seta-header');

        // Se existir um submenu dentro deste item...
        if (submenu) {
            linkPrincipal.addEventListener('click', (event) => {
                // Verifica se estamos no modo Mobile (tela menor que 1000px)
                if (window.innerWidth < 1000) {
                    // Impede que o link recarregue a página ou suba pro topo
                    event.preventDefault();
                    
                    // Abre/Fecha o submenu
                    submenu.classList.toggle('ativar-dropdown');
                    
                    // Gira a setinha
                    if (seta) {
                        seta.classList.toggle('seta-girada');
                    }
                }
            });
        }
    });
});