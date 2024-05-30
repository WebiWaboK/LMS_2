const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Función para autenticar al administrador
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Conectando a la base de datos...');
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND role = "admin"', [username]);

    if (!rows || rows.length === 0) {
      console.log('No se encontró el usuario admin en la base de datos.');
      res.render('adminLogin', { error: 'Nombre de usuario o contraseña incorrectos' });
      return;
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      // Autenticación exitosa
      res.redirect('/admin/createUser');
    } else {
      // Contraseña incorrecta
      res.render('adminLogin', { error: 'Nombre de usuario o contraseña incorrectos' });
    }
  } catch (err) {
    console.error('Error del servidor:', err);
    res.status(500).send('Error del servidor');
  }
};

// Renderizar la página de creación de usuarios
exports.renderCreateUserPage = (req, res) => {
  res.render('createUser');
};
