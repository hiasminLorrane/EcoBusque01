const mysql = require('mysql2');

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

module.exports = db;
