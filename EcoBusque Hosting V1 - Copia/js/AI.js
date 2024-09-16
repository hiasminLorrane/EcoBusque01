const subscriptionKey = '5339fbe1e899429487a255527332a8a0';
const endpoint = 'https://api.bing.microsoft.com/v7.0/search';

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (query) {
        document.getElementById('chat-box').innerHTML = `<div class="message bot"><p>Olá! Vamos conversar sobre: <strong>${query}</strong></p></div>`;
        sendQueryToAPI(query); // Envia a consulta inicial à API
    }
};

async function sendQueryToAPI(query) {
    try {
        const response = await fetch(`${endpoint}?q=${encodeURIComponent(query)}&count=5`, {
            headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
        });
        const data = await response.json();

        let summary = `Aqui está o que encontrei sobre "${query}":\n\n`;

        if (data.webPages && data.webPages.value.length > 0) {
            summary += data.webPages.value
                .map(page => sanitizeText(page.snippet))
                .join(' ');
        } else {
            summary += `Desculpe, não encontrei nada relevante para "${query}".`;
        }

        addChatMessage(`<p>${summary}</p>`); // Adiciona a resposta ao chat como um parágrafo único
    } catch (error) {
        console.error('Erro na busca:', error);
        addChatMessage('<p>Desculpe, houve um problema ao buscar os resultados.</p>');
    }
}

function sanitizeText(text) {
    // Remove ou substitui palavras e frases indesejadas
    return text
        .replace(/"[^"]*"/g, '') // Remove aspas e o texto dentro delas
        .replace(/clique aqui/i, '') // Remove "clique aqui"
        .replace(/saiba mais/i, '') // Remove "saiba mais"
        .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único espaço
        .trim(); // Remove espaços em branco no início e no final
}

function checkEnterChat(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message) {
        addChatMessage(`<p>Você: ${message}</p>`, 'user');
        messageInput.value = ''; // Limpa o campo de mensagem
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight; // Rola para baixo para mostrar a nova mensagem

        // Envia a consulta para a API e aguarda a resposta
        await sendQueryToAPI(message);
    }
}

function addChatMessage(message, sender = 'bot') {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="message ${sender}">${message}</div>`;
}
