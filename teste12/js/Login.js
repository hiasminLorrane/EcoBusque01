document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obtenha os valores dos campos de e-mail e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aqui você pode adicionar a lógica para verificar o login
    // Exemplo simples para ilustrar:
    if (email === "contato@ecoogle.com.br" && password === "EuRefloresto2100!") {
        // Redireciona para a página AprovarAnuncio.html após login bem-sucedido
        window.location.href = 'AprovarAnuncio.html';
    } else {
        alert('E-mail ou senha incorretos.');
    }
});
