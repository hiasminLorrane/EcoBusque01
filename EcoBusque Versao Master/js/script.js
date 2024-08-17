
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




