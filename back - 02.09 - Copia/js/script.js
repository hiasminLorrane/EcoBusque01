const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // Usando 'pg' para PostgreSQL

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexão com o banco de dados PostgreSQL (Supabase)
const db = new Pool({
    user: 'postgres.boyoucdjmyudjljjbvrl', // Substitua pelo seu usuário PostgreSQL do Supabase
    host: 'aws-0-sa-east-1.pooler.supabase.com', // Substitua pelo host do seu banco de dados no Supabase
    database: 'postgres', // Substitua pelo nome do banco de dados no Supabase (geralmente 'postgres')
    password: '@Tonystark19', // Substitua pela sua senha do PostgreSQL no Supabase
    port: 5432, // Porta padrão do PostgreSQL
    ssl: { rejectUnauthorized: false } // Necessário para conexões seguras
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao PostgreSQL:', err);
        return;
    }
    console.log('Conectado ao PostgreSQL');
});

// Rota para obter todos os anúncios (com ou sem filtro por palavra-chave)
app.get('/ads', (req, res) => {
    const keyword = req.query.keyword || '';
    const query = `
        SELECT * FROM anuncios
        WHERE palavraChave LIKE $1;
    `;
    db.query(query, [`%${keyword}%`], (err, results) => {
        if (err) {
            console.error('Erro ao buscar anúncios:', err);
            return res.status(500).send('Erro interno do servidor');
        }
        res.json(results.rows);
    });
});

// Rota para aprovar um anúncio
app.put('/ads/:id/approve', (req, res) => {
    const adId = req.params.id;
    const query = 'UPDATE anuncios SET status = $1 WHERE id = $2';
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
