document.getElementById('fullscreen-btn').addEventListener('click', function() {
    const iframe = document.getElementById('my-iframe');
    const elem = document.documentElement; // Elemento raiz (HTML)

    // Tenta colocar a página em tela cheia
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }

    // Após entrar em tela cheia, exibe o iframe e esconde o botão
    iframe.style.display = 'block';
    document.getElementById('fullscreen-btn').style.display = 'none';
});
