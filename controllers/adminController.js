// controllers/adminController.js
const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Función para autenticar al administrador
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND role = "admin"', [username]);
    
    if (rows.length > 0) {
      const user = rows[0];

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Autenticación exitosa
        res.redirect('/admin/createUser');
      } else {
        // Contraseña incorrecta
        res.status(401).send('Nombre de usuario o contraseña incorrectos');
      }
    } else {
      // Usuario no encontrado
      res.status(401).send('Nombre de usuario o contraseña incorrectos');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error del servidor');
  }
};

// Renderizar la página de creación de usuarios
exports.renderCreateUserPage = (req, res) => {
  res.render('createUser');
};
