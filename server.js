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
    password: 'admin', // substitua pela sua senha MySQL
    database: 'ecoogleDB' // substitua pelo nome do banco de dados que você criou
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// Rota para criar um novo anúncio
app.post('/ads', (req, res) => {
    const { title, description, keywords, website } = req.body;
    const query = 'INSERT INTO anuncios (titulo, descricao, url, palavraChave) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, website, keywords.join(',')], (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar anúncio:', err);
            res.status(500).send('Erro ao cadastrar anúncio');
        } else {
            res.status(201).send('Anúncio cadastrado e aguardando aprovação');
        }
    });
});

// Rota para obter anúncios (pode ser filtrado por palavra-chave)
app.get('/ads', (req, res) => {
    const keyword = req.query.keyword || '';
    const query = 'SELECT * FROM anuncios WHERE palavraChave LIKE ? AND status = "aprovado"';
    db.query(query, [`%${keyword}%`], (err, results) => {
        if (err) {
            console.error('Erro ao carregar anúncios:', err);
            res.status(500).send('Erro ao carregar anúncios');
        } else {
            res.json(results);
        }
    });
});

// Rota para obter anúncios pendentes
app.get('/ads/pending', (req, res) => {
    const query = 'SELECT * FROM anuncios WHERE status = "pendente"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao carregar anúncios pendentes:', err);
            res.status(500).send('Erro ao carregar anúncios pendentes');
        } else {
            res.json(results);
        }
    });
});

// Rota para aprovar um anúncio
app.put('/ads/:id/approve', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE anuncios SET status = "aprovado" WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao aprovar anúncio:', err);
            res.status(500).send('Erro ao aprovar anúncio');
        } else {
            res.send('Anúncio aprovado');
        }
    });
});

// Nova rota para obter todos os anúncios aprovados (para a tela de resultados)
app.get('/ads/results', (req, res) => {
    const query = 'SELECT * FROM anuncios WHERE status = "aprovado"';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao carregar resultados:', err);
            res.status(500).send('Erro ao carregar resultados');
        } else {
            res.json(results);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
