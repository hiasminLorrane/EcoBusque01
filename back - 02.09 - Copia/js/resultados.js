async function loadResults(query = '') {
    try {
        const response = await fetch('http://localhost:3000/ads/results');
        const ads = await response.json();

        // Filtra anúncios com base na query
        const filteredAds = ads.filter(ad =>
            ad.palavraChave.toLowerCase().includes(query.toLowerCase())
        );

        const resultContainer = document.getElementById('resultList');
        
        // Gera o HTML dos anúncios filtrados ou uma mensagem se nenhum anúncio for encontrado
        resultContainer.innerHTML = filteredAds.length > 0 ? filteredAds.map(ad =>
            `<div class="result">
                <h3><a href="${ad.url}" target="_blank">${ad.titulo}</a></h3>
                <p>${ad.descricao}</p>
            </div>`
        ).join('') : '<p>Nenhum resultado encontrado.</p>';

        // Debugging: Verifica o conteúdo dos anúncios filtrados
        console.log('Filtered Ads:', filteredAds);

        // Mostra ou oculta o container de resultados com base na presença de anúncios
        resultContainer.classList.toggle('hidden', filteredAds.length === 0);
    } catch (error) {
        console.error('Erro ao carregar resultados:', error);
    }
}

function searchAds() {
    const query = document.getElementById('searchQuery').value;
    console.log('Search Query:', query); // Debugging: Verifica a query de pesquisa
    loadResults(query);
}

// Carrega resultados ao carregar a página, sem mostrar nada inicialmente
loadResults();