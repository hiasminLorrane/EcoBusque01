
async function search() {
    const query = document.getElementById('query').value;
    if (query) {
        // Redireciona para a página de resultados com a consulta como parâmetro de URL
        window.location.href = `resultados.html?query=${encodeURIComponent(query)}`;
    }
}

// Recupera a consulta da URL e realiza a pesquisa na página de resultados
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        document.getElementById('query').value = query;
        performSearch(query);
    }
};

function checkEnter(event) {
    if (event.key === 'Enter') {
        search();
    }
}

document.getElementById("menu-toggle").addEventListener("click", function() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
});

document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function() {
        const confettiContainer = this.nextElementSibling; // Seleciona o container de confetes correspondente
        confettiContainer.style.height = '100vh'; // Define o contêiner para os confetes

        for (let i = 0; i < 100; i++) { // Ajuste o número para mais ou menos confetes
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
            confettiContainer.appendChild(confetti);

            // Remove o confete após a animação
            setTimeout(() => {
                confettiContainer.removeChild(confetti);
            }, 3000);
        }

        // Reseta o contêiner de confetes após 3 segundos
        setTimeout(() => {
            confettiContainer.style.height = '0';
        }, 3000);
    });
});





