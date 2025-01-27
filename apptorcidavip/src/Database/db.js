const mysql = require('mysql2/promise');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conexão estabelecida com sucesso!');
        connection.release();

    } catch (Error) {
        console.log('Erro ao se conectar ao banco de dados', Error)
    }
})

module.exports = pool;
