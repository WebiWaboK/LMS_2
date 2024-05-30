const db = require('./config/db').pool;

async function testConnection() {
  try {
    const [rows] = await db.execute('SELECT 1 + 1 AS result');
    console.log('Conexión exitosa:', rows);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
  } finally {
    db.end();
  }
}

testConnection();
