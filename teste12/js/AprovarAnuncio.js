async function loadPendingAds() {
    try {
        const response = await fetch('https://backendeco.azurewebsites.net/ads/pending');
        const ads = await response.json();
        
        const pendingAdsContainer = document.getElementById('pendingAds');
        pendingAdsContainer.innerHTML = ads.length > 0 
            ? ads.map(ad => 
                `<div class="ad">
                    <h3>${ad.titulo}</h3>
                    <p>${ad.descricao}</p>
                    <p class="clicks">Cliques: ${ad.cliques || 0}</p>
                    <p class="clicks">Quantidade de pesquisa Palavra Chave: ${ad.cliques || 0}</p>
                    <button onclick="approveAd(${ad.id})">Aprovar</button>
                </div>`
            ).join('')
            : '<p>Nenhum anúncio pendente encontrsado.</p>';
    } catch (error) {
        console.error('Erro ao carregar anúncios pendentes:', error);
    }
}

async function loadApprovedAds() {
    try {
        const response = await fetch('https://backendeco.azurewebsites.net/ads/results');
        const ads = await response.json();
        
        const approvedAdsContainer = document.getElementById('approvedAds');
        approvedAdsContainer.innerHTML = ads.length > 0 
            ? ads.map(ad => 
                `<div class="ad">
                    <h3>${ad.titulo}</h3>
                    <p>${ad.descricao}</p>
                    <p class="clicks">Cliques: ${ad.cliques || 0}</p>
                    <p class="clicks">Quantidade de pesquisa Palavra Chave: ${ad.cliques || 0}</p>
                </div>`
            ).join('')
            : '<p>Nenhum anúncio aprovado encontrado.</p>';
    } catch (error) {
        console.error('Erro ao carregar anúncios aprovados:', error);
    }
}

async function approveAd(id) {
    try {
        const response = await fetch(`https://backendeco.azurewebsites.net/ads/${id}/approve`, {
            method: 'PUT'
        });

        if (response.ok) {
            alert('Anúncio aprovado!');
            loadPendingAds();
            loadApprovedAds();
        } else {
            alert('Erro ao aprovar o anúncio');
        }
    } catch (error) {
        console.error('Erro ao aprovar o anúncio:', error);
    }
}

function openPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    loadPendingAds();
    loadApprovedAds();
});
