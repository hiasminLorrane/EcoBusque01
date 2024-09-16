async function performSearch() {
    const query = document.getElementById('searchQuery').value;
    try {
        const adContainer = document.getElementById('adList');
        const response = await fetch(`https://backendeco.azurewebsites.net/ads?keyword=${encodeURIComponent(query)}`);
        const ads = await response.json();
        
        adContainer.innerHTML = ads.length > 0 
            ? ads.map(ad => 
                `<div class="ad-card">
                    <h3><a href="${ad.url}" target="_blank">${ad.titulo}</a></h3>
                    <p>${ad.descricao}</p>
                </div>`
            ).join('')
            : '<p>Nenhum anúncio encontrado.</p>';
    } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
    }
}

async function loadPendingAds() {
    try {
        const response = await fetch('https://backendeco.azurewebsites.net/ads/pending');
        const ads = await response.json();
        
        const pendingAdsContainer = document.getElementById('pendingAds');
        pendingAdsContainer.innerHTML = ads.length > 0 
            ? ads.map(ad => 
                `<div class="ad-card">
                    <h3>${ad.titulo}</h3>
                    <p>${ad.descricao}</p>
                    <button onclick="approveAd(${ad.id})">Aprovar</button>
                </div>`
            ).join('')
            : '<p>Nenhum anúncio pendente encontrado.</p>';
    } catch (error) {
        console.error('Erro ao carregar anúncios pendentes:', error);
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
        } else {
            alert('Erro ao aprovar o anúncio');
        }
    } catch (error) {
        console.error('Erro ao aprovar o anúncio:', error);
    }
}

document.getElementById('ad-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const adData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        keywords: document.getElementById('keywords').value.split(',').map(kw => kw.trim()),
        website: document.getElementById('website').value
    };

    fetch('https://backendeco.azurewebsites.net/ads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(adData)
    }).then(response => response.text())
      .then(data => {
          alert('Anúncio cadastrado e aguardando aprovação!');
          document.getElementById('ad-form').reset(); // Limpa o formulário
      }).catch(error => {
          console.error('Erro:', error);
      });
});

// Carrega os anúncios pendentes ao carregar a página
loadPendingAds();
