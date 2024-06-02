const db = require('../config/db').pool;

// Función para registrar un maestro
exports.registerStudent = async (req, res) => {
  const { first_name, last_name1, last_name2, email, password, confirm_password } = req.body;

  try {
    if (password !== confirm_password) {
      const error = 'Las contraseñas no coinciden';
      return res.render('createStudent', { error });
    }

    await db.execute('INSERT INTO students (first_name, last_name1, last_name2, email, password, role) VALUES (?, ?, ?, ?, ?, "student")', 
      [first_name, last_name1, last_name2, email, password]);

    res.redirect('createStudent');
  } catch (err) {
    console.error('Error al registrar el estudiante:', err);
    res.status(500).send('Error del servidor');
  }
};