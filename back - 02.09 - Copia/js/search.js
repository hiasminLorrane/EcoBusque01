async function performSearch(query) {
    try {
        const adContainer = document.getElementById('adList');
        const response = await fetch(`http://localhost:3000/ads?keyword=${encodeURIComponent(query)}`);
        const ads = await response.json();
        
        adContainer.innerHTML = ads.map(ad => 
            ad.approved ? `<div class="ad">
                <h3><a href="${ad.website}" target="_blank">${ad.title}</a></h3>
                <p>${ad.description}</p>
            </div>` : ''
        ).join('');
    } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
    }
}