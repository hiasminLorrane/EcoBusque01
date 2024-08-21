const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // substitua pelo seu usuário MySQL
    password: '', // substitua pela sua senha MySQL
    database: 'ecoBusqueAds' // substitua pelo nome do banco de dados
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// Rota para obter todos os anúncios (com ou sem filtro por palavra-chave)
app.get('/ads', (req, res) => {
    const keyword = req.query.keyword || '';
    const query = `
        SELECT * FROM anuncios
        WHERE palavraChave LIKE ?;
    `;
    db.query(query, [`%${keyword}%`], (err, results) => {
        if (err) {
            console.error('Erro ao buscar anúncios:', err);
            return res.status(500).send('Erro interno do servidor');
        }
        res.json(results);
    });
});

// Rota para aprovar um anúncio
app.put('/ads/:id/approve', (req, res) => {
    const adId = req.params.id;
    const query = 'UPDATE anuncios SET status = ? WHERE id = ?';
    db.query(query, ['aprovado', adId], (err, results) => {
        if (err) {
            console.error('Erro ao aprovar anúncio:', err);
            return res.status(500).send('Erro interno do servidor');
        }
        res.send('Anúncio aprovado');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
