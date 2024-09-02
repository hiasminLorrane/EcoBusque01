const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco de dados Supabase (PostgreSQL)
const pool = new Pool({
    connectionString: 'postgresql://postgres.boyoucdjmyudjljjbvrl:@Tonystark19@aws-0-sa-east-1.pooler.supabase.com:6543/postgres', // substitua com a URL de conexão fornecida pelo Supabase
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao Supabase:', err);
        return;
    }
    console.log('Conectado ao Supabase');
});

// Rota para criar um novo anúncio
app.post('/ads', async (req, res) => {
    const { title, description, keywords, website } = req.body;
    const query = 'INSERT INTO anuncios (titulo, descricao, url, palavraChave) VALUES ($1, $2, $3, $4)';
    try {
        await pool.query(query, [title, description, website, keywords.join(',')]);
        res.status(201).send('Anúncio cadastrado e aguardando aprovação');
    } catch (err) {
        console.error('Erro ao cadastrar anúncio:', err);
        res.status(500).send('Erro ao cadastrar anúncio');
    }
});

// Rota para obter anúncios (pode ser filtrado por palavra-chave)
app.get('/ads', async (req, res) => {
    const keyword = req.query.keyword || '';
    const query = 'SELECT * FROM anuncios WHERE palavraChave LIKE $1 AND status = $2';
    try {
        const results = await pool.query(query, [`%${keyword}%`, 'aprovado']);
        res.json(results.rows);
    } catch (err) {
        console.error('Erro ao carregar anúncios:', err);
        res.status(500).send('Erro ao carregar anúncios');
    }
});

// Rota para obter anúncios pendentes
app.get('/ads/pending', async (req, res) => {
    const query = 'SELECT * FROM anuncios WHERE status = $1';
    try {
        const results = await pool.query(query, ['pendente']);
        res.json(results.rows);
    } catch (err) {
        console.error('Erro ao carregar anúncios pendentes:', err);
        res.status(500).send('Erro ao carregar anúncios pendentes');
    }
});

// Rota para aprovar um anúncio
app.put('/ads/:id/approve', async (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE anuncios SET status = $1 WHERE id = $2';
    try {
        await pool.query(query, ['aprovado', id]);
        res.send('Anúncio aprovado');
    } catch (err) {
        console.error('Erro ao aprovar anúncio:', err);
        res.status(500).send('Erro ao aprovar anúncio');
    }
});

// Nova rota para obter todos os anúncios aprovados (para a tela de resultados)
app.get('/ads/results', async (req, res) => {
    const query = 'SELECT * FROM anuncios WHERE status = $1';
    try {
        const results = await pool.query(query, ['aprovado']);
        res.json(results.rows);
    } catch (err) {
        console.error('Erro ao carregar resultados:', err);
        res.status(500).send('Erro ao carregar resultados');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
