const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

// Función para autenticar al administrador
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ? AND role = "admin"', [username]);

    if (!rows || rows.length === 0) {
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

// Renderizar la página de inicio de sesión del administrador
exports.renderLoginPage = (req, res) => {
  res.render('adminLogin', { error: null });
};

exports.createTeacher = (req, res) => {
  // Lógica para crear un usuario maestro
  res.send('Usuario maestro creado');
};

exports.createStudent = (req, res) => {
  // Lógica para crear un usuario alumno
  res.send('Usuario alumno creado');
};


// Renderizar la página de creación de usuarios
exports.renderCreateUserPage = (req, res) => {
  res.render('createUser');
};
