const mysql2 = require('mysql2');
const dotenv = require('dotenv');

// Configura DotEnv
dotenv.config();  // Carga las variables de entorno

// Crear pool de conexiones a la base de datos MySQL
const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Verificar la conexión a la base de datos al iniciar el servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos establecida correctamente');
        connection.release();
    }
});

module.exports = {
    obtenerConexion: () => pool.promise().getConnection(),
    pool
};