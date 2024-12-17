chrome.action.onClicked.addListener(() => {
  // Abrir o site em uma nova aba
  chrome.tabs.create({ url: "https://ecoogle.com.br" });

  // Realizando uma requisição à API do Bing
  fetch("https://api.bing.microsoft.com/v7.0/search?q=exemplo", {
    method: "GET",
    headers: {
      "Ocp-Apim-Subscription-Key": "sua-chave-de-assinatura-aqui"
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log("Resultado da API do Bing:", data);
  })
  .catch(error => console.error("Erro ao acessar a API do Bing:", error));
});
