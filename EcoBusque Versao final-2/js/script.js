
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

// script.js

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Opcional: Fechar o menu quando clicar fora dele
document.addEventListener('click', function(event) {
  const menu = document.getElementById('menu');
  const button = document.querySelector('.menu-button');
  if (!menu.contains(event.target) && !button.contains(event.target)) {
      menu.style.display = 'none';
  }
});



