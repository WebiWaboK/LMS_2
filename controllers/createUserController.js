const db = require('../config/db').pool;
const bcrypt = require('bcrypt');

exports.registerTeacher = async (req, res) => {
  const { first_name, last_name1, last_name2, email, password, confirm_password } = req.body;

  try {
    // Verificar si la contraseña es válida y no está vacía
    if (typeof password === 'undefined' || typeof password !== 'string') {
      const error = 'La contraseña no es válida';
      return res.render('createTeacher', { error });
    }

    // Log del número de caracteres del correo electrónico y la contraseña
    console.log('Número de caracteres del correo electrónico:', email ? email.length : 'Correo no definido');
    console.log('Número de caracteres de la contraseña:', password.length);

    // Verificar si las contraseñas coinciden
    if (password !== confirm_password) {
      const error = 'Las contraseñas no coinciden';
      return res.render('createTeacher', { error });
    }

    // Generar la sal (salt)
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hashear la contraseña con la sal generada
    const hashedPassword = await bcrypt.hash(password, salt);

    // Imprimir la contraseña encriptada
    console.log('Contraseña encriptada:', hashedPassword);

    // Insertar el maestro en la base de datos
    await db.execute('INSERT INTO teachers (first_name, last_name1, last_name2, email, password) VALUES (?, ?, ?, ?, ?)', 
      [first_name, last_name1, last_name2, email, hashedPassword]);

    // Redirigir a la página de inicio de sesión del administrador
    res.redirect('createTeacher'); // Cambiado a redirección al menú de inicio
  } catch (err) {
    console.error('Error al registrar el maestro:', err);
    res.status(500).send('Error del servidor');
  }
};

