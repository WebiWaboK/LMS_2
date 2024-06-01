const db = require('../config/db').pool;

// Función para registrar un maestro
exports.registerStudent = async (req, res) => {
  const { first_name, last_name1, last_name2, email, password, confirm_password } = req.body;

  try {
    // Verificar si las contraseñas coinciden
    if (password !== confirm_password) {
      const error = 'Las contraseñas no coinciden';
      return res.render('createStudent', { error });
    }

    // Insertar el maestro en la base de datos
    await db.execute('INSERT INTO students (first_name, last_name1, last_name2, email, password) VALUES (?, ?, ?, ?, ?)', 
      [first_name, last_name1, last_name2, email, password]);

    // Redirigir a la página de inicio de sesión del administrador
    res.redirect('createStudent'); // Cambiado a redirección al menú de inicio
  } catch (err) {
    console.error('Error al registrar el maestro:', err);
    res.status(500).send('Error del servidor');
  }
};
