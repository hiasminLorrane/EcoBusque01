const subscriptionKey = 'afebc8f8c45d4ed9a058b73ac3871a6d';
const endpoint = 'https://api.bing.microsoft.com/v7.0/search';
const imagesEndpoint = 'https://api.bing.microsoft.com/v7.0/images/search';
const videosEndpoint = 'https://api.bing.microsoft.com/v7.0/videos/search';
const newsEndpoint = 'https://api.bing.microsoft.com/v7.0/news/search';

// Atualize o endpoint de anúncios aqui, se necessário
const adsEndpoint = 'https://backendeco.azurewebsites.net/ads?keyword=';

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

async function performSearch(query) {
    const webResultsContainer = document.getElementById('webList');
    const imageResultsContainer = document.getElementById('imageList');
    const videoResultsContainer = document.getElementById('videoList');
    const newsResultsContainer = document.getElementById('newsList');
    const adListContainer = document.getElementById('adList');

    try {
        // Realiza a busca na web
        const webResponse = await fetch(`${endpoint}?q=${encodeURIComponent(query)}`, {
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        });
        const webData = await webResponse.json();
        webResultsContainer.innerHTML = webData.webPages.value.map(page => 
            `<div class="result">
                <h3><a href="${page.url}" target="_blank">${page.name}</a></h3>
                <p>${page.snippet}</p>
            </div>`
        ).join('');

        // Realiza a busca de imagens
        const imageResponse = await fetch(`${imagesEndpoint}?q=${encodeURIComponent(query)}`, {
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        });
        const imageData = await imageResponse.json();
        imageResultsContainer.innerHTML = imageData.value.map(image => 
            `<img src="${image.contentUrl}" alt="${image.name}" style="width: 100px; height: 100px; margin: 5px;" />`
        ).join('');

        // Realiza a busca de vídeos
        const videoResponse = await fetch(`${videosEndpoint}?q=${encodeURIComponent(query)}`, {
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        });
        const videoData = await videoResponse.json();
        videoResultsContainer.innerHTML = videoData.value.map(video => 
            `<div class="result">
                <h3><a href="${video.contentUrl}" target="_blank">${video.name}</a></h3>
                <p>${video.description}</p>
            </div>`
        ).join('');

        // Realiza a busca de notícias
        const newsResponse = await fetch(`${newsEndpoint}?q=${encodeURIComponent(query)}`, {
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        });
        const newsData = await newsResponse.json();
        newsResultsContainer.innerHTML = newsData.value.map(news => 
            `<div class="result">
                <h3><a href="${news.url}" target="_blank">${news.name}</a></h3>
                <p>${news.description}</p>
            </div>`
        ).join('');

        // Realiza a busca de anúncios
        await fetchAds(query);

    } catch (error) {
        console.error('Erro na pesquisa:', error);
    }
}



async function fetchAds(query) {
    try {
        const adsResponse = await fetch(`${adsEndpoint}${encodeURIComponent(query)}`);
        const adsData = await adsResponse.json();
        const adListContainer = document.getElementById('adList');

        if (adsData.length > 0) {
            adListContainer.innerHTML = adsData.map(ad =>
                `<li>
                    <div class="ad-label">Anúncio</div>
                    <a href="${ad.url}" target="_blank" onclick="registerClick(${ad.id})">
                        <h3>${ad.titulo}</h3>
                        <p>${ad.descricao}</p>
                    </a>
                </li>`
            ).join('');
        } else {
            adListContainer.innerHTML = '<p></p>';
        }
    } catch (error) {
        console.error('Erro ao buscar anúncios:', error);
        document.getElementById('adList').innerHTML = '<p></p>';
    }
}

async function registerClick(adId) {
    try {
        await fetch(`https://backendeco.azurewebsites.net/ads/${adId}/click`, {
            method: 'POST'
        });
    } catch (error) {
        console.error('Erro ao registrar clique:', error);
    }
}

function showCategory(category) {
    document.querySelectorAll('.category').forEach(cat => {
        if (cat.id === category) {
            cat.classList.remove('hidden');
        } else {
            cat.classList.add('hidden');
        }
    });
}

function searchMaps() {
    const query = document.getElementById('query').value;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(mapsUrl, '_blank');
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        search();
    }
}

function openPopup() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function addShortcut() {
    const name = document.getElementById('shortcut-name').value;
    const url = document.getElementById('shortcut-url').value;
    if (name && url) {
        const container = document.getElementById('shortcutContainer');
        const button = document.createElement('button');
        button.classList.add('category-button');
        button.innerHTML = `<span>${name}</span><span class="category-button-icon">${name.charAt(0).toUpperCase()}</span>`;
        button.onclick = () => window.open(url, '_blank');
        container.appendChild(button);
        closePopup();
    }
}

function toggleWebCategory() {
    const webTitle = document.getElementById('web-title');
    const webResults = document.getElementById('webResults');

    // Alterna a visibilidade do título da categoria Web
    if (webTitle.classList.contains('hidden')) {
        webTitle.classList.remove('hidden');
        webResults.classList.remove('hidden');
    } else {
        webTitle.classList.add('hidden');
        webResults.classList.add('hidden');
    }
}