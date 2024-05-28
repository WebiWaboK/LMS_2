const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Función para crear usuarios (alumnos y maestros)
exports.createUser = async (req, res) => {
  const { role, firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute('INSERT INTO users (role, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?)', [role, firstName, lastName, email, hashedPassword]);
    res.send('Usuario creado exitosamente');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
};