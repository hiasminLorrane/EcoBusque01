
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


document.addEventListener('DOMContentLoaded', function() {
    const countElement = document.getElementById('count');
    const searchButton = document.querySelector('.search-icon'); // Seletor do botão de pesquisa
    const searchInput = document.getElementById('query'); // Input de pesquisa
  
    // Recupera o número de árvores do localStorage ou inicializa em 0
    let treeCount = parseInt(localStorage.getItem('treeCount')) || 0;
  
    // Função para atualizar o contador de árvores
    function updateTreeCounter() {
      countElement.textContent = treeCount;
      // Armazena o contador no localStorage
      localStorage.setItem('treeCount', treeCount);
    }
  
    // Evento de clique no ícone de pesquisa
    searchButton.addEventListener('click', function() {
      const query = searchInput.value;
      if (query) {
        treeCount++; // Incrementa o contador de árvores
        console.log('Árvore plantada! Total:', treeCount); // Debug: exibe o total de árvores no console
        updateTreeCounter(); // Atualiza o contador na página
  
        // Simula a pesquisa (em um site real, você redirecionaria para a pesquisa)
        // window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }
    });
  
    // Inicializa o contador ao carregar a página
    updateTreeCounter();
  });
  

  
// Função para obter o valor de um cookie pelo nome
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Função para definir um cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

document.addEventListener("DOMContentLoaded", function() {
    if (!getCookie("consentGiven")) {
        document.getElementById("cookieConsent").style.display = "flex";
    }

    document.getElementById("acceptCookies").addEventListener("click", function() {
        setCookie("consentGiven", "true", 365);
        document.getElementById("cookieConsent").style.display = "none";
    });
});

// JavaScript para alternar a visibilidade do menu
document.getElementById('menu-toggle').addEventListener('click', function() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('show');
  });